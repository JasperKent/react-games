import { Counter } from "../Counter/Counter";
import './TopRow.css'

type Props = {
    unexploded: number;
    playing: 'lost' | 'won' | 'playing';
}

export const TopRow = ({unexploded, playing}: Props) => {
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