// src/context/RoleContext.jsx
import { createContext } from "react";

const RoleContext = createContext({
  role: "admin", // Change to 'admin' to see admin UI or intern to see intern UI
});

export default RoleContext;
