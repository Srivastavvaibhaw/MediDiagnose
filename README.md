# MediDiagnose - Health insights at your fingertips.

![App Screenshot](frontend/public/assets/who.jpg)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://react.dev/)

A full-stack web application for disease diagnosis using AI, featuring a React frontend and Node.js backend.

## Project Structure

```
backend/    # Node.js backend server, API routes, utilities
frontend/   # React frontend app, assets, components, styles
```

## Features
- User authentication
- Symptom input and disease prediction
- Image upload for diagnosis
- Secure data handling
- Modern, responsive UI

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Backend Setup
```powershell
cd backend
npm install
npm start
```

### Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

## Directory Overview
- **backend/routes/**: API route handlers
- **backend/utils/**: Utility functions
- **backend/uploads/**: Uploaded files
- **frontend/src/components/**: React components
- **frontend/src/pages/**: Page components
- **frontend/src/services/**: API and business logic
- **frontend/src/styles/**: CSS and theme files

## License
MIT

---

*For more details, see the README in each subdirectory.*
