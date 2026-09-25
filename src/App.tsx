import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ExpoAgro from "./pages/ExpoAgro";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/expoagro" element={<ExpoAgro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
