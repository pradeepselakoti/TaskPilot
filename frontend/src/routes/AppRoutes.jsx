import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProjectLayout from "../layouts/ProjectLayout";
import Login from "../pages/Login";

import Loader from "../components/Loader";
import Profile from "../pages/Profile";
import Dashboard from "../Components/Dashboard";
import Notification from "../Components/Notification";

// // Lazy Loading Pages
// const Dashboard = lazy(() => import('../pages/Dashboard'));
const Team = lazy(() => import("../pages/Team"));
const Timeline = lazy(() => import("../pages/Timeline"));
const Chat = lazy(() => import("../pages/Chat"));
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* General Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
        </Route>

        {/* Project Layout */}
        <Route element={<ProjectLayout />}>
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/project-overview" element={<Team />} />
          <Route path="/team" element={<Team />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
