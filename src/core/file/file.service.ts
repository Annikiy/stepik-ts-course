import {isAbsolute, join, dirname} from 'path';
import {promises} from "node:fs";

export class FileService {
    getFilePath(path: string, name: string, ext: string): string {
        if (!isAbsolute(path)) {
            path = join(__dirname + '/' + path)
        }
        return join(dirname(path) + '/' + name + '.' + ext)
    }

    async deleteFileIfExist(path: string): Promise<void> {
        if (await this.isExist(path)) {
            await promises.unlink(path);
        }
    }

    private async isExist(path: string): Promise<boolean> {
        return promises.stat(path)
            .then(() => true, () => false);
    }
}
