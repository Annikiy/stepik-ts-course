import {IStreamLogger} from './stream-logger.interface';
import {ChildProcessWithoutNullStreams} from "node:child_process";

export class StreamHandler {
    constructor(private logger: IStreamLogger) {}

    process(stream: ChildProcessWithoutNullStreams) {
        stream.stdout.on('data', (data) => {
            this.logger.log(data);
        })
        stream.stderr.on('data', (data) => {
            this.logger.error(data);
        })
        stream.on('close', () => {
            this.logger.end();
        })
    }
}
