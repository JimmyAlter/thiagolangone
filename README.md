# Thiago Langone — Portfolio 💻📡

> **Full Stack Developer & IT Support Specialist** based in Buenos Aires, Argentina.  
> Specialized in infrastructure automation, server management, security-first web tools, and monitoring systems.

---

## 🛠️ Tech Stack & Skills

### 🖥️ Systems & Infrastructure
- **Server Administration:** Windows Server, Linux (Debian, Ubuntu), Active Directory, Group Policies (GPO).
- **Networking & Tunneling:** OpenVPN, network routing, firewalls, and shared resource management.
- **Monitoring & Observability:** Prometheus, Grafana, alerts integration, and status dashboards.
- **Automation Scripting:** Advanced PowerShell and Bash scripts for network and hardware monitoring.

### 🌐 Software Development
- **Backend Architecture:** Node.js, Express, TypeScript, REST APIs, and database design.
- **Frontend Engineering:** React 19, Vite 8, Tailwind CSS, Framer Motion, and PWA (Progressive Web Apps).
- **Databases:** PostgreSQL, SQLite (optimized with WAL mode), and database transaction safety.

---

## 🚀 Featured Projects

Here are my main projects, designed with a focus on solving real-world IT problems, keeping code modular, and prioritizing user privacy and security:

### 🛡️ [Helper (PWA Token Generator)](https://github.com/JimmyAlter/helper)
A Progressive Web App (PWA) designed for IT technicians to generate signed RSA-PSS authorization tokens directly on their mobile phones.
- **100% Offline & Mobile-first:** Service Workers cache all resources so it runs without internet in remote server rooms or data centers.
- **Local-Only Security:** Uses the native browser **Web Crypto API** to compute signatures locally. Private keys and settings stay securely inside the browser's `localStorage` and are never transmitted over the internet.
- **Access Safety:** Protected against local brute force attacks with rate-limiting and a lockout period. Entirely sanitized against XSS vectors by avoiding unsafe DOM injections.

### 📊 [AssetDesk (Service Desk & IT Asset Tracker)](https://github.com/JimmyAlter/AssetDesk)
An enterprise-grade asset inventory and service desk ticketing management platform built for IT organizations.
- **Secure Backend API:** Node.js/Express server protected with **Helmet** security headers, **express-rate-limit** to prevent brute force on logins, and strict environment validation that blocks starting in production mode without a secure `JWT_SECRET`.
- **Ticketing & Inventory:** Role-based access control, ticket priority states, and asset assignment tracking connected to an SQLite DB.

### 📦 [Mi Inventario (IT Equipment & Movs Manager)](https://github.com/JimmyAlter/mi-inventario)
A lightweight web dashboard for managing computer hardware inventories and logistics transfer tickets.
- **Modern Modular React:** Developed using **React 19** and **Vite 8**, refactored into a clean subcomponent architecture for maximum maintainability.
- **XSS Protections:** Strictly sanitizes dynamic data inputs prior to document rendering for ticket printing. Persistent local state with zero database server overhead.

### 📡 [Remote Monitoring Dashboard](https://github.com/JimmyAlter/remote-monitoring-dashboard)
An advanced RMM dashboard capable of executing diagnostic commands on remote Windows/Linux machines.
- **Hybrid Script Agents:** Uses PowerShell and Bash scripts deployed on end devices to report hardware metrics back to a centralized Node.js hub.
- **Safe SSH Execution:** Queue-based command executor using secure private keys with fallback authentication.

---

## 📫 Connect with Me

- **Email:** [thiagoivan029@gmail.com](mailto:thiagoivan029@gmail.com)
- **Location:** Buenos Aires, Argentina
- **GitHub:** [@JimmyAlter](https://github.com/JimmyAlter)
