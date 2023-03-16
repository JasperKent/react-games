import { useConfigureField } from "../../hooks/useConfigureField";
import './BottomRow.css';

interface Props {
    initWidth: number;
    initHeight: number;
    initPercent: number;
}

export const BottomRow = ({initWidth, initHeight, initPercent}: Props) =>{

    const {reset, width, height, coverCount, coverPercent, changeCoverCount, changeCoverPercent, changeWidth, changeHeight }
        = useConfigureField(initWidth, initHeight, initPercent);

    return (
        <div className="bottom-row">
            <button onClick={() => reset(width, height, coverCount)}>Reset</button>
            <span>
                <label>Lay</label><input type="number" value={coverCount} onChange={e => changeCoverCount(parseInt(e.target.value))} />
                <label>mines or</label><input type="number" value={coverPercent} onChange={e => changeCoverPercent(parseInt(e.target.value))} /><label>%.{"   "}</label>
                <label>Width:</label><input type="number" value={width} onChange={e => changeWidth(parseInt(e.target.value))} />
                <label>Height:</label><input type="number" value={height} onChange={e => changeHeight(parseInt(e.target.value))} />
            </span>
        </div>
    );
}