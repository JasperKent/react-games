import { useState } from "react";
import { MinesweeperProvider } from "../../contexts/MinesweeperContext";
import { FieldStates } from "../../Logic/FieldStates";
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
                initHeight={initWidth} 
                initWidth={initHeight} 
                initCoverPercent={initCoverPercent}>
                <TopRow></TopRow>
                {/* <Field cells={cells} playing={playing} refresh={refresh}></Field>*/}
                <BottomRow width={initWidth} height={initHeight} percent={initCoverPercent}></BottomRow> 
            </MinesweeperProvider>
        </div>
    );
};
