import { CellState } from "../../Logic/FieldStates";
import './Cell.css';

type Props = {
    cellState: CellState;
    onClick: () => void;
};

export const Cell = ({cellState, onClick}: Props) => {
    const getClass = (cellState: CellState) => {
        if (!cellState.isBlown){
            return 'mine-hidden';
        }
        else {
            return cellState.isMined ? 'mine-blown' : `mine-shown val-${cellState.neighbouringMines}`;
        }
    }

    return (
        <button onClick={onClick} className={getClass(cellState)}></button>
    );
}