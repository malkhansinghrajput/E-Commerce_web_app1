🛍️ E-Commerce Web Application (MERN Stack)
🧠 Project Overview

This is a Full-Stack E-Commerce Web Application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.
It allows users to browse products, add them to the cart, place orders, and make secure payments.
The admin panel lets admins manage products, orders, and users efficiently.

🚀 Features

✅ User Authentication (Login, Signup using JWT)
✅ Product Management (Add / Edit / Delete)
✅ Add to Cart, Remove, and Update Quantity
✅ Secure Payment Gateway Integration (Stripe / Razorpay)
✅ Admin Dashboard for managing users & products
✅ Responsive Design (Mobile + Desktop)
✅ RESTful APIs with proper validation

⚙️ Tech Stack Used
Layer	Technology
Frontend	React.js, Axios, Bootstrap / TailwindCSS
Backend	Node.js, Express.js
Database	MongoDB with Mongoose
Authentication	JWT (JSON Web Token)
Payment	Stripe / Razorpay
Version Control	Git & GitHub
🗂️ Folder Structure
E-Commerce_Web_App/
│
├── E-Commerce_frontend/        # React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── E-Commerce_bakend/          # Node.js Backend
│   ├── controllers/
│   ├── dbconnect/
│   ├── middleware/
│   ├── modals/
│   ├── routes/
│   ├── app.js / server.js
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore

🧩 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/malkhansinghrajput/E-Commerce_web_app1.git
cd E-Commerce_web_app1

2️⃣ Install Dependencies

For Frontend:

cd E-Commerce_frontend
npm install


For Backend:

cd ../E-Commerce_bakend
npm install

3️⃣ Create .env file in E-Commerce_bakend

Add these environment variables 👇

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key

4️⃣ Start the Application

Run Backend:

cd E-Commerce_bakend
npm start


Run Frontend:

cd ../E-Commerce_frontend
npm start


App will run on:

Frontend → http://localhost:3000

Backend → http://localhost:5000

📸 Screenshots / Demo

(Add screenshots here later if you have UI images — homepage, cart, admin dashboard, etc.)

🌐 Live Demo (Optional)

👉 [Add your deployed link here once hosted on Vercel / Render / Netlify]

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a pull request.

🧑‍💻 Author

👤 Malkhan Singh Rajput
🔗 GitHub

🔗 LinkedIn

🪪 License

This project is licensed under the MIT License — feel free to use and modify.

💬 Support

If you like this project, don’t forget to ⭐ it on GitHub — it motivates me to build more! 😄
