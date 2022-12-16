export class CellState{
    isMined = false;
    isBlown = false;

    neighbours: CellState[] = [];

    get neighbouringMines (): number{
        return this.neighbours.filter(n => n.isMined).length;
    }

    click(){
        if (!this.isBlown){
            this.isBlown = true;

            if (!this.isMined && this.neighbouringMines === 0){
                for(let cell of this.neighbours){
                    cell.click();
                }
            }
        }
    }
}

export class FieldStates{
    readonly cells: CellState[][];

    constructor (private width: number, private height: number){
        this.cells = []; 

        this.generateCells(height, width);    

        this.generateMines(Math.floor(width * height * 0.15));
        this.configureNeighbours();
    }

    private generateCells(height: number, width: number) {
        for (let row = 0; row < height; ++row) {
            this.cells.push([]);

            for (let col = 0; col < width; ++col) {
                this.cells[row].push(new CellState());
            }
        }
    }

    configureNeighbours() {
        const addNeighbour = (cell: CellState, r: number, c: number) => {
            if (r >= 0 && c >= 0 && r < this.height && c < this.width){
                cell.neighbours.push(this.cells[r][c]);            
            }
        }

        for (let row = 0; row < this.height; ++row) {
            for(let col = 0; col < this.width; ++col){
                addNeighbour(this.cells[row][col],row - 1, col - 1);
                addNeighbour(this.cells[row][col],row - 1, col);
                addNeighbour(this.cells[row][col],row - 1, col + 1);
                addNeighbour(this.cells[row][col],row, col  - 1);
                addNeighbour(this.cells[row][col],row, col + 1);
                addNeighbour(this.cells[row][col],row + 1, col - 1);
                addNeighbour(this.cells[row][col],row + 1, col);
                addNeighbour(this.cells[row][col],row + 1, col + 1);
            }
        }    
    }

    generateMines (count: number): void {
        for (let i = 0; i < count; ++i){
            while(true) {
                const row = Math.floor(Math.random() * this.height);
                const col = Math.floor(Math.random() * this.width);

                if (!this.cells[row][col].isMined){
                    this.cells[row][col].isMined = true;
                    break;
                }
            }
        }
    }
}