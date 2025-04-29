## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas account
- VS Code (recommended) + REST Client extension (for testing)

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/blacro-backend.git
cd blacro-backend
npm install
```

## Environmentvariables

-PORT=5000
JWT_SECRET=your_jwt_secret_key
FrontendURI=http://localhost:5173
MONGO_URI="mongodb+srv://usename:password@cluster0.co4usrj.mongodb.net/taskpilotDB?....."

---

## Testing API Endpoints with .rest file

-Install the REST Client extension in VS Code.

-Create a file named auth.rest and add the following:
### Register User
POST http://localhost:5000/api/v1/auth/register
Content-Type: application/json

{
  "first_name": "kartikey",
  "last_name": "joshi",
  "email": "tl@example.com",
  "password": "password123",
  "role": "tl"
}

### Login User
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "tl@example.com",
  "password": "password123"
}
