# Task Management Application

A full-stack web application to manage teams, projects, and tasks. Built with **React + TypeScript** on the frontend and **Express.js + MongoDB + TypeScript** on the backend.

## Features

### Team Management
- Add, update, delete team members
- Fields: name, email, designation
- Pagination support

### Project Management
- Create projects and assign team members
- View and edit projects with assigned teams
- Pagination support

### Task Management
- Create and manage tasks linked to projects
- Assign multiple team members
- Track status: to-do, in-progress, done, cancelled
- Filter by status, project, member, date range, search
- Pagination support

### Validations
- All forms are validated using **Zod**
- Backend routes also use Zod for validation

### Type Safety
- Fully type-safe using **TypeScript** in both frontend and backend

##  Tech Stack

| Layer      | Technologies                             |
|------------|-------------------------------------------|
| Frontend   | React, TypeScript, Bootstrap, Formik, Zod |
| Backend    | Express.js, TypeScript, Mongoose, Zod     |
| Database   | MongoDB                                   |


