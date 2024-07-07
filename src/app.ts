import {FfmpegExecutor} from "./commands/ffmpeg/ffmpeg.executor";
import {ConsoleLogger} from "./out/console-logger/console-logger";

export class App {

    async run(): Promise<void> {
        new FfmpegExecutor(ConsoleLogger.getInstance()).execute()
    }
}

const app = new App();
app.run().then(r => r);
