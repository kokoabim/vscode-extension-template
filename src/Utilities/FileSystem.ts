import * as fss from "fs";
import * as fs from "fs/promises";
import * as Path from "path";

import extract from "extract-zip";

export class FileSystem {
    public async createDirectory(path: string, recursive = true, mode?: fss.Mode | undefined): Promise<boolean> {
        return await fs.mkdir(path, { recursive: recursive, mode: mode }).then(() => true).catch(() => false);
    }

    public async directoryExists(path: string): Promise<boolean> {
        const type = await this.getEntryType(path);
        return type === FsEntryType.directory;
    }

    public async fileExists(path: string): Promise<boolean> {
        const type = await this.getEntryType(path);
        return type === FsEntryType.file;
    }

    public async getEntryType(path: string): Promise<FsEntryType> {
        let stat: fss.Stats;
        try { stat = await fs.stat(path); }
        catch { return FsEntryType.none; }
        if (!stat) return FsEntryType.none;

        if (stat.isFile()) return FsEntryType.file;
        if (stat.isDirectory()) return FsEntryType.directory;
        if (stat.isSymbolicLink()) return FsEntryType.symbolicLink;
        if (stat.isSocket()) return FsEntryType.socket;
        if (stat.isFIFO()) return FsEntryType.fifo;
        if (stat.isBlockDevice()) return FsEntryType.blockDevice;
        if (stat.isCharacterDevice()) return FsEntryType.characterDevice;

        return FsEntryType.unknown;
    }

    public joinPath(...path: string[]): string { return Path.join(...path); }

    public async readJsonFile<T>(...path: string[]): Promise<T | undefined> {
        return await fs.readFile(Path.join(...path)).then(data => {
            try { return JSON.parse(data.toString("utf8")) as T; }
            catch { return; }
        }).catch(() => undefined);
    }

    public async readFileAsString(...path: string[]): Promise<string | undefined> {
        return await fs.readFile(Path.join(...path)).then(data => {
            try { return data.toString("utf8"); }
            catch { return; }
        }).catch(() => undefined);
    }

    public async removeDirectory(path: string): Promise<boolean> {
        const type = await this.getEntryType(path);
        if (type === FsEntryType.none) return true;
        else if (type !== FsEntryType.directory) return false;

        return await this.removeDirectoryInternal(path);
    }

    public async removeEntry(path: string): Promise<boolean> {
        const type = await this.getEntryType(path);
        if (type === FsEntryType.none) return true;

        if (type === FsEntryType.directory) return await this.removeDirectoryInternal(path);
        if (type === FsEntryType.file || type === FsEntryType.symbolicLink) return await this.removeFileOrSymbolicLink(path);

        return false;
    }

    public async replaceInFile(path: string, ...replacements: { find: string | RegExp, replace: string }[]): Promise<boolean> {
        if (!await this.fileExists(path)) return false;

        let data = await this.readFileAsString(path);
        if (!data) return false;

        let modified = false;
        for (const replacement of replacements) {
            if (typeof replacement.find === "string") {
                if (data.includes(replacement.find)) {
                    data = data.replace(replacement.find, replacement.replace);
                    modified = true;
                }
            }
            else {
                if (replacement.find.test(data)) {
                    data = data.replace(replacement.find, replacement.replace);
                    modified = true;
                }
            }
        }
        if (!modified) return true;

        return await this.writeFile(path, data, true);
    }

    public async unzip(zipPath: string, destinationPath: string): Promise<boolean> {
        try {
            await extract(zipPath, { dir: destinationPath });
            return true;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (e) {
            return false;
        }
    }

    public async writeFile<T>(path: string, stringOrObject: T, overwrite = false, includeNullOnStringify = true): Promise<boolean> {
        if (!overwrite && await this.getEntryType(path) !== FsEntryType.none) return false;

        const data = typeof stringOrObject === "string" ? stringOrObject : JSON.stringify(stringOrObject, (key, val) => {
            if (includeNullOnStringify || (val !== null && val !== undefined)) return val;
        }, 4);

        const parentPath = Path.dirname(path);
        if (await this.getEntryType(parentPath) === FsEntryType.none) await this.createDirectory(parentPath, true);

        return await fs.writeFile(path, data, { encoding: "utf8" })
            .then(() => true)
            .catch(() => false);
    }

    private async removeDirectoryInternal(path: string): Promise<boolean> {
        return await fs.rm(path, { force: true, recursive: true }).then(() => true).catch(() => false); // like 'rm -rf'
    }

    private async removeFileOrSymbolicLink(path: string): Promise<boolean> {
        return await fs.rm(path).then(() => true).catch(() => false);
    }
}

export enum FsEntryType {
    none = "None",
    blockDevice = "Block-Device",
    characterDevice = "Character-Device",
    directory = "Directory",
    fifo = "FIFO",
    file = "File",
    socket = "Socket",
    symbolicLink = "Symbolic-Link",
    unknown = "Unknown"
}