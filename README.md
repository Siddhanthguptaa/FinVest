# Mini Investment Platform - Full-Stack Internship Project

This is a full-stack application built for a Winter Internship 2025 program. It simulates a mini investment platform with features for user authentication, product management, investments, and AI-powered insights.

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript, Prisma
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Database:** MySQL
- **DevOps:** Docker, Docker Compose
- **Testing:** Jest, Supertest
- **AI:** Google Gemini API

## Features

- User signup and JWT-based login.
- Admin-only CRUD operations for managing investment products.
- Users can invest their virtual balance into products.
- Dynamic, data-driven dashboard showing user's portfolio, charts, and holdings.
- Secure, server-side integration with the Gemini API for:
    - AI-powered portfolio analysis and suggestions.
    - An interactive chatbot to explain financial terms.
    - On-demand analysis of market tickers.
- Automated API transaction logger.
- Comprehensive backend test suite with >75% coverage on all testable modules.

## Getting Started

### Prerequisites
- Docker and Docker Compose must be installed on your machine.
- Node.js (v18+)

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/MetaFazer/gripinvest_winter_internship_project.git](https://github.com/MetaFazer/gripinvest_winter_internship_project.git)
    cd your-repo-name
    ```

2.  **Set up Environment Variables:**
    - In the project root, create a `.env` file and add your MySQL passwords:
      ```
      MYSQL_ROOT_PASSWORD=your_root_password
      DB_USER=db_user
      DB_PASSWORD=db_password
      ```
    - In the `backend` folder, create a `.env` file and add your database URL, JWT secret, Admin ID, and Gemini API Key:
      ```
      DATABASE_URL="mysql://db_user:db_password@mysql-db:3306/invest_db"
      JWT_SECRET=your_super_secret
      ADMIN_USER_ID=your_admin_user_id
      GEMINI_API_KEY=your_gemini_api_key
      ```
    - In the `frontend` folder, create a `.env.local` file and add the API URL:
      ```
      NEXT_PUBLIC_API_URL=http://localhost:8000/api
      ```

3.  **Update Docker Compose (Important):**
    Open your `docker-compose.yml` file and make sure the `environment` variables for the `mysql-db` service match the generic names you used in the `.env` files:
    ```yaml
    services:
      mysql-db:
        # ...
        environment:
          MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
          MYSQL_DATABASE: invest_db # <-- Match this
          MYSQL_USER: db_user      # <-- Match this
          MYSQL_PASSWORD: ${DB_PASSWORD}
    ```

4.  **Run with Docker Compose:**
    From the root of the project, run the following command:
    ```bash
    docker compose up --build
    ```
    This will build the images for the backend and frontend, and start all three containers.

5.  **Access the Application:**
    - **Frontend:** `http://localhost:3000`
    - **Backend API:** `http://localhost:8000`

## AI Usage

This project makes extensive use of AI, both in the development process and as a core feature:
- **AI-Driven Development:** As the project's coding partner, Gemini assisted in writing code, debugging complex issues (like testing environment bugs and styling configuration), and architecting the application. This significantly expedited the development speed.
- **In-App AI Features:** The application integrates the Google Gemini API to provide users with intelligent insights, including portfolio reviews and a financial chatbot, demonstrating a practical and secure full-stack implementation of generative AI.