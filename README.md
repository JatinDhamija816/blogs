# Blog Application
Welcome to the Blog Application! This project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. The application supports full authentication and allows users to create and manage blogs.

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Create Blog Posts**: Authenticated users can create new blog posts.
- **Read Blog Posts**: View all blogs posted by users.
- **Update Blog Posts**: Edit existing blog posts.
- **Delete Blog Posts**: Remove blogs that are no longer needed.
- **Responsive Design**: Fully responsive design using Tailwind CSS.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/JatinDhamija816/blogs
   cd blogs
2. **Install server dependencies**
   ```bash
   cd server
   npm install
3. **Install client dependencies**
   ```bash
   cd client
   npm install
4. **Set up environment variables**

     Create a .env file in the server directory and add the following variables:
   ```bash
    PORT = 8000
    MONGODB_URI = MongoDB_URL
    FRONTEND_URL = http://localhost:5173
    
    JWT_SECRET = your_jwt_secret
    
    EMAIL_SERVICE = Gmail
    EMAIL_USER = Username
    EMAIL_PASSWORD = Password
    
    CLOUD_NAME = Cloudinary_Name
    API_KEY = Key
    API_SECRET = SecretKey
5. **Run the development server**
 * Start the backend server:
   ```bash
      cd server
      npm start
   
  * Start the frontend server:
    ```bash
      cd client
      npm run dev
## Usage
- **Register**: Create a new account.
- **Login**: Log in with your credentials
- **Create Blog**: Add a new blog post.
- **View Blogs**: Edit existing blog posts.
- **Edit Blog**:  Browse all blog posts.
- **Delete Blog**: Update your existing blog posts.
