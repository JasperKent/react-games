import { Minesweeper } from '../../Games/Minesweeper/Components/Minesweeper/Minesweeper';
import './App.css';
import { Sudoko } from '../../Games/Sudoko/Components/Sudoko/Sudoko';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from '../Menu/Menu';

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Minesweeper />}></Route>  
          <Route path="/Sudoko" element={<Sudoko />}></Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

