import { ChildProcess, exec } from "child_process";
import { StringBuilder } from "./StringBuilder";
import { VSCodeExtensionUI } from "../VSCodeExtension/VSCodeExtensionUI";

export class Executor {
    public async exec(command: string, cwd: string, execOutput = ExecutorExecOutput.none, output?: VSCodeExtensionUI): Promise<ExecutorExecResult> {
        let childProcess: ChildProcess;
        const stdOut = new StringBuilder();
        const stdErr = new StringBuilder();
        const allOutput = new StringBuilder();

        if (!output) execOutput = ExecutorExecOutput.none;

        let outputStdOut: ((data: string) => void) | undefined = undefined;
        let outputStdErr: ((data: string) => void) | undefined = undefined;

        const execResult: ExecutorExecResult = {};

        try {
            childProcess = exec(command, { encoding: "utf8", maxBuffer: 5120000, cwd: cwd });

            if (execOutput !== ExecutorExecOutput.none) {

                if (execOutput === ExecutorExecOutput.outputChannel) {
                    outputStdOut = (data: string): void => output!.channelOutput(String(data));
                    outputStdErr = (data: string): void => output!.channelOutput(String(data));
                }
                else if (execOutput === ExecutorExecOutput.string || execOutput === ExecutorExecOutput.strings) {
                    if (execOutput === ExecutorExecOutput.string) {
                        outputStdOut = (data: string): void => { stdOut.append(String(data)); };
                        outputStdErr = (data: string): void => { stdErr.append(String(data)); };
                    }
                    else if (execOutput === ExecutorExecOutput.strings) {
                        outputStdOut = (data: string): void => { allOutput.append(String(data)); };
                        outputStdErr = (data: string): void => { allOutput.append(String(data)); };
                    }
                }

                if (outputStdOut) childProcess.stdout!.on("data", outputStdOut);
                if (outputStdErr) childProcess.stderr!.on("data", outputStdErr);
            }

            const [code, signal] = await new Promise<[number | null, NodeJS.Signals | null]>(resolve => childProcess.on("close", (code, signal) => resolve([code, signal])));
            execResult.code = code;
            execResult.signal = signal;
            execResult.success = code === 0;
        }
        catch (error) {
            const errorMessage = "Error executing command: " + error;

            if (execOutput === ExecutorExecOutput.outputChannel) {
                output!.channelOutputLine(errorMessage);
            }
            else {
                execResult.error = errorMessage;
            }
        }

        if ((execOutput === ExecutorExecOutput.string || execOutput === ExecutorExecOutput.strings) && outputStdOut && outputStdErr) {
            if (stdOut.hasValue) execResult.stdOut = stdOut.toString();
            if (stdErr.hasValue) execResult.stdErr = stdErr.toString();
            if (allOutput.hasValue) execResult.output = allOutput.toString();
        }

        return execResult;
    }
}

export enum ExecutorExecOutput {
    none,
    outputChannel,
    /** stdOut and stdErr combined into ExecutorExecResult.output */
    string,
    /** stdOut and stdErr separated into ExecutorExecResult.stdOut and ExecutorExecResult.stdErr */
    strings,
}

export interface ExecutorExecResult {
    success?: boolean;
    code?: number | null;
    signal?: string | null;
    error?: string | undefined;
    output?: string | undefined;
    stdOut?: string | undefined;
    stdErr?: string | undefined;
};