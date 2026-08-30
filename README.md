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
