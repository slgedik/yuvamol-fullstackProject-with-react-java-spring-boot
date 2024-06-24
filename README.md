# "Yuvam Ol" Fullstack Project with React and Java Spring Boot

The goal of Yuvam Ol is to facilitate the pet adoption process, ensuring more animals find loving homes.
Yuvam Ol is a comprehensive fullstack project developed using React for the frontend and Java Spring Boot for the backend. This project provides a robust framework for building modern web applications with a strong focus on responsive design.

<img width="1446" alt="image" src="https://github.com/slgedik/yuvamol-fullstackProject-with-react-java-spring-boot/assets/112625294/42d946ed-68ee-4684-ad2c-80de2b511100">
<img width="1444" alt="image" src="https://github.com/slgedik/yuvamol-fullstackProject-with-react-java-spring-boot/assets/112625294/c4697823-15c4-4cf4-b35b-a058b54bdfac">
<img width="1448" alt="image" src="https://github.com/slgedik/yuvamol-fullstackProject-with-react-java-spring-boot/assets/112625294/322e9b71-b3b9-4fb3-ba13-34b140f053f7">
<img width="1445" alt="image" src="https://github.com/slgedik/yuvamol-fullstackProject-with-react-java-spring-boot/assets/112625294/b09d2f3e-4757-471b-873d-ce9d4b6b7d78">


## Table of Contents

- [Features](#features)
- [Project Overview](#project-overview)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [License](#license)

## Features

- User Registration and Login: Users can register and log in to the platform.
- Animal Listings: Users can create listings for animals they wish to rehome and browse existing listings.
- Listing Management: Owners can update or delete their listings.
- Search and Filter: Users can search for animals based on specific criteria.
- Communication: Users can message listing owners to initiate contact.

## Project Overview

The Yuvam Ol project aims to provide a scalable and efficient fullstack solution for web application development. The backend is powered by Spring Boot, offering robust and secure RESTful services, while the frontend is built with React, ensuring a dynamic and responsive user experience.

### Key Components

1. *Backend (Java Spring Boot):*
   - Provides RESTful API services
   - Handles business logic and data management
   - Ensures security and performance

2. *Frontend (React):*
   - Dynamic and interactive user interface
   - Utilizes modern JavaScript features and libraries
   - Responsive design to support various devices

## Requirements

To run this project, you will need the following software installed:

- Node.js (v14 or later)
- npm (v6 or later)
- Java JDK (v11 or later)
- Maven (v3.6 or later)
- PostgreSQL (latest version)

## Installation

### Backend Setup

1. Clone this repository:

    bash
    git clone https://github.com/slgedik/yuvamol-fullstackProject-with-react-java-spring-boot.git
   
    cd yuvamol-fullstackProject-with-react-java-spring-boot
    

3. Build and run the Java backend project:

    bash
   
    cd backend
   
    mvn clean install
   
    mvn spring-boot:run
    

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:

    bash
   
    cd frontend
   
    npm install
    

3. Start the React application:

    bash
   
    npm start
    

## Usage

1. The backend service runs on http://localhost:8080 by default.
2. The frontend application runs on http://localhost:3000 by default.

Open your browser and navigate to http://localhost:3000 to start using the application.


## Database Setup

The project uses PostgreSQL as its database. Follow these steps to set up the database:

1. Install PostgreSQL on your machine if it is not already installed.
2. Create a new database named `yuvamol`:

    ```sql
    CREATE DATABASE yuvamol;
    ```

3. Configure the database connection in the `application.properties` file located in the `src/main/resources` directory of the backend project. Update the file with your PostgreSQL credentials:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/yuvamol
    spring.datasource.username=your_db_username
    spring.datasource.password=your_db_password
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
    spring.jpa.hibernate.ddl-auto=update
    ```

Replace `your_db_username` and `your_db_password` with your PostgreSQL username and password.


## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create a new branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
