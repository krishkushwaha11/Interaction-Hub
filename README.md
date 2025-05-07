# 🚀 Interaction Hub : Contact & Interaction Management System

# 🧩 Contact & Interaction Mini‑CRM

## Project Overview

**Interaction Hub** is a modular and scalable web application built using modern web technologies. It provides users with interactive features and a smooth user interface, enabling efficient access to tools and services.

---
## 🛠️ Tech Stack

| Technology         | Description                  |
|--------------------|------------------------------|
| **Frontend**        | HTML, CSS, JavaScript        |
| **Build Tool**      | Vite                         |
| **Styling**         | Tailwind CSS                 |
| **Language**        | TypeScript                   |
| **Package Manager** | Bun                          |
| **Linting**         | ESLint                       |
| **Config Tools**    | PostCSS, tsconfig            |

## ✨ Features

### 🔄 Core ERP/CRM Functionality
- 🧾 **Invoice Management** – Create, send, and manage customer invoices
- 💵 **Quote Management** – Generate and track sales quotes
- 💰 **Payment Management** – Record and reconcile payments
- 🧑‍🤝‍🧑 **Customer Management** – CRM features to manage client data and history
- 🛠 **Product & Inventory Management** – Track items, stock levels, and SKUs *(optional)*

### 🧑‍💼 User & Access Control
- 🔐 **Role-Based Access Control** – Admin, Manager, and User roles with permissions
- 🆔 **User Authentication & Authorization** – Secure login and session handling

### 📊 Dashboards & Reports
- 📈 **Business Dashboard** – Overview of financials, sales, and customer metrics
- 📄 **Report Generation** – Download or view reports on payments, invoices, etc.

### 🎨 UI/UX & Framework
- 🐜 **Ant Design Integration** – Clean, responsive, and professional UI components
- 🌙 **Dark Mode Support** *(optional based on implementation)*
- 🌍 **Multi-language Support** *(optional / extendable)*

### ⚙️ Developer & DevOps Friendly
- ⚡ **Powered by MERN Stack** – MongoDB, Express.js, React.js, Node.js
- 🧠 **Redux for State Management**
- 📦 **Modular Codebase** – Clean architecture with separation of concerns
- 🚀 **Self-Hosted & Cloud Ready**

> ✅ Suitable for freelancers, startups, agencies, and enterprises.

## 📁 Project Structure

```bash
idurar-erp-crm/
├── backend/                   # Backend (Node.js + Express)
│   ├── config/                # Configuration files (DB, environment)
│   ├── controllers/           # Express route controllers
│   ├── middlewares/           # Custom Express middleware
│   ├── models/                # Mongoose models (User, Invoice, etc.)
│   ├── routes/                # Express routes
│   ├── scripts/               # Setup or seed scripts
│   ├── services/              # Business logic and utilities
│   └── server.js              # Main entry point for the backend
│
├── frontend/                  # Frontend (React.js + Ant Design)
│   ├── public/                # Static assets (images, favicon, etc.)
│   ├── src/
│   │   ├── assets/            # Images and icons
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Application views (Dashboard, Invoices, etc.)
│   │   ├── redux/             # Redux slices and store
│   │   ├── services/          # API call utilities
│   │   ├── styles/            # Global and scoped styles
│   │   ├── utils/             # Utility functions
│   │   └── App.jsx            # Main React app component
│   └── package.json           # Frontend dependencies and scripts
│
├── .env                       # Environment variables
├── .gitignore
├── LICENSE
├── README.md
└── package.json              # Root metadata if monorepo style

## 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ Interaction Mini‑CRM.git
   cd contact-mini-crm
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**

   Visit: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture Decisions

The IDURAR ERP/CRM system is built using a modern, scalable, and maintainable architecture tailored for business-critical applications. Below are the core decisions that shape its structure:

---

### 🧩 Modular Monorepo Structure

- The project is organized into separate `frontend/` and `backend/` directories for clear separation of concerns.
- Each layer (UI, API, DB) is self-contained, making it easier to maintain, test, and scale.

---

### ⚙️ MERN Stack

| Layer       | Technology       | Justification                                           |
|-------------|------------------|----------------------------------------------------------|
| Frontend    | React + Ant Design | Enables fast, dynamic, and responsive UI development     |
| State Mgmt  | Redux Toolkit     | Centralized state management for predictable behavior    |
| Backend     | Node.js + Express | Lightweight, performant, and asynchronous                |
| Database    | MongoDB           | Schema-flexible, scalable NoSQL database for fast access |

---

### 🎨 Ant Design (AntD)

- Used as the component library for a modern and professional UI/UX.
- Provides ready-to-use enterprise-level UI components with accessibility support.

---

### 🔐 Authentication & Security

- JWT-based authentication is used for stateless, secure session handling.
- Environment variables and `.env` files isolate sensitive configs.
- CORS, Helmet, and input sanitization practices are applied for security hardening.

---

### 📦 RESTful API Design

- Backend APIs follow RESTful conventions for clear, consistent resource access.
- Modular controller/service architecture allows easy expansion (e.g., microservices in future).

---

### 🧠 Scalable Codebase

- Folder structure is based on feature-first organization for better modularity.
- Support for multi-tenancy and future SaaS adaptations.

---

### 💾 LocalStorage + Redux (Frontend)

- Used to persist session/user state and UI preferences for better UX.
- Reduces redundant API calls, improving performance.

---

### 🚀 Deployment Ready

- The project supports both local development and production deployment.
- Easily deployable to cloud platforms (e.g., Vercel, Heroku, Render) or Dockerized setups.

> 🧠 These decisions were made to ensure the project is **developer-friendly**, **scalable**, and **easy to extend** for commercial and enterprise use.

## 📈 Stretch Goals (Partial/Future Work)

These are some future enhancements and additional features that could be added to improve the functionality, scalability, and usability of IDURAR ERP/CRM.

---

### 🧑‍💻 Multi-Language Support

- **Goal**: Implement i18n (internationalization) to allow users to switch between multiple languages.
- **Why**: Expands the user base by supporting non-English-speaking regions.

---

### 🌐 API Rate Limiting & Caching

- **Goal**: Implement API rate limiting and caching to enhance performance and avoid overloading the server with requests.
- **Why**: Improves scalability and ensures the system remains performant under heavy traffic.

---

### 🛠️ Unit & Integration Tests

- **Goal**: Write unit and integration tests for both the frontend and backend using tools like Jest and Mocha.
- **Why**: Ensures the application is stable and reduces the risk of regressions during development.

---

### 💼 Role-Based Access Control (RBAC)

- **Goal**: Add role-based access control (RBAC) to enable different user roles (Admin, Manager, User) with different levels of access.
- **Why**: Provides better security and control over user permissions.

---

### 📦 Dockerize the Application

- **Goal**: Containerize both the frontend and backend using Docker for easier deployment and management.
- **Why**: Simplifies the deployment process and ensures consistency across different environments (development, staging, production).

---

### 🌍 Continuous Integration/Continuous Deployment (CI/CD)

- **Goal**: Set up CI/CD pipelines using GitHub Actions, Travis CI, or CircleCI for automatic testing and deployment.
- **Why**: Improves developer productivity and ensures seamless delivery and deployment of code.

---

### 🖥️ Advanced Analytics and Reporting

- **Goal**: Implement data analytics and reporting features, including generating invoices, payment reports, and user activity statistics.
- **Why**: Adds value for users by providing actionable insights into their business.

---

### 🌙 Dark Mode

- **Goal**: Provide an option for users to switch between light and dark mode in the frontend application.
- **Why**: Enhances user experience and accessibility, allowing users to choose their preferred interface style.

---

### 🚀 Microservices Architecture

- **Goal**: Transition to a microservices architecture for better scalability and separation of concerns.
- **Why**: Facilitates scaling specific parts of the application and enables future flexibility in handling a growing user base.

---

### 💳 Payment Integration

- **Goal**: Add payment gateway integration (e.g., Stripe, PayPal) to process payments for invoices and quotes.
- **Why**: Makes the system more useful for businesses that require invoicing and payment management.

---

### 📱 Mobile App Version

- **Goal**: Develop a mobile version of the app for iOS and Android using React Native.
- **Why**: Expands the reach of the application to mobile users and provides a native mobile experience.

---

These stretch goals represent features that would further enhance IDURAR, making it a more robust, scalable, and feature-rich ERP/CRM solution.


## 📸 Screenshots

Here are some screenshots of the IDURAR ERP/CRM application to give you a preview of the interface and its features.

---

### 1. Home Page

![Home Page Screenshot](path/to/home-page.png)  
*Add a screenshot of the home page UI.*

---

### 2. Contact Page

![Contact Page Screenshot](path/to/contact-page.png)  
*Add a screenshot of the contact listing page where all contacts are displayed.*

---

### 3. New Contact Page

![New Contact Page Screenshot](path/to/new-contact-page.png)  
*Add a screenshot of the new contact page where users can add new contacts.*

---

### 4. Edit Contact Page (Data Edited)

![Edit Contact Page Screenshot](path/to/edit-contact-page.png)  
*Add a screenshot of the page where contact data is displayed and can be edited.*

---

### 5. Interaction Page

![Interaction Page Screenshot](path/to/interaction-page.png)  
*Add a screenshot of the interaction page where notes or interactions with contacts are displayed.*

---

### 6. Delete Contact Page

![Delete Contact Page Screenshot](path/to/delete-contact-page.png)  
*Add a screenshot of the page for deleting a contact.*

---

### 7. Dark Mode Enabled Page

![Dark Mode Screenshot](path/to/dark-mode.png)  
*Add a screenshot of the app with dark mode enabled.*

---

> 📸 **Note**: Please replace the `path/to/filename.png` with the actual path to the images you want to display, and ensure the images are placed inside the `/public/` folder (or the appropriate folder for assets in your project).


## 📬 Submission

- **GitHub Repo**: [https://github.com/krishkushwaha11/CRM_Project)
- **Demo URL**: [https://contact-mini-crm.vercel.app](https://contact-mini-crm.vercel.app)
- **Loom Video**: [https://www.loom.com/share/c78c302311d54c1981436df33158f321?sid=49ffa4a4-26e0-40be-8537-46bb960d135c)

- 
## Contact

- https://www.linkedin.com/in/krishk1/
