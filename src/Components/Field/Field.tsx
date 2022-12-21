import { useState } from 'react';
import { CellState } from '../../Logic/CellState';
import { FieldStates } from '../../Logic/FieldStates';
import { Cell } from '../Cell/Cell';
import { Counter } from '../Counter/Counter';
import './Field.css';

export const Field = () => {
    const [width, setWidth] = useState(40);
    const [height, setHeight] = useState(20);
    const [coverPercent, setCoverPercent] = useState(15);
    const [coverCount, setCoverCount] = useState(Math.floor(width * height * coverPercent/100));
   
    const [states,setStates] = useState(() => new FieldStates(width, height, coverCount));
    const [cells, setCells] = useState(states.cells);
    const [unexploded, setUnexploded] = useState(states.unexploded);
    const [playing, setPlaying] = useState(states.playing);
    const [fieldStyle, setFieldStyle] = useState({ width: `${width * FieldStates.CellWidth}px`});

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
        var newStates = new FieldStates(width, height, coverCount);

        setStates(newStates);
        setUnexploded(newStates.unexploded);
        setPlaying(newStates.playing);
        setCells(newStates.cells);
        setFieldStyle({ width: `${width * FieldStates.CellWidth}px`});
    }

    const changeCoverCount = (count: number) => {
        setCoverCount(count);
        setCoverPercent((count * 100)/(width * height));
    }

    const changeCoverPercent = (percent: number) => {
        setCoverPercent(percent);
        setCoverCount(Math.floor (width * height * percent/100));
    }    

    const changeWidth = (w: number) => {
        w = isNaN(w) ? 0 : w;

        setWidth(w);
        setCoverCount(Math.floor (w * height * coverPercent/100));
    }
    
    const changeHeight = (h: number) => {
        h = isNaN(h) ? 0 : h;

        setHeight(h);
        setCoverCount(Math.floor (width * h * coverPercent/100));
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
            <div className="field" style={fieldStyle}>
                {cells.map(r => r.map(c => <Cell key={c.key} onFlag={()=>cellFlag(c)} 
                                                onClick={()=>cellClick(c)} 
                                                onDoubleClick={()=>cellDoubleClick(c)} 
                                                cellState={c} />))}
            </div>
            <div className="bottom-row">
                <button onClick={reset}>Reset</button>
                <span>
                    <label>Lay</label><input type="number" value={coverCount} onChange={e => changeCoverCount(parseInt(e.target.value))} />
                    <label>mines or</label><input type="number" value={coverPercent} onChange={e => changeCoverPercent(parseInt(e.target.value))} /><label>%.{"   "}</label>
                    <label>Width:</label><input type="number" value={width} onChange={e => changeWidth(parseInt(e.target.value))} />
                    <label>Height:</label><input type="number" value={height} onChange={e => changeHeight(parseInt(e.target.value))} />
                </span>
            </div>
        </>
    ); 
};