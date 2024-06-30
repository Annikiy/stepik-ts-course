import {IStreamLogger} from "../../types";

export class ConsoleLogger implements IStreamLogger{
     private static logger: ConsoleLogger

    constructor() {}

    public static getInstance(): ConsoleLogger {
        if (!ConsoleLogger.logger) {
            ConsoleLogger.logger = new ConsoleLogger;
        }

        return ConsoleLogger.logger;
    }

    log(...args: any[]): void {
        console.log(...args);
    }

    error(...args: any[]): void {
        console.log('Error:', ...args);
    }

    end(): void {
        console.log('ConsoleLogger: Done');
    }
}
