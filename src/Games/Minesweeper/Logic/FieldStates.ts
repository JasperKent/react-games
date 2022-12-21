import { CellState } from "./CellState";

export class FieldStates{

    static get CellWidth() {return 29;}

    private _playing: 'playing' | 'won' | 'lost' = 'playing';

    private get allMinesMarked(): boolean{
        for (let row = 0; row < this.height; ++row) {
            for(let col = 0; col < this.width; ++col){
                if (this.cells[row][col].isMined !== (this.cells[row][col].flagged === 'flag')){
                    return false;
                }
            }
        }

        return true;
    }

    private get allNonMinesCleared(): boolean{
        const cleared = this.cells.reduce((sum, row) => sum + row.filter(c => c.isBlown).length, 0);

        return cleared + this.mineCount === this.width * this.height;
    }

    readonly cells: CellState[][];
 
    get unexploded (){
        return this.mineCount - this.cells.reduce((sum, row) => sum + row.filter(c => c.flagged === 'flag').length, 0);
    }

    get playing() {
        return this._playing;
    }

    constructor (private width: number, private height: number, private mineCount: number) {
        this.cells = []; 

        this.generateCells(height, width); 
        this.generateMines(this.mineCount);
        this.configureNeighbours();
    }

    private onBang(): void {
        if (this._playing === 'playing'){
            this._playing = 'lost';

            for (let row = 0; row < this.height; ++row) {
                for(let col = 0; col < this.width; ++col){
                    if (this.cells[row][col].isMined){
                        this.cells[row][col].click();
                    }
                }
            }
        }
    }

    private onClear(): void {
        if (this._playing === 'playing'){
            if (this.allMinesMarked || this.allNonMinesCleared){
                this._playing = 'won';
            }
        }
    }

    private generateCells(height: number, width: number) {
        for (let row = 0; row < height; ++row) {
            this.cells.push([]);

            for (let col = 0; col < width; ++col) {
                this.cells[row].push(new CellState(row * width + col, () => this.onBang(), () => this.onClear()));
            }
        }
    }

    private configureNeighbours() {
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

    private generateMines (count: number): void {
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