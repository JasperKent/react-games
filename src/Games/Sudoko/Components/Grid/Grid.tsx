export const Grid = () => {
    const cells: number[][] = [];

    for (let col = 0; col < 9; ++col){
        cells.push([]);

        for (let row = 0; row < 9; ++row){
            cells[col].push(row);
        }
    }

    return (
        <div>
            {cells.map(r => r.map(c => <input />))}
        </div>
    );
}