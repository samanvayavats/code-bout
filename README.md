# ⚔️ CodeDuel

> **Code Faster. Think Sharper. Win Live.**

CodeDuel is a real-time **1v1 competitive coding platform** where developers compete against each other by solving the same programming problem under time pressure.

Unlike traditional coding platforms that focus primarily on individual problem solving, CodeDuel turns algorithmic problem solving into a **live competitive experience**.

Players are matched against an opponent, receive the same problem, write and execute their solution, and compete based on **correctness and execution speed**.

---

## 🚀 Features

### ⚔️ Real-Time 1v1 Coding Battles

Challenge another developer and solve the same programming problem in real time.

- Automatic opponent matchmaking
- Same problem for both players
- Synchronized match experience
- Live opponent status
- Match countdown timer

### 🧩 Problem Bank

Browse and filter programming problems based on:

- Difficulty
  - Easy
  - Medium
  - Hard
- Topic
  - Arrays
  - and other supported categories
- Search

Each problem contains:

- Problem statement
- Examples
- Constraints
- Test cases
- Time limits
- Difficulty level

### 💻 Online Code Editor

Write and test your solution directly inside the platform.

Players can:

- Write code
- Run their solution
- Check test cases
- Submit their solution

### ⚡ Code Execution

Submitted solutions are evaluated against test cases.

The platform tracks:

- Verdict
- Execution time
- Memory usage
- Test-case correctness
- Submission time

### 🏆 Competitive Scoring

Winning is primarily based on correctness.

The scoring system considers:

1. **Correctness** — solutions must pass the required test cases.
2. **Speed** — faster correct execution earns an advantage.

This creates a balance between writing a correct solution and optimizing it.

### 📊 Match Results

After every duel, players can see:

- Winner / loser
- Verdict
- Execution time
- Memory usage
- Points
- Submission time
- Opponent performance

### 🏅 Leaderboard

Players can compare their competitive performance through the leaderboard.

The leaderboard tracks:

- Rank
- Player name
- Wins
- Losses

---

# 🛠️ Tech Stack

## Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **NextAuth**
- **Axios**

## Backend / Real-Time

- **Next.js**
- **Node.js**
- **WebSocket (`ws`)**
- **Redis**

## Database

- **PostgreSQL**
- **Prisma ORM**

## Authentication

- **NextAuth**
- **bcrypt**

## Validation

- **Zod**

## Infrastructure

- **Docker**
- **Docker Compose**

---

# 🏗️ Architecture

CodeDuel is split into multiple runtime components:

```text
                         ┌─────────────────────┐
                         │       Browser       │
                         │                     │
                         │   Next.js Frontend  │
                         └──────────┬──────────┘
                                    │
                         HTTP / WebSocket
                                    │
                   ┌────────────────┴────────────────┐
                   │                                 │
                   ▼                                 ▼
        ┌─────────────────────┐          ┌─────────────────────┐
        │     Next.js App     │          │   Socket Server     │
        │                     │          │                     │
        │  API / UI / Auth    │          │ WebSocket Server    │
        └──────────┬──────────┘          └──────────┬──────────┘
                   │                                │
                   │                                │
          ┌────────┴────────┐              ┌────────┴────────┐
          │                 │              │                 │
          ▼                 ▼              ▼                 ▼
   ┌─────────────┐   ┌─────────────┐  ┌───────────┐   ┌───────────┐
   │ PostgreSQL  │   │   Prisma    │  │   Redis   │   │ Matchmaking│
   │             │   │             │  │           │   │ / Rooms    │
   └─────────────┘   └─────────────┘  └───────────┘   └───────────┘
```

```text
Player
   │
   ▼
Select Problem
   │
   ▼
Join Arena
   │
   ▼
Matchmaking
   │
   ▼
Opponent Found
   │
   ▼
Both Players Receive Same Problem
   │
   ▼
┌───────────────────────────────┐
│          CODING BATTLE        │
│                               │
│   Player A        Player B    │
│      │               │        │
│      ▼               ▼        │
│    Code            Code       │
│      │               │        │
│      ▼               ▼        │
│     Run             Run       │
│      │               │        │
│      ▼               ▼        │
│   Submit          Submit      │
└───────────────┬───────────────┘
                │
                ▼
         Evaluate Results
                │
                ▼
       Compare Performance
                │
                ▼
          Determine Winner
                │
                ▼
          Match Results
                │
                ▼
            Leaderboard
```

# 🧠 Match Scoring

The primary objective is to submit a correct solution.
A simplified scoring model is:

```text
Correctness
     │
     ├── Incorrect → 0 points
     │
     └── Correct
           │
           ▼
      Execution Speed
           │
           ▼
      Final Points
```

# 📁 Project Structure

```text
code-bout/
│
├── .husky/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── server/
│   └── index.ts
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
│
├── .dockerignore
├── .env.example
├── .gitignore
│
├── Dockerfile
├── Dockerfile.socket
├── docker-compose.yaml
│
├── next.config.ts
├── package.json
├── prisma.config.ts
├── tailwind.config.js
├── tsconfig.json
│
└── README.md
```

# ⚙️ Getting Started

Make sure you have installed:

- Node.js
- npm
- PostgreSQL
- Redis

For the recommended setup, Docker and Docker Compose are sufficient.

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/samanvayavats/code-bout.git
```

Move into the project:

```bash
cd code-bout
```

Install dependencies:

```bash
npm install
```

# 🔐 Environment Variables

Create a .env file in the root directory:

Configure the required environment variables.

Example:

```
DATABASE_URL="postgresql://codebout:codeboutpostgres@localhost:5432/codeboutdb"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
JUDGE0_API_URL=""
REDIS_URL="redis://localhost:6379"
```

# 🗄️ Database Setup

Generate the Prisma client:

```bash
npm run db:generate
```

Push the Prisma schema to PostgreSQL:

```bash
npm run db:push
```

For development migrations:

```bash
npm run db:migrate
```

Seed the database:

```bash
npm run db:seed
```

# 💻 Running Locally

## Start Next.js

```bash
npm run dev
```

The application will run on:

```
http://localhost:3000
```

## Start WebSocket Server

In another terminal:

```bash
npm run socket
```

The WebSocket server runs on:

```
ws://localhost:8000
```

## Start Everything Together

You can also run the Next.js application and WebSocket server together:

```bash
npm run dev:all
```

# 🐳 Running with Docker

CodeDuel includes Docker support for the application, WebSocket server, PostgreSQL and Redis.

The Compose configuration contains:

```text
┌───────────────────────┐
│       Docker          │
│                       │
│  ┌─────────────────┐  │
│  │     Next.js     │  │
│  │      :3000      │  │
│  └─────────────────┘  │
│                       │
│  ┌─────────────────┐  │
│  │  Socket Server  │  │
│  │      :8000      │  │
│  └─────────────────┘  │
│                       │
│  ┌─────────────────┐  │
│  │   PostgreSQL    │  │
│  │      :5432      │  │
│  └─────────────────┘  │
│                       │
│  ┌─────────────────┐  │
│  │      Redis      │  │
│  │      :6379      │  │
│  └─────────────────┘  │
│                       │
└───────────────────────┘
```

Build and start the complete stack:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up --build -d
```

Stop the containers:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

## 🔌 Services

| Service    | Port | Purpose                                      |
| ---------- | ---- | -------------------------------------------- |
| Next.js    | 3000 | Web application and API                      |
| WebSocket  | 8000 | Real-time matchmaking and duel communication |
| PostgreSQL | 5432 | Persistent application data                  |
| Redis      | 6379 | Real-time / temporary state                  |

The Docker Compose configuration defines PostgreSQL and Redis health checks and makes the application services depend on those services being healthy.

## 📜 Available Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| npm run dev          | Start Next.js development server |
| npm run socket       | Start WebSocket server           |
| npm run dev:all      | Start Next.js + WebSocket server |
| npm run build        | Create production build          |
| npm run start        | Start production server          |
| npm run lint         | Run ESLint                       |
| npm run format       | Format project using Prettier    |
| npm run format:check | Check formatting                 |
| npm run db:generate  | Generate Prisma Client           |
| npm run db:push      | Push schema to database          |
| npm run db:migrate   | Run Prisma migrations            |
| npm run db:seed      | Seed database                    |

These scripts correspond to the current package.json in the repository.

## 🎯 Why CodeDuel?

Traditional competitive programming platforms are primarily designed around:

```text
Problem
↓
Solve
↓
Submit
↓
Accepted

CodeDuel changes the experience to:

Problem
↓
Find Opponent
↓
Start Match
↓
Race Against Time
↓
Submit
↓
Compare Performance
↓
WIN / LOSE
```

The goal is to make algorithmic problem solving feel less like an isolated exercise and more like a competitive sport.

## 🚧 Future Improvements

Some potential improvements for future versions include:

- More programming languages
- Private matches / challenge friends
- Match history
- Player profiles
- Rating / ELO system
- Global rankings
- Tournament mode
- Spectator mode
- Replays
- Anti-cheat mechanisms
- Improved matchmaking based on rating
- More detailed performance analytics
- Contest / college event mode
- Scalable distributed code execution

Players can compare their wins and losses against other competitors.

## 🧠 Engineering Challenges

### Real-Time Matchmaking

Players waiting for the same problem are matched through the WebSocket server.

### Concurrent Match State

Redis is used for temporary real-time state while PostgreSQL stores persistent application data.

### Code Execution

Submissions are evaluated against test cases and execution metrics are compared between players.

### Match Synchronization

Both players need to receive the same problem, match state, countdown, and final result without relying on page refreshes.

### Containerized Development

The application, WebSocket server, PostgreSQL, and Redis can be started together using Docker Compose.

## 👨‍💻 Author

**Samanvaya Vats**

Full-stack developer and creator of CodeDuel.

- **GitHub**: https://github.com/samanvayavats
- **Project**: https://github.com/samanvayavats/code-bout

## ⭐ Support

If you find CodeDuel interesting, consider giving the repository a ⭐ on GitHub.

## 📄 License

This project is currently intended as a personal/educational project.
