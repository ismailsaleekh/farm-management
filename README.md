
# Farm Management Backend

This project is the backend part of the Farm Management application built with Node.js, Express, and TypeScript.

## Prerequisites

- Node.js
- npm

## Setup

1. Clone the repository
2. Navigate to the project directory

   ```sh
   cd farm-management-backend
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. Create a `.env` file in the root of the project and add the following

   ```env
   PORT=5000
   NODE_ENV=production
   ```

5. Run the development server

   ```sh
   npm start
   ```

## Build

To compile the TypeScript files, run:

```sh
npm run build
```

## Deployment

The compiled JavaScript files will be in the `dist` directory. To start the production server, run:

```sh
node dist/server.js
```
