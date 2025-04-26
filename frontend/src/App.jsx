<<<<<<< HEAD

import TeamMembers from './components/TeamMembers';
import AuthCard from './components/AuthCard';

function App() {
  return <TeamMembers />;
  return <AuthCard />;
=======
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Chatbot from "./Components/Chatbot";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

     
    </>
  );
>>>>>>> e3be2d5cd0c4f1319d171b06578c3ae28670baa6
}


export default App;
// import AppRoutes from './components/AuthCard';
// import AppRoutes from './components/TeamMembers'; // import your AppRoutes

// function App() {
//   return (
//     <>
//       <AppRoutes />
//     </>
//   );
// }

// export default App;

