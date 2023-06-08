# Voting Application API

The Voting Application API is a backend API that serves as the core functionality for the Voting Application. It provides endpoints for voting operations.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Set up the environment variables:
   - Create a `.env` file in the project root directory.
   - Define the required environment variables (e.g., database connection string, JWT secret, etc.).
4. Start the server: `npm start`

## API Endpoints

### Categories


#### Get All Categories

- **Endpoint**: `GET /api/categories`
- **Response Example**:

```json
[
    {
        "nominees": [],
        "_id": "6478d6b03ca35822a6ed4c54",
        "name": "G-Most Beautiful",
        "__v": 0
    }
]
```

#### Get All Nominees

- **Endpoint**: `GET /api/nominees`
- **Response Example**:

```json
[
  {
        "_id": "647fb5604d7e9a2a37b57bc7",
        "name": "YUSUF AYOMIDE",
        "category": {
            "_id": "6478e4603ca35822a6ed4c8b",
            "name": "U-Socialite of the year",
            "__v": 0
        },
        "votes": 0,
        "__v": 0
    },
    {
        "_id": "647fb5604d7e9a2a3ab578c7",
        "name": "YUSUF AYOMIDE",
        "category": {
            "_id": "6478e4603ca35822a6ed4c8b",
            "name": "U-Sports Personality",
            "__v": 0
        },
        "votes": 0,
        "__v": 0
    },
 ]
```

#### Get a particular Nominee
- **Endpoint**: `GET /api/nominees/:id`
- **Response Example**:

```json
{
    "_id": "647fb5604d7e9a2a3ab57bce",
    "name": "OZEMOKA HALIMA",
    "category": {
        "_id": "6478e4603ca35822a6ed4c8b",
        "name": "U-Socialite of the year",
        "__v": 0
    },
    "votes": 0,
    "__v": 0
}
```
### Votes

#### Create a Vote

- **Endpoint**: `POST /api/votes`
- **Request Body**:

```json
{
  "nominee": "609e12a8c987b609c83bdf6a"
}
```

- **Response Example**:

```json
--not done yet
```

#### Get All Votes

- **Endpoint**: `GET /api/votes`
- **Response Example**:

```json
--not done yet
```

## Error Handling

In case of any errors, the API will return appropriate error responses with status codes and error messages.

## Authentication

To access certain endpoints (e.g., creating nominees, voting), users need to authenticate. You can use a JSON Web Token (JWT) authentication mechanism to secure these endpoints.

## License

The Voting Application API is open-source software licensed under the [MIT license](LICENSE).

---
