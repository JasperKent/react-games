import { useState } from 'react';
import { CellState } from '../../Logic/CellState';
import { FieldStates } from '../../Logic/FieldStates';
import { BottomRow } from '../BottomRow/BottomRow';
import { Cell } from '../Cell/Cell';
import { Counter } from '../Counter/Counter';
import { TopRow } from '../TopRow/TopRow';
import './Field.css';

export const Field = () => {
    const initWidth = 40;
    const initHeight = 20;
    const initCoverPercent = 15;

    const [states,setStates] = useState(() => new FieldStates(initWidth, initHeight, Math.floor(initWidth * initHeight * initCoverPercent / 100)));
    const [cells, setCells] = useState(states.cells);
    const [unexploded, setUnexploded] = useState(states.unexploded);
    const [playing, setPlaying] = useState(states.playing);
    const [fieldStyle, setFieldStyle] = useState({ width: `${initWidth * FieldStates.CellWidth}px`});

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

    const reset = (width: number, height: number, coverCount: number) => {
        var newStates = new FieldStates(width, height, coverCount);

        setStates(newStates);
        setUnexploded(newStates.unexploded);
        setPlaying(newStates.playing);
        setCells(newStates.cells);
        setFieldStyle({ width: `${width * FieldStates.CellWidth}px`});
    }
    
    return(
        <>
            <TopRow playing={playing} unexploded={unexploded}></TopRow>
            <div className="field" style={fieldStyle}>
                {cells.map(r => r.map(c => <Cell key={c.key} onFlag={()=>cellFlag(c)} 
                                                onClick={()=>cellClick(c)} 
                                                onDoubleClick={()=>cellDoubleClick(c)} 
                                                cellState={c} />))}
            </div>
            <BottomRow width={initWidth} height={initHeight} percent={initCoverPercent} onReset={reset}></BottomRow>
        </>
    ); 
};