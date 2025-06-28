import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Chatbot from "./Components/Chatbot";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext"; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider> 
          <AppRoutes />
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
