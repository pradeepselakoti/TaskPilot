import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Team from '../pages/Team';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Team />} />

     
    </Routes>
  );
}

export default AppRoutes;
