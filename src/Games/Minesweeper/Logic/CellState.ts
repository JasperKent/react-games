export class CellState{
    constructor(public key: number, private onBang : () => void, private onClear: () => void){
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

    get flagged(): 'none' | 'query' | 'flag' {
        return this._flagged;
    }

    private set flagged(value: 'none' | 'query' | 'flag') {
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
                this.onClear();
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