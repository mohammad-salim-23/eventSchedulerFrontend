# Event Scheduler Frontend
# live-link: https://event-scheduler-livid.vercel.app
This is the **frontend application** for the Event Scheduler platform, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It allows users to create, view, delete, and archive events seamlessly in a responsive UI.

## 🚀 Features

 Display a list of events fetched from the backend API  
Add new events with a form  
Delete existing events  
 Mark events as "archived" or "active" (status toggle)  
 Responsive and clean UI for desktop and mobile devices  
 Sorted events by date and time (ascending order)

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **SweetAlert2** (for confirmation dialogs)
- **Sonner** (for toast notifications)

---

## 📂 Project Structure

src/
components/ # Reusable UI components (EventForm, EventTable, Navbar, etc.)
pages/ # Page-level components
services/ # API service calls (eventService.ts)
App.tsx # Root component with routing
main.tsx # Application entry point
index.css # Tailwind CSS styles

yaml
Copy
Edit

---

## ✨ Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/mohammad-salim-23/eventSchedulerFrontend.git
cd eventSchedulerFrontend
Install dependencies
npm install
# or
yarn install
Configure environment variables

Create a .env file at the root and add your backend API base URL:


VITE_BASE_API=https://your-backend-api.com/api
Run the development server


npm run dev
# or
yarn dev
Build for production


npm run build
# or
yarn build
💡 Usage
Navigate to My Created Events to view your events.

Use the Add Event Form to create new events (title, date, time, optional notes).

Events are auto-categorized as Work, Personal, or Other based on backend logic.

Delete an event with the delete button.

Archive/Unarchive an event using the toggle button.

📸 Screenshots
Add UI screenshots here for better demonstration.

🧑‍💻 Author
Mohammad Salim
Full Stack Developer
https://github.com/mohammad-salim-23

🤝 Contributing
Contributions are welcome! Please create a pull request or open an issue to discuss improvements or features.

📄 License
This project is licensed under the MIT License.

⭐️ Acknowledgements
React

TypeScript

Vite

Tailwind CSS

SweetAlert2

Sonner

Note: Ensure backend API is running and properly configured for event creation, deletion, and archiving functionalities.

#repo-link: https://github.com/mohammad-salim-23/eventSchedulerFrontend
---

