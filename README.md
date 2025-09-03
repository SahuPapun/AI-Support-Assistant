# AI Support Assistant

An **AI-powered Support Assistant** that manages user queries (tickets) by automating **categorization, prioritization, and intelligent routing to the right moderator**.  

---

## 🚀 Key Features
- 🤖 **AI Query Analysis** – Categorizes queries, sets priority, and extracts key insights  
- 👩‍💼 **Smart Moderator Assignment** – Routes queries to the right moderator based on skills, with admin fallback  
- 🔐 **Role-Based Access Control** – User, Moderator, and Admin roles with JWT authentication  
- 🖥️ **Modern Frontend** – Built with React + Vite for a fast and responsive UI  
- ⚡ **Event-Driven Workflows** – Handles background tasks using Inngest  
- 📧 **Automated Notifications** – Email alerts and updates via Nodemailer + Mailtrap  

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite)  
- **Backend:** Node.js (Express)  
- **Database:** MongoDB  
- **AI Integration:** Google Gemini API  
- **Authentication:** JWT  
- **Workflows:** Inngest  
- **Email:** Nodemailer + Mailtrap  

---


---

## 🎯 How It Works
1. Users raise a **query (ticket)** via the frontend.  
2. The **AI (Google Gemini API)** analyzes it and assigns **category, priority, and required skills**.  
3. The system routes the query to the **best moderator** or escalates to an **admin** if needed.  
4. Background workflows (**Inngest**) handle notifications and async tasks.  
5. Email updates are sent to **users/moderators** via **Nodemailer + Mailtrap**.  

---


