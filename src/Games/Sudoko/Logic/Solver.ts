import { SolverCell } from "./SolverCell";

export class Solver {

    readonly cells: SolverCell[][] = [];
    private allCells: SolverCell[] = [];

    constructor (){
        this.generateCells();

        this.cells[0][0].inputValue = 1;
        this.cells[7][0].inputValue = 9;     

        this.cells[1][1].inputValue = 5;        
        this.cells[3][1].inputValue = 3;        
        this.cells[4][1].inputValue = 2;        
        this.cells[6][1].inputValue = 8;        

        this.cells[0][2].inputValue = 8;
        this.cells[1][2].inputValue = 9;
        this.cells[2][2].inputValue = 3;
        this.cells[5][2].inputValue = 1;

        this.cells[0][3].inputValue = 6;
        this.cells[1][3].inputValue = 8;
        this.cells[6][3].inputValue = 1;
        this.cells[7][3].inputValue = 2;

        this.cells[3][4].inputValue = 1;
        this.cells[4][4].inputValue = 9;
        this.cells[5][4].inputValue = 6;

        this.cells[1][5].inputValue = 1;
        this.cells[2][5].inputValue = 5;
        this.cells[7][5].inputValue = 6;
        this.cells[8][5].inputValue = 3;

        this.cells[3][6].inputValue = 8;
        this.cells[6][6].inputValue = 2;
        this.cells[7][6].inputValue = 1;
        this.cells[8][6].inputValue = 4;

        this.cells[2][7].inputValue = 1;
        this.cells[4][7].inputValue = 6;
        this.cells[5][7].inputValue = 4;
        this.cells[7][7].inputValue = 3;

        this.cells[1][8].inputValue = 2;
        this.cells[8][8].inputValue = 5;
    }

    private generateCells(){
        for (let x = 0; x < 9; ++x){
            this.cells.push([]);
    
            for (let y = 0; y < 9; ++y){
                const solver = new SolverCell(x,y);

                this.cells[x].push(solver);
                this.allCells.push(solver);
            }
        }
    }

    private occupiedNeighbourCount(cell: SolverCell): number {
        if (cell.inputValue !==  null){
            return 0;
        }

        return this.influencingCells(cell).filter(c => c.inputValue !== null).length;
    }

    private influencingCells(cell: SolverCell): SolverCell[] {
        const result: SolverCell[] = [];

        for(let x = 0; x < 9; ++x){
            if (x !== cell.x){
                result.push(this.cells[x][cell.y]);
            }
        }

        for(let y = 0; y < 9; ++y){
            if (y !== cell.y){
                result.push(this.cells[cell.x][y]);
            }
        }

        const boxX = Math.floor(cell.x / 3) * 3;
        const boxY = Math.floor(cell.y /3) * 3

        for (let x = boxX; x < boxX + 3; ++x){
            for (let y = boxY; y < boxY + 3; ++y){
                if (x !== cell.x && y !== cell.y){
                    result.push(this.cells[x][y]);
                }
            }
        }

        return result;
    }

    private validateCell (cell: SolverCell): boolean {
        return !this.influencingCells(cell).some(c => c.testValue === cell.testValue);
    }

    private tryCell (cell: SolverCell): boolean {
        if (cell.inputValue !==  null){
            return true;
        }

        while (cell.testValue < 9){
            ++cell.testValue;

            let valid = this.validateCell(cell);

            if (valid){
                return true;
            }
        }

        cell.testValue = 0;

        return false;
    }

    private iterateCells() {
        let index = 0;
        let direction: 1 | -1 = 1;

        while (index >= 0 && index < this.allCells.length) {
            const cell = this.allCells[index];

            if (!cell.inputValue){
                direction = this.tryCell(cell) ? 1 : -1;
            }

            index += direction;            
        }

        return index >= 0;
    }

    private sortCells() {
        this.allCells.forEach(c => c.count = this.occupiedNeighbourCount(c));
        this.allCells.filter(c => c.inputValue !== null).forEach(c => c.testValue = c.inputValue ?? 0);
        this.allCells.sort((l, r) => r.count - l.count);
    }

    solve (): boolean {      
        this.sortCells();

        return this.iterateCells();
    }

    setCell(x: number, y: number, value: number | null): void {
        if (value !== null){
            if (isNaN(value)){
                value = null;
            }
            else if (value < 1 || value > 9){
                value = this.cells[x][y].inputValue
            }
        }

        this.cells[x][y].inputValue = value;
    }

    reset() {
        this.allCells.forEach(c => {
            c.count = 0;
            c.testValue = 0;
            c.inputValue = null;
        });
    }
}