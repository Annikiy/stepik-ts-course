import {IStreamLogger} from "../../types";
import {ChildProcessWithoutNullStreams} from "node:child_process";
import {ICommandExec} from "./command.types";

export abstract class AbstractCommandExecutor<Input> {
    constructor(private logger: IStreamLogger) {}

    public async executor() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.spawn(command);
        this.processStream(stream, this.logger)
    };

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): any;
    protected abstract spawn(command: ICommandExec): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}
