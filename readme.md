# Node.js/Express Application with PostgreSQL and Sequelize

This Node.js/Express application is built with PostgreSQL as the database and Sequelize as the ORM. It provides a simple CRUD functionality for managing a list of entries.

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file based on the `.env.example` file and set your own environment variables for the database connection

## Usage

To start the server, run `npm run serve`. This will start the server on port 3001. You can access the CRUD APIs using `http://localhost:3001/api/v1/`.

## API Endpoints

### GET /api/v1/entries

This endpoint returns a list of all the entries in the database.
#### params:
```
- offset: Start point of entries for the pagination function.
- limit: Count of entries the page.
ex: http://localhost:3001/api/entries?offset=6&limit:5
```

### GET /api/v1/entries/:id

This endpoint returns the details of a specific entry identified by the `id` parameter.

### POST /api/v1/entries

This endpoint creates a new entry. The expected request body should include `name`, `description`, and `price` properties.

### PUT /api/v1/entries/:id

This endpoint updates the details of a specific entry identified by the `id` parameter. The expected request body should include one or more of the following properties: `name`, `description`, and `price`.

### DELETE /api/v1/entries/:id

This endpoint deletes a specific entry identified by the `id` parameter.

## Acknowledgments

This application is built with the following technologies:

- Node.js
- Express
- PostgreSQL
- Sequelize

## License

This project is licensed under the MIT License - see the `LICENSE file for details. 