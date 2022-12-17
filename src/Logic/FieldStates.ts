export class CellState{
    constructor(private onBang : () => void, private onClear: () => void){
    }

    private _isBlown = false;
    private _flagged: 'none' | 'query' | 'flag' = 'none';
    
    isMined = false;

    get isBlown (): boolean {
        return this._isBlown;
    }

    set isBlown(value: boolean) {
        if (this.flagged !== 'none'){
            return;
        }

        this._isBlown = value;

        if(this.isBlown && this.isMined){
            this.onBang();
        }
    }

    public get flagged(): 'none' | 'query' | 'flag' {
        return this._flagged;
    }

    public set flagged(value: 'none' | 'query' | 'flag') {
        if (this.isBlown){
            this._flagged = 'none';
        }
        else {
            this._flagged = value;
        }
    }

    neighbours: CellState[] = [];

    get neighbouringMines (): number{
        return this.neighbours.filter(n => n.isMined).length;
    }

    get neighboursFlagged (): number {
        return this.neighbours.filter(n => n.flagged === 'flag').length;
    }

    doubleClick() {
        if (this.isBlown && this.neighbouringMines === this.neighboursFlagged){
            this.neighbours.filter(n => n.flagged === 'none').forEach(n => n.click());
        }
    }

    click() {
        if (!this.isBlown){
            this.isBlown = true;

            if (!this.isMined && this.neighbouringMines === 0){
                for(let cell of this.neighbours){
                    cell.click();
                }
            }

            this.onClear();
        }
    }

    flag() {
        switch(this.flagged)
        {
            case 'none': 
                this.flagged = 'flag';
                break;
            case 'flag': 
                this.flagged = 'query';
                break;
            case 'query': 
                this.flagged = 'none';
                break;
        }
    }
}

export class FieldStates{
    private _playing: 'playing' | 'won' | 'lost' = 'playing';
    private _mineCount: number;

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

        return cleared + this._mineCount == this.width * this.height;
    }

    readonly cells: CellState[][];
 
    get unexploded (){
        return this._mineCount - this.cells.reduce((sum, row) => sum + row.filter(c => c.flagged === 'flag').length, 0);
    }

    get playing() {
        return this._playing;
    }

    constructor (private width: number, private height: number) {
        this._mineCount= Math.floor(width * height * 0.15)
        this.cells = []; 

        this.generateCells(height, width); 
        this.generateMines(this._mineCount);
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
                this.cells[row].push(new CellState(() => this.onBang(), () => this.onClear()));
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