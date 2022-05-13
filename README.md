# Simple task management API
API for managing your tasks build with NestJS.

## Available resources
- Auth

| Query Type | Endpoint             | Action                           |
|------------|----------------------|----------------------------------|
| POST       | /api/**auth**/signup | Register a new user              |
| Post       | /api/**auth**/signup | Log in with credentials          |

- Tasks

| Query Type | Endpoint                  | Action                                                   |
|------------|---------------------------|----------------------------------------------------------|
| GET        | /api/**tasks**            | Get all tasks based on the filter criteria               |
| GET        | /api/**tasks**/:id        | Get a task by its id                                     |
| POST       | /api/**tasks**            | Create a new task                                        |
| DELETE     | /api/**tasks**/:id        | Delete a task by its id                                  |
| PUT        | /api/**tasks**/:id/status | Update a task status ('open' \| 'in progress' \| 'done') |

## Technologies
Project is created with:
* NestJS
* typescript
* postgresql
* typeorm
* docker-compose
* class-validator
* bcrypt
* jwt
* passport
* joi
* dotenv
