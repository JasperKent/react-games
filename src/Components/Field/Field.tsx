import { useState } from 'react';
import { CellState, FieldStates } from '../../Logic/FieldStates';
import { Cell } from '../Cell/Cell';
import { Counter } from '../Counter/Counter';
import './Field.css';

export const Field = () => {
    const width = 40;
    const height = 20;

    const [states,setStates] = useState(() => new FieldStates(width, height));
    const [cells, setCells] = useState(states.cells);
    const [unexploded, setUnexploded] = useState(states.unexploded);
    const [playing, setPlaying] = useState(states.playing);

    const cellClick = (cell: CellState) => {
        if (playing){
            cell.click();
            setCells([...cells]);
            setPlaying(states.playing);
        }
    }

    const cellDoubleClick = (cell: CellState) => {
        if (playing){
            cell.doubleClick();
            setCells([...cells]);
            setPlaying(states.playing);
        }
    }

    const cellFlag = (cell: CellState) => {
        if (playing){
            cell.flag();
            setCells([...cells]);
            setUnexploded(states.unexploded);
            setPlaying(states.playing);
        }
    }

    const reset = () => {
        var newStates = new FieldStates(width, height);

        setStates(newStates);
        setUnexploded(newStates.unexploded);
        setPlaying(newStates.playing);
        setCells(newStates.cells);
    }
    
    return(
        <>
            <div className="top-row">
                <Counter count={unexploded}></Counter>
                <span className='message-text'>
                    {playing === 'lost' && 'Bad luck! Try again.'}
                    {playing === 'won' && 'Congratulations! You cleared the field.'}
                </span>
            </div>
            <div className="field">
                {cells.map(r => r.map(c => <Cell onFlag={()=>cellFlag(c)} 
                                                onClick={()=>cellClick(c)} 
                                                onDoubleClick={()=>cellDoubleClick(c)} 
                                                cellState={c} />))}
            </div>
            <div className="bottom-row"><button onClick={reset}>Reset</button></div>
        </>
    ); 
};