import { MinesweeperProvider } from "../../contexts/MinesweeperContext";
import { BottomRow } from "../BottomRow/BottomRow";
import { Field } from "../Field/Field";
import { TopRow } from "../TopRow/TopRow";
import './Minesweeper.css';

export const Minesweeper = () => {
    const initWidth = 40;
    const initHeight = 20;
    const initCoverPercent = 15;

    return (
        <div className="game">
            <h1>Minesweeper</h1>
            <MinesweeperProvider 
                initHeight={initHeight} 
                initWidth={initWidth} 
                initCoverPercent={initCoverPercent}>
                <TopRow></TopRow>
                <Field></Field>
                <BottomRow initWidth={initWidth} initHeight={initHeight} initPercent={initCoverPercent}></BottomRow> 
            </MinesweeperProvider>
        </div>
    );
};
