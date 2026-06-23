<!-- ---
title: QueryPilot
description: AI-Powered Database Copilot
--- -->
<!-- ### Link: [Try QueryPilot](https://your-app.vercel.app) -->

# QueryPilot 🚀

> Talk to your database, not your SQL editor.

QueryPilot is an AI-powered database copilot that enables users to interact with SQL databases using natural language. It combines LangChain agents, tool calling, conversational memory, and schema-aware SQL generation to transform user questions into executable database queries.

## Features

- 💬 Conversational Database Chat
- 🧠 Context-Aware Follow-Up Questions
- 🔍 Automatic Schema Discovery
- 🛠 Tool Calling with LangChain Agents
- ✅ SQL Validation & Verification
- 📊 Query History Tracking
- 📝 Persistent Chat History
- 🔐 Supabase Authentication
- 🔗 Dynamic Database Connections
- 🗄 SQLite & MySQL Support

---

# System Architecture

```text
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ QueryPilot  │
│    Agent    │
└──────┬──────┘
       │
       ▼
┌────────────────────┐
│ Conversational LLM │
└──────┬─────────────┘
       │
       ▼
┌────────────────────┐
│ Tool Calling Layer │
└──────┬─────────────┘
       │
       ├─────────────► list_tables()
       │
       ├─────────────► get_schema()
       │
       ├─────────────► validate_query()
       │
       └─────────────► execute_query()
       │
       ▼
┌────────────────────┐
│ Database (SQL DB)  │
└────────────────────┘
```

---

# Agent Workflow

Unlike traditional chatbots, QueryPilot does not directly generate answers.

Instead, it behaves as an intelligent database agent capable of reasoning and deciding which tools to use.

## Example

User asks:

```text
Show me the names of employees working in Engineering.
```

The agent performs the following steps:

### Step 1: Understand the User Intent

The LLM analyzes the request and determines:

```text
User needs data from the database.
```

### Step 2: Discover Available Tables

Tool Call:

```python
list_tables()
```

Example Output:

```text
employees
departments
salaries
```

---

### Step 3: Fetch Relevant Schema

Tool Call:

```python
get_schema(["employees", "departments"])
```

Example Output:

```sql
employees
---------
id
name
department_id

departments
-----------
id
department_name
```

---

### Step 4: Generate SQL

Using the schema context, the LLM generates:

```sql
SELECT
    e.name
FROM employees e
JOIN departments d
ON e.department_id = d.id
WHERE d.department_name = 'Engineering';
```

---

### Step 5: Validate SQL

Before execution:

```python
validate_query(sql)
```

The validation layer checks:

- Syntax correctness
- Query safety
- Schema compatibility

---

### Step 6: Execute SQL

Tool Call:

```python
execute_query(sql)
```

Example Result:

```json
[
  {
    "name": "John Doe"
  },
  {
    "name": "Sarah Williams"
  }
]
```

---

### Step 7: Generate Final Response

The agent transforms raw SQL results into a natural language response:

```text
The Engineering department has 2 employees:

• John Doe
• Sarah Williams
```

---

# Tool Calling Architecture

QueryPilot uses LangChain Tool Calling.

Each tool exposes a specific database capability to the LLM.

## list_tables

Returns all available tables.

```python
list_tables()
```

Example:

```text
employees
departments
projects
```

---

## get_schema

Returns schema information for selected tables.

```python
get_schema(["employees"])
```

Example:

```sql
CREATE TABLE employees (
    id INT,
    name VARCHAR(255),
    department_id INT
);
```

---

## validate_query

Validates generated SQL before execution.

```python
validate_query(sql)
```

Responsibilities:

- SQL sanity checks
- Prevent malformed queries
- Verify schema consistency

---

## execute_query

Executes validated SQL.

```python
execute_query(sql)
```

Returns:

```json
{
  "columns": [...],
  "rows": [...]
}
```

---

# Conversational Memory

QueryPilot supports context-aware conversations.

Example:

```text
User:
Show all employees.

Assistant:
...

User:
Only Engineering.

Assistant:
...
```

The agent understands that:

```text
Only Engineering
```

refers to:

```text
Show all employees from Engineering.
```

This is achieved through:

- Persistent chat history
- Context injection
- LangChain message history

---

# Database Connection Flow

Users can register multiple databases.

## Connect

```text
1. Load saved credentials
2. Create database client
3. Verify schema access
4. Mark connection as active
```

---

## Disconnect

```text
1. Mark connection inactive
2. Preserve credentials
3. Prevent further queries
```

---

# Authentication

QueryPilot uses Supabase Authentication.

Each user has:

- Separate connections
- Separate query history
- Separate chat history

This ensures complete data isolation.

---

# Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- LangChain
- Groq

### Database

- SQLite
- MySQL
- Supabase

### AI Components

- LangChain Agents
- Tool Calling
- Conversational Memory
- SQL Validation

---

# Future Improvements

- LangGraph Workflow Engine
- SQL Auto-Repair
- Database Health Monitoring
- Query Analytics Dashboard
- MongoDB Support
- Multi-Database Routing
- Streaming Responses

---

# Why QueryPilot?

Traditional BI tools require users to know SQL.

QueryPilot bridges the gap by allowing users to interact with databases using natural language while still leveraging the full power of SQL underneath.

```text
Question → Agent → Tools → SQL → Database → Answer
```

The result is a conversational database copilot capable of transforming natural language into actionable database insights.