import { useState } from "react";
import { FieldStates } from "../../Logic/FieldStates";
import { BottomRow } from "../BottomRow/BottomRow";
import { Field } from "../Field/Field";
import { TopRow } from "../TopRow/TopRow";
import './Minesweeper.css';

export const Minesweeper = () => {
    const initWidth = 40;
    const initHeight = 20;
    const initCoverPercent = 15;

    const [states,setStates] = useState(() => new FieldStates(initWidth, initHeight, Math.floor(initWidth * initHeight * initCoverPercent / 100)));
    const [cells, setCells] = useState(states.cells);
    const [unexploded, setUnexploded] = useState(states.unexploded);
    const [playing, setPlaying] = useState(states.playing);

    const reset = (width: number, height: number, coverCount: number) => {
        var newStates = new FieldStates(width, height, coverCount);

        setStates(newStates);
        setUnexploded(newStates.unexploded);
        setPlaying(newStates.playing);
        setCells(newStates.cells);
    }

    const refresh = () => {
        setCells([...cells]);
        setUnexploded(states.unexploded);
        setPlaying(states.playing);
    };

    return (
        <div className="game">
            <h1>Minesweeper</h1>
            <TopRow playing={playing} unexploded={unexploded}></TopRow>
            <Field cells={cells} playing={playing} refresh={refresh}></Field>
            <BottomRow width={initWidth} height={initHeight} percent={initCoverPercent} onReset={reset}></BottomRow>
        </div>
    );
};
