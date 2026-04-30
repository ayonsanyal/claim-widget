#  Claim Widget Frontend



A modern frontend application for interacting with the Claims API.
It enables users to create, manage, and track claims, along with an admin panel for configuration, experimentation, and feature control.

---
##  Architecture & Design

This project follows **separation of concerns** and modular design principles:

### Key Design Decisions

* 🔹 **Decoupled Demo Entry**

  * `demo.html` is intentionally kept separate from the main app
  * Allows isolated testing and embedding of the widget

* 🔹 **Service Layer Abstraction**

  * API calls handled via dedicated service (`claims.api.ts`)
  * Keeps UI clean and maintainable

* 🔹 **Controller Layer**

  * Business logic separated from UI components

* 🔹 **Unit Testing**

  * Service and controller layers are covered with unit tests:

    * `claims.api.spec.ts`
    * `claims.controller.spec.ts`

 This ensures better maintainability, scalability, and testability.
---
---

##  Demo (Recommended)



### Claim Widget Flow

![Widget Demo](/claim-widget-home.png)
![Loaded Widget](/claim-widget.png)
![ClaimsTable](/claim-table.png)

### Admin Panel Flow

![Admin Demo](/admin.html)
![Admin Loaded](/admin-panel-loaded.png)

---

##  Features

###  Claims Widget

* Create claims
* View claims (all / filtered by status)
* Update claims
* Delete claims

###  Admin Panel

* Version management
* Feature variants
* A/B testing toggle
* Drag-and-drop UI configuration

---

##  Screenshots

###  Login & Authentication

![Login Endpoint](/screenshot-login.png)

###  Token Authorization

![Authorization](/screenshot-auth.png)


## 🏗 Architecture Overview

```text
Frontend (Claim Widget)
        │
        ▼
Claims API (Backend)
        │
        ▼
JWT Authentication
```

---

## Getting Started

### 1. Prerequisites

* Docker installed
* Claims API running

---

### 2. Authenticate

1. Open the login endpoint
2. Enter credentials:

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

3. Click **Execute**
4. Copy the JWT token from **Authorize**

---

### 3. Run Frontend

```bash
docker compose up --build
```

App runs at:

```
http://localhost:5000
```

---

### 4. Open Demo

```
http://localhost:5000/demo.html
```

---

##  Usage

###  Load Claim Widget

1. Paste JWT token
2. Click **Open Widget**
3. Start managing claims

---

###  Use Admin Panel

1. Paste JWT token
2. Click **Load Admin**
3. Features available:

   * Variant switching (A/B testing)
   * Version control
   * Drag & drop layout
   * UI configuration

---

##  Project Structure

```text
.
├── src/
│   ├── widget.style.css
    ├── admin.css
    ├── claims.api.ts
    ├── claims.controller.ts
    ├── config.service.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
 
├── demo.html
├── admin.html
├── docker-compose.yml
├── dockerfile
└── README.md
```

---

## Authentication

* JWT-based authentication
* Required for:

  * Claim operations
  * Admin panel access

---

##  Roadmap

* [ ] Add pagination to claims table
* [ ] Persist JWT securely
* [ ] Convert to SPA (merge admin + widget)
* [ ] Improve UI/UX:

  * Animations
  * Guided walkthroughs
  * Mobile optimization







