import { useState } from "react";
import './BottomRow.css';

type Props = {
    width: number;
    height: number;
    percent: number;
    onReset: (width: number, height: number, coverCount: number) => void;
}

export const BottomRow = (props: Props) =>{
    const [width, setWidth] = useState(props.width);
    const [height, setHeight] = useState(props.height);
    const [coverPercent, setCoverPercent] = useState(props.percent);
    const [coverCount, setCoverCount] = useState(Math.floor(width * height * coverPercent/100));
    
    const changeCoverCount = (count: number) => {
        setCoverCount(count);
        setCoverPercent((count * 100)/(width * height));
    }

    const changeCoverPercent = (percent: number) => {
        setCoverPercent(percent);
        setCoverCount(Math.floor (width * height * percent/100));
    }    

    const changeWidth = (w: number) => {
        w = isNaN(w) ? 0 : w;

        setWidth(w);
        setCoverCount(Math.floor (w * height * coverPercent/100));
    }
    
    const changeHeight = (h: number) => {
        h = isNaN(h) ? 0 : h;

        setHeight(h);
        setCoverCount(Math.floor (width * h * coverPercent/100));
    }

    return (
        <div className="bottom-row">
            <button onClick={() => props.onReset(width, height, coverCount)}>Reset</button>
            <span>
                <label>Lay</label><input type="number" value={coverCount} onChange={e => changeCoverCount(parseInt(e.target.value))} />
                <label>mines or</label><input type="number" value={coverPercent} onChange={e => changeCoverPercent(parseInt(e.target.value))} /><label>%.{"   "}</label>
                <label>Width:</label><input type="number" value={width} onChange={e => changeWidth(parseInt(e.target.value))} />
                <label>Height:</label><input type="number" value={height} onChange={e => changeHeight(parseInt(e.target.value))} />
            </span>
        </div>
    );
}