import React, { lazy, Suspense } from "react";
import { Routes, Route , Navigate  } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProjectLayout from "../layouts/ProjectLayout";
import Loader from "../components/Loader";
import Profile from "../pages/Profile";
import AuthCard from "../components/AuthCard";
import Notification from "../Components/Notification";
import ProjectOverview from "../pages/ProjectOverview";
import ProtectedRoute from "../Components/ProtectedRoute";

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Team = lazy(() => import('../pages/Team'));
const TimelinePage = lazy(() => import('../pages/TimelinePage'));
const Chat = lazy(() => import('../pages/Chat'));
const ProjectDetails = lazy(() => import('../pages/ProjectDetails'));

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthCard />} />

        {/* General Protected Layout */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Project Routes Nested under /project/:id */}
        <Route path="/project/:id" element={<ProjectLayout />}>
         <Route
  path="/project/:id"
  element={<Navigate to="overview" replace />}
/>
          <Route
            path="overview"
            element={
              <ProtectedRoute>
                <ProjectOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="team"
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />
          <Route
            path="timeline"
            element={
              <ProtectedRoute>
                <TimelinePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
