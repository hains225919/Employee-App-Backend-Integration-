# Employee App Backend Integration

This project implements the backend integration for the Employee App using Node.js, Express, and MongoDB (Atlas & Local support), connected to an Angular frontend pre-built in `dist/Frontend`.

---

## 🛠️ Requirements Implemented

1. **GET `/api/employeelist`**: Retrieves all employee records from MongoDB.
2. **GET `/api/employeelist/:id`**: Retrieves a single employee record by their ID.
3. **POST `/api/employeelist`**: Adds a new employee to the database (`{ name, location, position, salary }`).
4. **PUT `/api/employeelist`**: Updates employee details in the database.
5. **DELETE `/api/employeelist/:id`**: Deletes a single employee from the database by ID.
6. **Frontend Static Integration**: Serves the Angular frontend application at `http://localhost:3000`.
7. **MongoDB Atlas / Local Support**: Connects to MongoDB Atlas via URI or runs locally using the included local database script.

---

## 🚀 How to Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Options

#### Option A: Running with Local MongoDB (Instant setup, no Atlas account needed)
Open a terminal and run the local database runner:
```bash
npm run local-db
```
Then in another terminal, start the app:
```bash
npm start
```

#### Option B: Connecting to MongoDB Atlas
1. Open `.env` (or set `MONGODB_URI` environment variable).
2. Set your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/EmployeeDB?retryWrites=true&w=majority
   PORT=3000
   ```
3. Start the application:
   ```bash
   npm start
   ```

---

## 🌐 API Endpoints Reference

| Method | Endpoint | Description | Request Body Format |
|---|---|---|---|
| `GET` | `/api/employeelist` | Get all employees | None |
| `GET` | `/api/employeelist/:id` | Get single employee by ID | None |
| `POST` | `/api/employeelist` | Add new employee | `{ "name": "string", "location": "string", "position": "string", "salary": number }` |
| `PUT` | `/api/employeelist` | Update employee details | `{ "_id": "string", "name": "string", "location": "string", "position": "string", "salary": number }` |
| `DELETE` | `/api/employeelist/:id` | Delete employee by ID | None |

---

## 📤 Pushing to GitHub (For Submission)

1. Create a new repository on [GitHub](https://github.com/new).
2. Run the following commands in the project directory:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. Copy your GitHub repository URL and submit it.
