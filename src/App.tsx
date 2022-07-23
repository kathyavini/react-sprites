import './App.css';
import { GameWindow } from './components/GameWindow';
import { useConfig } from './hooks/useConfig';

function App() {
  useConfig(); // Sets CSS variables from the gameConfig on initial render

  return (
    <div className="game-container">
      <GameWindow />
    </div>
  );
}

export default App;
