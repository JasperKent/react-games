import { CellState } from "../../Logic/CellState";
import './Cell.css';

type Props = {
    cellState: CellState;
    onClick: () => void;
    onDoubleClick: () => void;
    onFlag: () => void;
};

export const Cell = ({cellState, onClick, onFlag, onDoubleClick}: Props) => {
    const getClass = (cellState: CellState) => {
        if (!cellState.isBlown) {
            switch(cellState.flagged)
            {
                case 'none': return 'mine-hidden';
                case 'flag': return 'mine-flagged';
                case 'query': return 'mine-query'
            }
        }
        else {
            return cellState.isMined ? 'mine-blown' : `mine-shown val-${cellState.neighbouringMines}`;
        }
    }

    const onRightClick = (e : React.MouseEvent) => {
        e.preventDefault();
        onFlag();
    };

    return (
        <button onClick={onClick} className={'mine-cell ' + getClass(cellState)} onContextMenu={onRightClick} onDoubleClick={onDoubleClick}></button>
    );
}