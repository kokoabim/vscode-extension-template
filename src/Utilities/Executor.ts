import { ChildProcess, exec } from "child_process";
import { StringBuilder } from "./StringBuilder";
import { VSCodeExtensionUI } from "../VSCodeExtension/VSCodeExtensionUI";

export class Executor {
    public async exec(command: string, cwd?: string, execOutput = ExecutorExecOutput.none, output?: VSCodeExtensionUI): Promise<ExecutorExecResult> {
        let childProcess: ChildProcess;
        const stdOut = new StringBuilder();
        const stdErr = new StringBuilder();
        const allOutput = new StringBuilder();

        if (!output) execOutput = ExecutorExecOutput.none;

        let outputStdOut: ((data: string) => void) | undefined = undefined;
        let outputStdErr: ((data: string) => void) | undefined = undefined;

        const execResult: ExecutorExecResult = { success: false };

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

            const [exitCode, signal] = await new Promise<[number | null, NodeJS.Signals | null]>(resolve => childProcess.on("close", (code, signal) => resolve([code, signal])));
            execResult.exitCode = exitCode;
            execResult.signal = signal;
            execResult.success = exitCode === 0;
        }
        catch (error) {
            const errorMessage = "Error executing command: " + error;
            execResult.error = errorMessage;

            if (execOutput === ExecutorExecOutput.outputChannel) output!.channelOutputLine(errorMessage);
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
    /** `true` if the command was executed successfully and exited with exit code 0. */
    success: boolean;

    /** Exit code of the command. */
    exitCode?: number | null;

    /** Signal that terminated the command. */
    signal?: string | null;

    /** Error executing command. */
    error?: string | undefined;

    /** All output (stdout and stderror) of the command. */
    output?: string | undefined;

    /** Standard output of the command. */
    stdOut?: string | undefined;

    /** Standard error output of the command. */
    stdErr?: string | undefined;
};