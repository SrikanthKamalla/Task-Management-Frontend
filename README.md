
# Task Management App 
<a href="https://task-management-frontend-alpha-one.vercel.app/">Live Demo</a>

---

## 🚀 Features
- ✅ Responsive UI (TailwindCSS)
- ✅ Authentication (Login, Signup, Logout)
- ✅ Protected Routes (JWT-based auth)
- ✅ Dashboard with CRUD operations on tasks (create, view, update, delete)
- ✅ User profile fetch & update
- ✅ Search and filter tasks

---


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express, mongoDB



## Installation

### Project Setup

#### Prerequisites
- Node.js
- npm 
- MongoDB

### Install my-project
#### Frontend
  - git clone https://github.com/SrikanthKamalla/Task-Management-Frontend
  - cd "folder name"
  - npm i
  - npm run dev

#### Backend
 - git clone https://github.com/SrikanthKamalla/Task-Management-Backend
  - cd "folder name"
  - npm i
  - npm run dev


## Environment Variables
#### Frontend
```
  VITE_API_URL ->your backend url 
```
#### Backend
```
  PORT
  MONGODB_URI
  JWT_SECRET_KEY
  FRONTEND_URL
```

## Pages & Functionality
### Login & Signup

- Secure authentication for trustees, school admins.
- JWT-based session management.

### Dashboard

Displays key statistics:

- Total tasks.

- Shows completed, pending and task priorities.


### Tasks

- Add task with priorities and due date.
- We can see all Tasks in this page.
- Search tasks based on search input, status and priorities.
