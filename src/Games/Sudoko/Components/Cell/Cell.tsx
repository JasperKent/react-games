import { SolverCell } from "../../Logic/SolverCell";
import "./Cell.css"

type Props = {
    cell: SolverCell;
    onValueSet: (value: number | null) => void;
}

export const Cell = ({onValueSet, cell}: Props) => {
    return <input value={cell.displayValue ?? ""} className={cell.displayingInput ? 'cell-input' : 'cell-solved'} onChange={ e => onValueSet(parseInt (e.target.value))} />;
}