import { CellState } from './FieldStates';

test('creation', () => {   
    const cell = new CellState(1, () => {}, () => {});

    expect(cell).not.toBeNull();
});

test('intial flag is "none"', () => {   
    const cell = new CellState(1, () => {}, () => {});
    
    expect(cell.flagged).toEqual('none');
});

test('flag from "none" to "flag"', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.flag();

    expect(cell.flagged).toEqual('flag');
});

test('flag from "flag" to "query"', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.flag();
    cell.flag();

    expect(cell.flagged).toEqual('query');
});

test('flag from "query" to "none"', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.flag();
    cell.flag();
    cell.flag();

    expect(cell.flagged).toEqual('none');
});

test('blowing sets to blown', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.isBlown = true;

    expect(cell.isBlown).toBeTruthy();
});

test('blowing flagged leaves unblown', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.flag();

    cell.isBlown = true;

    expect(cell.isBlown).toBeFalsy();
});

test('blowing mined triggers bang', () => {   
    let bang = false;

    const cell = new CellState(1, () => bang = true, () => {});

    cell.isMined = true;
    cell.isBlown = true;

    expect(bang).toBeTruthy();
});

test('blowing unmined doesnt trigger bang', () => {   
    let bang = false;

    const cell = new CellState(1, () => bang = true, () => {});

    cell.isMined = false;
    cell.isBlown = true;

    expect(bang).toBeFalsy();
});

test('blowing unmined doesnt trigger bang', () => {   
    let bang = false;

    const cell = new CellState(1, () => bang = true, () => {});

    cell.isMined = false;
    cell.isBlown = true;

    expect(bang).toBeFalsy();
});

test('clicking unblown blows', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.isBlown = true;

    expect(cell.isBlown).toBeTruthy();
});

test('clicking unblown triggers clear', () => {   
    let clear = 0;

    const cell = new CellState(1, () => {}, () => ++clear);

    cell.click();

    expect(clear).toEqual(1);
});

test('clicking blown does not retrigger clear', () => {   
    let clear = 0;

    const cell = new CellState(1, () => {}, () => ++clear);

    cell.click();
    cell.click();

    expect(clear).toEqual(1);
});

test('neighbouring mines counted correctly', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.neighbours.push(new CellState(2, () => {}, () => {}));
    cell.neighbours.push(new CellState(3, () => {}, () => {}));
    
    cell.neighbours[0].isMined = true;

    expect(cell.neighbouringMines).toEqual(1);
});

test('neighbouring flags counted correctly', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.neighbours.push(new CellState(2, () => {}, () => {}));
    cell.neighbours.push(new CellState(3, () => {}, () => {}));
    
    cell.neighbours[0].flag();

    expect(cell.neighboursFlagged).toEqual(1);
});

test('neighbouring queries counted correctly', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.neighbours.push(new CellState(2, () => {}, () => {}));
    cell.neighbours.push(new CellState(3, () => {}, () => {}));
    
    cell.neighbours[0].flag();
    cell.neighbours[0].flag();

    expect(cell.neighboursFlagged).toEqual(0);
});

test('neighbours cleared when zero cell clicked', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.neighbours.push(new CellState(2, () => {}, () => {}));
    cell.neighbours.push(new CellState(3, () => {}, () => {}));
    
    cell.click();

    expect(cell.neighbours[0].isBlown).toBeTruthy();
    expect(cell.neighbours[1].isBlown).toBeTruthy();
});

test('unflagged neighobours cleared when cell double clicked', () => {   
    const cell = new CellState(1, () => {}, () => {});

    cell.neighbours.push(new CellState(2, () => {}, () => {}));
    cell.neighbours.push(new CellState(3, () => {}, () => {}));
    
    cell.isBlown = true;

    cell.neighbours[0].isMined = true;
    cell.neighbours[0].flag();

    cell.doubleClick();

    expect(cell.neighbours[0].isBlown).toBeFalsy();
    expect(cell.neighbours[1].isBlown).toBeTruthy();
});
