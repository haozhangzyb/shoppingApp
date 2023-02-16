# Full Stack Online Shopping Application

This is an online shopping application built with the MERN stack and Redux for state management.

## Features

- User authentication (signup, login, logout)
- Add, edit and delete product (when logging in as admin)
- Sort products by added time and price
- Search products by name
- Local cart to save cart items when not logged in
- Merge local cart into account cart when signing up or logging in
- Add/delete/remove products to/from cart
- Responsive design

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- Redux
- [MUI (Material UI)](https://mui.com/)

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your secret in `src/server/config/secret.js`

   ```Javascript
   export const secret = {
        mongoURI:"your mongoDB connection string here",
        jwtSecret: "your jwt secret here",
   };
   ```

4. start the app: `npm run dev`
5. Open your browser and go to `http://localhost:3000`
