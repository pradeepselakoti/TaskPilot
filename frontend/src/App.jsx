

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthCard from './components/AuthCard';   // your login/signup page
import TeamMembers from './components/TeamMembers'; // your team members page (you are working on this)
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthCard />} />
        <Route path="/team" element={<TeamMembers />} />
      </Routes>
    </Router>
  );
}

export default App;
