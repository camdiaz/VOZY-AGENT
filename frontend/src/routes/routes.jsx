import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AgentView from "../pages/AgentView";
import HistoryView from "../pages/HistoryView";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/asistente" element={<AgentView />} />
      <Route path="/historial" element={<HistoryView />} />
    </Routes>
  );
}

export default AppRoutes;
