# Notification System

## Overview
This project fetches notifications from an external API, processes them, and displays the top 10 notifications based on priority and timestamp.

## Features
- Fetch notifications from API
- Sort by priority (Placement > Result > Event)
- Show latest notifications
- Backend logging middleware
- Responsive frontend UI

## Tech Stack
- Backend: Node.js, Express
- Frontend: React (Vite)
- Logging Middleware

## How to Run

### Backend
cd notification_app_be
npm install
node app.js

### Frontend
cd frontend
npm install
npm run dev

## API Endpoint
http://localhost:5000/notifications

## Screenshots
See `/screenshots` folder

## System Design
See `notification_system_design.md`
