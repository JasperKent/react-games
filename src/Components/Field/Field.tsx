import { CellState } from '../../Logic/CellState';
import { FieldStates } from '../../Logic/FieldStates';
import { Cell } from '../Cell/Cell';
import './Field.css';

type Props = {
    cells: CellState[][];
    playing: 'playing' | 'won' | 'lost';
    refresh: () => void;
}

export const Field = ({cells, playing, refresh}: Props) => {

    const fieldStyle = { width: `${cells[0].length * FieldStates.CellWidth}px`};

    const cellClick = (cell: CellState) => {
        if (playing === 'playing'){
            cell.click();
            refresh();
        }
    }

    const cellDoubleClick = (cell: CellState) => {
        if (playing === 'playing'){
            cell.doubleClick();
            refresh();
        }
    }

    const cellFlag = (cell: CellState) => {
        if (playing === 'playing'){
            cell.flag();
            refresh();            
        }
    }
    
    return(
        <div className="field" style={fieldStyle}>
            {cells.map(r => r.map(c => <Cell key={c.key} onFlag={()=>cellFlag(c)} 
                                            onClick={()=>cellClick(c)} 
                                            onDoubleClick={()=>cellDoubleClick(c)} 
                                            cellState={c} />))}
        </div>
    ); 
};