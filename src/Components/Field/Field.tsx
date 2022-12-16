import { useState } from 'react';
import { CellState, FieldStates } from '../../Logic/FieldStates';
import { Cell } from '../Cell/Cell';
import './Field.css';

export const Field = () => {
    const width = 40;
    const height = 20;

    const [cells, setCells] = useState(new FieldStates(width, height).cells);

    const cellClick = (cell: CellState) => {
        cell.click();
        setCells([...cells]);
    }
    
    return(
        <div className="field">
            {cells.map(r => r.map(c => <Cell onClick={()=>cellClick(c)} cellState={c} />))}
        </div>
    ); 
};