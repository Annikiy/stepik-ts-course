import { PromptService } from './core';

export class App {
    private readonly promptService: PromptService;

    constructor() {
        this.promptService = new PromptService();
    }

    async run(): Promise<void> {
        const result = await this.promptService.input<number>('Число', 'number');
        console.log(result);
    }
}

const app = new App();
app.run().then(r => r);
