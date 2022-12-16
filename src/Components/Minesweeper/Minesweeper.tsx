import { Field } from "../Field/Field";
import './Minesweeper.css';

export const Minesweeper = () => {
    return (
        <div className="game">
            <h1>Minesweeper</h1>
            <Field></Field>
        </div>
    );
};
