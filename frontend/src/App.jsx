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
}

export default App;
