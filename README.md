<p align="center">
  <img width="1672" height="941" alt="image" src="https://github.com/user-attachments/assets/3e1aa7c0-9627-41f1-9280-1c66a43a7ff1" />
</p>

# ListOChef

**Plan your shopping. Track your spending. Cook like a chef.**

## 👥 Meet the Team

<div align="center">

| Team Member | Role |
|---|---|
| [@Annahexe](https://github.com/Annahexe) | Frontend Developer · Scrum Master | 
| [@BeaAlumFlor](https://github.com/BeaAlumFlor) | Frontend Developer |
| [@Iggox](https://github.com/Iggox) | Backend Developer |
| [@Natare21](https://github.com/Natare21) | Backend Developer · Product Owner |
| [@RTerabyte](https://github.com/RTerabyte) | Backend Developer |

</div>

---

ListOChef is a cross-platform mobile application designed to help users manage recipes, organize grocery and pantry ingredients, and track food-related expenses through purchase tickets.

The project was developed as the final project for the Intermodular Project subject in the Higher Vocational Training course in Multiplatform Application Development (DAM) at Florida Universitària, in Valencia. 
It has been developed with the goal of applying the technical and organizational knowledge acquired throughout the course in a practical and professional-like development environment.

---

## About the Project

ListOChef is focused on domestic food management. Its main purpose is to help users plan meals based on the ingredients they have at home, reducing food waste and improving organization.

The application allows users to:

- Browse and save recipes.
- Create custom recipes.
- Manage a grocery list.
- Keep track of pantry ingredients.
- Move ingredients from the grocery list to the pantry.
- Register purchase tickets with images.
- Track food-related expenses.
- Manage individual user data through authentication.

The app is fully functional on Android and iOS devices and has been developed following good programming practices, resulting in a stable and usable solution.

## Main Features

<p align="center">
<img width="1136" height="630" alt="image" src="https://github.com/user-attachments/assets/e903c414-1c5c-4bde-8c5c-c875d4f8cfa4" />
</p>

### 🍽️ Recipe Management

Users can explore recipes, save their favorite ones, view detailed recipe information, and create new recipes with ingredients, categories, preparation steps, cooking time, difficulty, tags, and photos.

<p align="center">
<img width="485" height="610" alt="image" src="https://github.com/user-attachments/assets/77bb2c96-96e2-4ee6-823c-9e240ed76bcc" />
</p>

### 🛒 Grocery List

Users can add ingredients to a grocery list, adjust quantities, filter items by tags, delete products, and move selected ingredients to the pantry.

<p align="center">
<img width="723" height="607" alt="image" src="https://github.com/user-attachments/assets/5a031960-429b-439c-bf95-ce84fdfc8161" />
</p>

### 🧺 Pantry

Users can manage the ingredients they already have at home. The pantry supports quantity control, tag filtering, and product deletion.

<p align="center">
<img width="720" height="609" alt="image" src="https://github.com/user-attachments/assets/ba612e82-0774-4971-ae52-498f433a8949" />
</p>

### 💰 Expense Tracking

Users can register purchase tickets by adding the supermarket, date, number of products, total price, and a ticket photo. The app also provides expense summaries and ticket history.

### 🔐 User Authentication

The application includes user registration, login, password reset, and profile editing. User data is protected through JWT-based authentication.

## Technologies Used

### Frontend

The frontend was developed using:

- **React Native** — for building the mobile interface.
- **Expo Go** — for development, testing, and cross-platform support.
- **JavaScript** — as the main programming language.
- **React Native Paper** — for UI components.
- **Expo Image Picker** — for selecting images from the device.
- **React Native Toast Message** — for user feedback messages.

The frontend follows a modular architecture, separating reusable components, screens, context, services, and utilities.

### Backend

The backend was developed using:

- **Java**
- **Spring Boot**
- **JWT authentication**
- **MongoDB Atlas**
- **Cloudinary**
- **AWS EC2**

The backend follows a layered architecture:

- **Controller** — exposes HTTP endpoints and handles incoming requests.
- **Service** — contains business logic and validations.
- **Repository** — manages access to the database.
- **Model** — represents domain entities.
- **Config** — contains technical configuration such as database connection and security.

This separation of responsibilities improves maintainability, scalability, and testability.

---

## Frontend Project Structure

```txt
├── assets/
│   ├── fonts/
│   └── icons/
├── docs/
├── src/
│   ├── components/
│   ├── context/
│   ├── mocks/
│   ├── screens/
│   ├── services/
│   └── utils/
└── App.js
```

## Methodology

The project was developed by a team of five members using the Scrum methodology. This allowed the team to organize the work in an iterative, collaborative, and structured way.

## Security

ListOChef uses JWT-based authentication to protect user data and secure communication between the frontend and backend.
Sensitive information such as backend URLs should be stored in environment variables and excluded from version control using `.gitignore`.

## Installation

### Requirements

Make sure you have installed:

- Node.js
- npm
- Expo CLI
- Expo Go app on your mobile device

### Clone the Repository

```bash
git clone https://github.com/Annahexe/ListOChef
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root with the connection to the Server.

### Run the App

```bash
npx expo start
```

Then scan the QR code with Expo Go.

## Purpose

This project was created for educational purposes as part of the Intermodular Project subject. Its main objective is to integrate knowledge related to mobile development, backend development, databases, teamwork, and agile methodologies.

## License

This project was developed for academic purposes.
