import Level from "./pages/Level";
import Game from "./components/Game";
import { Routes, Route } from "react-router-dom";
import Prompt from "./components/Prompt";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Level />} />
        <Route path="/level" element={<Level />} />
        <Route path="/game/:level" element={<Game />} />
        <Route path="/*" element="not found page" />
      </Routes>
    </>
  );
}

export default App;
