# MERN Stack User Management Application

A full-stack user management system built with MongoDB, Express, React, and Node.js featuring CRUD operations, search, pagination, and CSV export functionality.

## Project Structure

```
├── backend/                 # Node.js/Express server
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── routes/             # API routes
│   ├── models/             # MongoDB schemas
│   ├── middleware/         # Custom middleware
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env                # Environment variables
│
└── frontend/               # React.js application
    ├── src/
    │   ├── pages/          # Page components
    │   ├── components/     # Reusable components
    │   ├── services/       # API service (Fetch API)
    │   ├── utils/          # Utility functions
    │   ├── App.jsx         # Main component
    │   ├── main.jsx        # Entry point
    │   └── index.css       # Tailwind CSS
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ User search functionality
- ✅ Pagination support (10 users per page)
- ✅ Export users to CSV
- ✅ Form validation
- ✅ Responsive design (Mobile/Desktop)
- ✅ Success/Error notifications
- ✅ Modular architecture
- ✅ Fetch API (no external dependencies for HTTP)

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation & Setup

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create/Update `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_user_management
NODE_ENV=development
```

4. Start MongoDB (if running locally):

```bash
mongod
```

5. Start the server:

```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Application will run on `http://localhost:3000`

## API Endpoints

| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| GET    | `/api/users?page=1&limit=10`  | Get all users with pagination |
| GET    | `/api/users/:id`              | Get single user               |
| POST   | `/api/users`                  | Create new user               |
| PUT    | `/api/users/:id`              | Update user                   |
| DELETE | `/api/users/:id`              | Delete user                   |
| GET    | `/api/users/search?query=...` | Search users                  |
| GET    | `/api/users/export-csv`       | Export users to CSV           |

## User Model Fields

- firstName (required, min: 2 chars)
- lastName (required, min: 2 chars)
- email (required, unique, valid format)
- mobile (required, 10 digits)
- gender (required: Male/Female)
- status (required: Active/Inactive, default: Active)
- location (optional)
- profilePicture (optional)
- timestamps (createdAt, updatedAt)

## Frontend Pages

### 1. User List (`/users`)

- Display all users in table format
- Pagination controls
- Search functionality
- Export to CSV button
- Edit/Delete/View actions

### 2. Add User (`/add`)

- Form to add new user
- Client-side validation
- Error messages

### 3. Edit User (`/edit/:id`)

- Pre-filled form with user data
- Update validation
- Cancel option

### 4. View User Details (`/view/:id`)

- Display complete user information
- Links to edit or back to list

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- json2csv (CSV export)
- dotenv (Environment variables)
- CORS (Cross-Origin)

### Frontend

- React 19.2.5
- React Router 7.15.0
- Tailwind CSS 4.2.4
- Vite (Build tool)
- Fetch API (HTTP client)

## Project Commits

1. `[BACKEND] Project initialization & dependencies setup`
2. `[FRONTEND] Project setup with React, Tailwind CSS, and Fetch API integration`

## Deployment

### Backend Deployment

- Deploy to Heroku:
  ```bash
  heroku create <app-name>
  git push heroku main
  ```
- Or use MongoDB Atlas and deploy to any Node.js hosting

### Frontend Deployment

- Deploy to Netlify:
  ```bash
  npm run build
  # Deploy dist folder to Netlify
  ```

## Testing the Application

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Create a new user via "Add User" button
4. Search users using search bar
5. Edit user details
6. View user information
7. Delete users
8. Export users to CSV

## Error Handling

- Global error middleware in backend
- Toast notifications in frontend
- Validation errors displayed in forms
- Network error handling

## Notes

- Using **Fetch API** instead of Axios for safer, built-in HTTP requests
- No external HTTP library dependencies
- MongoDB validation at model level
- Client-side form validation
- Responsive design using Tailwind CSS v3

## Future Enhancements

- Add authentication/authorization
- File upload for profile pictures
- Advanced filtering
- Bulk operations
- User roles and permissions
- Email notifications
