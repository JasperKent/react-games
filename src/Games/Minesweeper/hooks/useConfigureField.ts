import { useState, useContext } from "react";
import { MinesweeperContext } from "../contexts/MinesweeperContext";

export const useConfigureField = (initWidth: number, initHeight: number, initPercent: number) => {
    const [width, setWidth] = useState(initWidth);
    const [height, setHeight] = useState(initHeight);
    const [coverPercent, setCoverPercent] = useState(initPercent);
    const [coverCount, setCoverCount] = useState(Math.floor(width * height * coverPercent/100));
    
    const {reset} = useContext(MinesweeperContext);

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

    return {reset, width, height, coverCount, coverPercent, changeCoverCount, changeCoverPercent, changeWidth, changeHeight };
};
