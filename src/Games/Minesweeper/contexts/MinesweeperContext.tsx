import {createContext, PropsWithChildren, useState} from 'react';
import { FieldStates } from '../Logic/FieldStates';

export interface MinesweeperData {
    playing: 'lost' | 'won' | 'playing';
    unexploded: number;
    reset: (width: number, height: number, coverCount: number) => void;
}

export const DefaultMinesweeperData: MinesweeperData = {playing: 'won', unexploded: 0, reset: ()=>{}};

export const MinesweeperContext = createContext<MinesweeperData>({
    playing: 'playing',
    reset: () => {},
    unexploded: 0
});

interface Props {
    initWidth: number;
    initHeight: number;
    initCoverPercent: number;
}

export const MinesweeperProvider = ({children, initWidth, initHeight, initCoverPercent}: PropsWithChildren<Props>) => {
    const [states,setStates] = useState(() => new FieldStates(initWidth, initHeight, Math.floor(initWidth * initHeight * initCoverPercent / 100)));
    const [cells, setCells] = useState(states.cells);
    const [unexploded, setUnexploded] = useState(states.unexploded);
    const [playing, setPlaying] = useState(states.playing);

    const reset = (width: number, height: number, coverCount: number) => {
        var newStates = new FieldStates(width, height, coverCount);

        setStates(newStates);
        setUnexploded(newStates.unexploded);
        setPlaying(newStates.playing);
        setCells(newStates.cells);
    }

    const refresh = () => {
        setCells([...cells]);
        setUnexploded(states.unexploded);
        setPlaying(states.playing);
    };

    return(
        <MinesweeperContext.Provider value={{ unexploded, playing, reset }}>
            {children}
        </MinesweeperContext.Provider>
    );
}