import {ICommandExecFfmpeg, IFfmpegInput} from "./ffmpeg.types";
import {AbstractCommandExecutor, FileService, PromptService} from "../../core";
import {ChildProcessWithoutNullStreams, spawn} from "node:child_process";
import {IStreamLogger} from "../../types";
import {FfmpegBuilder} from "./ffmpeg.builder";
import {StreamHandler} from "../../core/handlers/stream.handler";

export class FfmpegExecutor extends AbstractCommandExecutor<IFfmpegInput> {
    private fileService = new FileService();
    private promptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected build({width, height, path, name}: IFfmpegInput): ICommandExecFfmpeg {
        const  output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        return {command: 'ffmpeg', args, output};
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.process(stream);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number');
        const height = await this.promptService.input<number>('Высота', 'number');
        const path = await this.promptService.input<string>('Путь до файла', 'input');
        const name = await this.promptService.input<string>('Имя', 'input');
        return {width, height, path, name};
    }

    protected spawn({output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(output);
        return spawn(command, args);
    }
}
