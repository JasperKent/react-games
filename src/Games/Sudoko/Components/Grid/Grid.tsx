import { SolverCell } from "../../Logic/SolverCell";
import { Cell } from "../Cell/Cell";
import "./Grid.css"

type Props = {
    cells: SolverCell[][];
    onValueSet: (x: number, y: number, value: number | null) => void;
};

export const Grid = ({onValueSet, cells}: Props) => {

    const numbers = [0,1,2,3,4,5,6,7,8];

    return (
        <table className="sudoko-grid">
            <tbody>
                {numbers.map(y => (
                    <tr key={y}>{numbers.map(x => (
                        <td key={y * 9 + x} >
                            <Cell cell={cells[x][y]} onValueSet={val => onValueSet(x, y, val)} />
                        </td>))}
                </tr>))}
            </tbody>
        </table>
    );
}