export class SolverCell {
    inputValue: number | null = null;
    testValue = 0;
    count = 0;

    constructor(public x: number, public y: number){

    }

    get displayValue(): number | null {
        return this.inputValue ?? (this.testValue === 0 ? null : this.testValue);
    }

    get displayingInput (): boolean {
        return this.inputValue !== null;
    }
}