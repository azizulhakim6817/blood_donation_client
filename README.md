# React + Vite

### Frontend Live URL :

https://blood-donation-client-brown.vercel.app

### Backend Live URL :

https://blood-donation-server-hazel.vercel.app/donation-requests

### Admin Dashboard access :

1. Email : programmerazizulhakim@gmail.com
2. Password : 123456

# Blood Donation & Funding Application

A modern **ReactJS** application for managing blood donation and funding, integrated with **Stripe** for secure online payments. Donors can contribute funds, view their funding history, and track total donations. Admins can manage donations and view donor data.

---

## 🌟 Features

- User authentication with email login
- Donor dashboard to make donations
- Funding history table and mobile view cards
- Dynamic total funds calculation
- Stripe integration for secure payments
- Payment success & cancel pages
- Responsive modern UI with TailwindCSS
- Admin can view all donations

---

## 🛠 Tech Stack

- **Frontend**: ReactJS, TailwindCSS, React Router, React Query
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Stripe
- **State Management**: React hooks + React Query
- **Notifications**: react-toastify

---

## 🚀 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/blood-donation-app.git
cd blood-donation-app
Install dependencies:

bash
Copy code
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
Create .env file in backend folder:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
SITE_DOMAIN=http://localhost:5173

🏃‍♂️ Running the Project
Start backend server
npm run dev
Start frontend
Frontend runs at: http://localhost:5173

Backend runs at: https://blood-donation-server-hazel.vercel.app

💳 Stripe Integration
Add your Stripe secret key to .env as STRIPE_SECRET_KEY.

Donation flow:

User enters amount in modal

Funding saved in MongoDB

Stripe checkout session created

Redirect to Stripe payment page

On success → redirect to /dashboard/payment-success

On cancel → redirect to /dashboard/payment-cancel
📂 Project Structure
client/
  src/
    pages/
      Dashboard/
        Fundings.jsx
        PaymentSuccess.jsx
        PaymentCancel.jsx
    hooks/
    components/
server/
  routes/
    funding.js
    stripe.js
  server.js

```
