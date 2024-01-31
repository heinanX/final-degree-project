# final-degree-project
- an individual project that must be completed in order to obtain my web developer degree.

## Description
This project is an e-commerce platform designed for a traditional Video Rental Store. It consists of both a frontend [client] and a backend [server]. The frontend is built using React with TypeScript, while the backend is implemented with TypeScript, Node.js, and Express.js. MongoDB serves as the chosen database, and Stripe Checkout handles payment processing.

# Assignment criteria:

**Mandatory**
- The product must fully or partially apply an existing system or framework:
# Tailwind CSS and React Vite
- Code versioning is managed using GIT.
# check!
- The product should be related to e-commerce or similar.
# Video rental store 
- The project must have self-developed frontend code, backend code (Node.js or PHP), and must include databases. All parts must maintain high quality.
# Node.js and MongoDB - customers, products, orders, categories, and tags.

**Optional (minimum of three)**
- A custom-designed database with at least two tables.
# check
- Integration with a payment solution.
# check
- Routing and clean URLs. All calls go through a dispatcher (index.php), and controllers handle the URL structure.
# check
- The service/product can communicate (read and/or write) via a standardized API technology such as REST, SOAP, or another.
# check
- Different user levels must exist that affect access to functions. Some form of content should be linked to each user (orders, uploads, etc.).
# check
- The frontend without page reloads. Content is fetched and written to the database through JSON or XML via JavaScript. Some page reloads are allowed between parts of the service. Compare with "Posting on Facebook."
# check

---------

## Dependencies

You need to install:
- VS Code
- Node.js

## Structure

|-- client/
| |-- src/
| | |-- assets/
| | |-- Components/ (footer, header)
| | |-- contexts
| | |-- customHooks
| | |-- functions
| | |-- interfaces
| | |-- Pages/
| | |   |--Pages.components
| | |   |--Page
| | |-- App.tsx
| | |-- index.css
| | |-- main.tsx
| | |-- scrollbar.css
| |-- package.json
|-- documentation/
| |-- dailys/
| |-- retrospectives/
|-- server/
| |-- dist/
| |-- src/
| |  |-- resources/
| |  |  |-- middlewares/
| |  |  |-- routes/
| |  |  |-- models/
| |  |  |-- controllers/
| |  |  |-- types/
| |-- app.ts
| |-- server.ts
| |-- package.json
|-- README.md


- **client:** Contains the React app for the user interface.
  - **src:** React components, custom hooks, functions, interfaces, contexts and pages.
  - **package.json:** Package information and scripts for frontend.

- **server:** Contains the Node.js and Express.js server for handling business logic and communicating with the database.
  - **routes:** Defines API routes.
  - **models:** Contains MongoDB models for data management.
  - **controllers:** Manages the logic for each route.
  - **server.ts:** The main file that starts the server.
  - **package.json:** Package information and scripts for backend.

## Installation

To run the project locally, follow these steps:

1. Clone the project from the GitHub repository:

```bash
git clone https://github.com/heinanX/final-degree-project.git
```

2. Open the cloned project in VS Code and install dependencies for both client and server.

```bash

# Navigate to client folder and run install
cd client
npm install

# In additional terminal, navigate to server folder and run install
cd server
npm install
```

3. To run application write: 

```bash
# In client terminal
npm run dev

# In server terminal
npm run start
```

---------

4. Once these steps have been compleated the application should be up and running locally on:
# server: http://localhost:3000/
# client: http://localhost:5173/

---------

## Configuration
You need to configure the connection to MongoDB by adding an .env file in 'server/' and specifying your own keys.

COOKIE_SESSION_KEY="createYourOwnCookieSessionKey"
CREDENTIALS="<username>:<password>"
STRIPE_SECRETKEY=pasteStripeSecretKeyHere

---