import { Link } from "react-router-dom";
import "./Menu.css";

export const Header = () => {
    return (
        <header className="App-header">
            <ul>
                <li><Link to="/">Minesweeper</Link></li>
                <li><Link to="/Sudoko">Sudoko</Link></li>
            </ul>
        </header>
    );
}