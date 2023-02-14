import { useContext } from "react";
import { MinesweeperContext } from "../../contexts/MinesweeperContext";
import { Counter } from "../Counter/Counter";
import './TopRow.css'

export const TopRow = () => {
    const {playing, unexploded} = useContext(MinesweeperContext);

    return(
        <div className="top-row">
        <Counter count={unexploded}></Counter>
        <span className='message-text'>
            {playing === 'lost' && 'Bad luck! Try again.'}
            {playing === 'won' && 'Congratulations! You cleared the field.'}
        </span>
    </div>
    );
}