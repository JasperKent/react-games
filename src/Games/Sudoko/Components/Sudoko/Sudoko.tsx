import { useState } from "react";
import { Solver } from "../../Logic/Solver";
import { Grid } from "../Grid/Grid";
import "./Sudoko.css"

export const Sudoko = () => {
    const [status, setStatus] = useState('Enter some values and then click "Solve".');
    const [solver] = useState(() => new Solver());
    const [cells, setCells] = useState(solver.cells);
    
    const onValueSet = (x: number, y: number, value: number | null) => {
        solver.setCell(x, y, value);
        setCells([...solver.cells]);
    };

    const onClearClicked = () => {
        solver.reset();
  
        setStatus('Enter some values and then click "Solve".');
        setCells([...solver.cells]);
    };

    const onSolveClicked = () => {
        if (solver.solve()){
            setStatus('Solved! Click "Clear" to start again.');
            setCells([...solver.cells]);
        }
        else{
            setStatus('Failed! Those numbers are not soluble.');
        }
    };

    return(
        <div className="game">
            <h1>Sudoko</h1>
            <Grid onValueSet={onValueSet} cells={cells} />
            <div className="button-wrapper">
                <div className="sudoko-status">{status}</div>
                <button onClick={onSolveClicked}>Solve</button>
                <button onClick={onClearClicked}>Clear</button>
            </div>
        </div>
    );
};