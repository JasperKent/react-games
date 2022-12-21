import { FieldStates } from './FieldStates';

test('creation', () => {   
    const field = new FieldStates (4, 3, 2);

    expect(field).not.toBeNull();
});

test('initially playing', () => {   
    const field = new FieldStates (4, 3, 2);

    expect(field.playing).toEqual('playing');
});

test('initial mine count correct', () => {   
    const field = new FieldStates (4, 3, 2);

    expect(field.unexploded).toEqual(2);
});

test('mine count correct after flag', () => {   
    const field = new FieldStates (4, 3, 2);

    field.cells[0][0].flag();

    expect(field.unexploded).toEqual(1);
});


test('blown min is "lost"', () => {   
    const field = new FieldStates (4, 3, 2);

    for (let row = 0; row < 3; ++row){
        for (let col = 0; col < 4; ++col){
            if (field.cells[row][col].isMined){
                field.cells[row][col].click();

                col = row = 100; // Double break
            }
        }
    }

    expect(field.playing).toEqual('lost');
});

test('all cleared is "won"', () => {   
    const field = new FieldStates (4, 3, 2);

    for (let row = 0; row < 3; ++row){
        for (let col = 0; col < 4; ++col){
            if (field.cells[row][col].isMined){
                field.cells[row][col].flag();
            }
        }
    }

    expect(field.playing).toEqual('won');
});


