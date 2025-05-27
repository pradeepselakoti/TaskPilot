
# TaskPilot Backend API

Welcome to the **TaskPilot** backend API documentation. This document outlines the available endpoints, their usage, and access control. The backend serves as the foundation for managing users, roles, projects, tasks, and teams.

## 🛠 Base URL

```
http://localhost:5000/api/v1
```

> ⚠️ All endpoints (except `/auth/*`) require JWT authentication.

---

## 🔐 Authentication

### Register

- **Endpoint:** `POST /auth/register`
- **Description:** Register a new user.
- **Body:**
```json
{
  "first_name": "Nikhil",
  "last_name": "kiran",
  "email": "magen@sample.com",
  "password": "wfrerve",
  "role": "pending"
}
```

### Login

- **Endpoint:** `POST /auth/login`
- **Description:** Login and receive authentication token.
- **Body:**
```json
{
  "email": "sample",
  "password": "wfrerve"
}
```

---

## 👤 User

### Get User Profile

- **Endpoint:** `GET /user/me`
- **Access:** Authenticated users

### Update User Profile

- **Endpoint:** `PUT /user/me`
- **Body:**
```json
{
  "first_name": "micky",
  "last_name": "jackson",
  "email": "mokka@sample.com"
}
```

- **Access:** Authenticated users

---

## 🛡️ Role Requests

### Create Role Request

- **Endpoint:** `POST /roles/requests`
- **Description:** Submit a request to change user role.
- **Access:** Authenticated users (pending, intern, tl, cos)

### List Role Requests

- **Endpoint:** `GET /roles/requests`
- **Query Parameters:** `status`, `requested_role`, `page`, `limit`
- **Access:** Admin

### Approve/Reject Role Request

- **Endpoint:** `PATCH /roles/requests/:request_id`
- **Body:**
```json
{
  "status": "approved" // or "rejected"
}
```
- **Access:** Admin

---

## 📁 Projects

### List Projects

- **Endpoint:** `GET /projects`
- **Query Parameters:** `created_by`, `discarded`, `search`
- **Access:** intern, tl, cos, admin

### Create Project

- **Endpoint:** `POST /projects`
- **Body:**
```json
{
  "name": "Project Name",
  "overview": "Project Overview",
  "start_date": "2023-01-01",
  "end_date": "2023-12-31",
  "repo_link": "",
  "environment_link": "",
  "tech_stack": ["React", "Node.js"]
}
```
- **Access:** cos, admin

### Get/Update/Delete Project by ID

- **GET /projects/:id** – Get project details  
- **PUT /projects/:id** – Update project  
- **DELETE /projects/:id** – Soft delete (admin only)  
- **Access:** Varies (see above)

### Project Timeline

- **Endpoint:** `GET /projects/:id/timeline`
- **Access:** intern, tl, cos, admin

---

## 👥 Project Teams

### Create/Update/Delete Team

- **POST /projects/team/:id** – Create team  
- **PUT /projects/team/:id** – Update team (tl, admin)  
- **DELETE /projects/team/:id** – Delete team (admin)  
- **Access:** tl, cos, admin

### Get/List Teams

- **GET /projects/team/:id** – Get team  
- **GET /projects/team/all** – List all teams (admin)  
- **Access:** Varies

---

## 🔗 Project Assignment

### Request Assignment

- **Endpoint:** `POST /projects/assign/request`
- **Body:**
```json
{
  "project_id": "..."
}
```
- **Access:** intern, tl, cos, admin

### List/Verify Assignments

- **GET /projects/assign/all** – List all assignments  
- **PUT /projects/assign/verify** – Verify assignment  
```json
{
  "project_id": "...",
  "member_id": "..."
}
```
- **Access:** tl, cos, admin

---

## ✅ Tasks

### Create/List Tasks

- **POST /projects/:id/tasks** – Create a task  
```json
{
  "assigned_to": "...",
  "title": "Task 1",
  "description": "Task 1 description",
  "status": "in-progress",
  "start_date": "2025-01-01",
  "end_date": "2025-01-01",
  "verified_by": "..."
}
```
- **GET /projects/:id/tasks** – List all tasks  
- **Access:** Varies

### Task Details/Assignment/Verification

- **GET /tasks/:id** – Get task  
- **PUT /tasks/:id** – Update task (tl, admin)  
- **DELETE /tasks/:id** – Delete task (tl, admin)  
- **POST /tasks/:id/assign** – Assign task (tl, admin)  
- **PATCH /tasks/:id/assign/:assignment_id/verify** – Verify task (tl, admin)

### Task Updates

- **POST /tasks/:id/update** – Create update (intern)  
- **GET /tasks/:id/update** – List updates (authenticated users)


