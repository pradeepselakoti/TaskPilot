
# Task Pilot API Collection

This Postman collection provides access to the Task Pilot backend API, including user authentication, role request management, project tracking, and task management features.

## Base URL
```
http://localhost:5000/api/v1
```

---

## 🔐 Authentication

### Register
- **Endpoint**: `POST /auth/register`
- **Body** (JSON):
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
- **Endpoint**: `POST /auth/login`
- **Body** (JSON):
```json
{
  "email": "sample",
  "password": "wfrerve"
}
```

---

## 👤 User

### Get User Profile
- **Endpoint**: `GET /user/me`

### Update User Profile
- **Endpoint**: `PUT /user/me`
- **Body** (JSON):
```json
{
  "first_name": "micky",
  "last_name": "jackson",
  "email": "mokka@sample.com"
}
```

---

## 🔐 Role Request

### Create Role Request
- **Endpoint**: `POST /roles/requests`
- **Body** (JSON):
```json
{
  "requested_role": "intern"
}
```

### Get All Requests
- **Endpoint**: `GET /roles/requests`
- **Query Parameters**:
  - `status=rejected`
  - `requested_role=intern`
  - `page=1`
  - `limit=5`

### Approve or Reject Request
- **Endpoint**: `GET` *(endpoint not fully specified)*

---

## 📁 Projects

### List Projects
- **Endpoint**: `GET /projects`

### Create Project
- **Endpoint**: `POST /projects`
- **Body** (JSON):
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

### Get Project by ID
- **Endpoint**: `GET /projects/:projectId`

### Update Project by ID
- **Endpoint**: `PUT /projects/:projectId`
- **Body** (JSON):
```json
{
  "name": "Project Name",
  "overview": "Project Overview",
  "start_date": "2023-01-01",
  "end_date": "2023-12-31",
  "repo_link": "",
  "environment_link": "",
  "tech_stack": ["React", "Node.js", "Express js"]
}
```

### Delete Project by ID
- **Endpoint**: `DELETE /projects/:projectId`

### Get Project Timeline
- **Endpoint**: `GET /projects/:projectId/timeline`

---

## ✅ Tasks

### Create a Task
- **Endpoint**: `POST /projects/:projectId/tasks`
- **Body** (JSON):
```json
{
  "assigned_to": "63f8b0e4c1a2d3b4f8c1a2d3",
  "title": "Task 1",
  "description": "Task 1 description",
  "status": "in-progress",
  "start_date": "2025-01-01",
  "end_date": "2025-01-01",
  "verified_by": "63f8b0e4c1a2d3b4f8c1a2d3"
}
```

### Get All Tasks in Project
- **Endpoint**: `GET /projects/:projectId/tasks`

### Get Task by ID
- **Endpoint**: `GET /tasks/:taskId` *(Body/URL not specified)*

### Update Task by ID
- **Endpoint**: `PUT /tasks/:taskId`
- **Body** (JSON):
```json
{
  "assigned_to": {
    "_id": "680db21c5122c83715d5429a",
    "email": "mokka@sample.com"
  },
  "title": "Task 4",
  "description": "Task 1 description",
  "status": "in-progress",
  "start_date": "2024-12-31T18:30:00.000Z",
  "end_date": "2024-12-31T18:30:00.000Z"
}
```

---

## 🛠 Notes
- Ensure the backend server is running on `localhost:5000`.
- Some GET endpoints for specific tasks/approvals lack full URL details.
