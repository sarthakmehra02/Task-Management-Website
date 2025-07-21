# 🗂️ Task Management Website

A secure, full-stack task management web app built with a modern React + Redux frontend and a Node.js + Express backend. Includes JWT-based authentication, MongoDB database integration, full task editing, filtering, and priority control in a clean, responsive UI.

---

## 🌐 Live Links

- 🚀 **Frontend**: [https://taskmanagementsarthak.netlify.app](https://taskmanagementsarthak.netlify.app)  
- ⚙️ **Backend**: [https://task-management-website-backend.onrender.com](https://task-management-website-backend.onrender.com)

---

## 📸 Screenshots

> 🖼️ Place your screenshots in a top-level `screenshots/` folder and they will show up here:

![Login Page](screenshots/login.png)  
![Sign Up Page](screenshots/sign.png)  
![Task Assignment](screenshots/Task%20Assignment.png)  
![Edit Task Modal](screenshots/Screenshot%202025-07-21%20135132.png)

---

## 📁 Project Structure

```
Task-Management-Website/
├── backend/              # Express API with MongoDB and JWT
├── frontend/             # React + Redux frontend UI
├── screenshots/          # UI screenshots for README
└── README.md             # Project documentation (this file)
```

---

## ✨ Features

### 🔹 Frontend
- 🔐 JWT-based login & signup
- ✏️ Add, delete, and **edit** tasks
- 🚦 Set **priority**, **due date**, **status**
- ✅ Mark tasks complete with timestamp
- 🔍 Filter by status and priority
- 📱 Fully responsive UI with Tailwind CSS
- ⚛️ Global state via Redux Toolkit

### 🔹 Backend
- ⚙️ Node.js + Express REST API
- 🧠 MongoDB with Mongoose
- 🔐 User auth with JWT tokens
- 🔒 Protected task routes
- 🗂️ Task model with title, description, status, priority, date, completedAt

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/sarthakmehra02/Task-Management-Website.git
cd Task-Management-Website
```

### 2. Install Frontend & Backend Dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3. Configure `.env` in `backend/`

```
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🧩 Future Improvements

- [ ] Drag-and-drop task reordering
- [ ] Export tasks as CSV/PDF
- [ ] User avatars
- [ ] Dark mode toggle
- [ ] Push notifications

---

## 🤝 Contributing

1. Fork this repository  
2. Create your branch: `git checkout -b feature/my-feature`  
3. Commit changes: `git commit -m "Add feature"`  
4. Push: `git push origin feature/my-feature`  
5. Open a Pull Request

---

## 📄 License

MIT License

---

## 🙋 Author

**Sarthak Mehra**  
GitHub: [@sarthakmehra02](https://github.com/sarthakmehra02)
