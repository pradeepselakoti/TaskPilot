// src/context/RoleContext.jsx
import { createContext, useEffect, useState } from "react";
import api from "../api";
const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await api.get("/user/me"); 
        //  console.log("User data from backend in RoleContext:", res.data);
        setRole(res.data.data.role); // e.g., 'admin', 'intern', etc.
      } catch (err) {
        console.error("Error fetching role from backend:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return (
    <RoleContext.Provider value={{ role, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContext;
