import { Solver } from "./Solver";

test('creation', () => {   
    const solver = new Solver ();

    expect(solver).not.toBeNull();
});

test('centre cell filled gives correct counts', () => {   
    const solver = new Solver ();

    solver.cells[4][4].inputValue = 1;

    solver.solve();

    expect(solver.cells[0][0].count).toEqual(0);
    expect(solver.cells[4][0].count).toEqual(1);
    expect(solver.cells[5][5].count).toEqual(1);
    expect(solver.cells[4][4].count).toEqual(0);
});

test('centre and bottom right cells filled gives correct counts', () => {   
    const solver = new Solver ();

    solver.cells[4][4].inputValue = 1;
    solver.cells[8][8].inputValue = 1;

    solver.solve();

    expect(solver.cells[0][0].count).toEqual(0);
    expect(solver.cells[4][0].count).toEqual(1);
    expect(solver.cells[5][5].count).toEqual(1);
    expect(solver.cells[4][4].count).toEqual(0);
    expect(solver.cells[8][8].count).toEqual(0);
    expect(solver.cells[8][0].count).toEqual(1);
    expect(solver.cells[0][8].count).toEqual(1);
    expect(solver.cells[4][8].count).toEqual(2);
});