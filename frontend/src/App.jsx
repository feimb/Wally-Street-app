import { Routes, Route } from "react-router-dom";
import { AssetsComponent } from "./components/AssetsComponent";
import StatPage from "./pages/stat/StatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StatPage />} />
      <Route path="/assets" element={<AssetsComponent />} />
    </Routes>
  );
}

export default App;