# Sample Webapp for OneDrive File Explorer

## About this project

This project is developed to demonstrate the functionality of integrating Microsoft Graph APIs and allowing sign-in using Microsoft Entra ID and accessing OneDrive files.

The project contains -

1. Backend Server (developed in NodeJs)
2. Frontend Webapp (developed in NextJs)

## How to run the project

### Pre-requisites

- Ensure [all pre-requisites](https://learn.microsoft.com/en-us/graph/auth-register-app-v2) have been completed to use microsft graph API and authentication.

- Install node.js if needed (<https://nodejs.org/en/>).

### Configure the application

- Open `.env.example` file inside frontend folder and update the name to `.env.local`

- Replace `NEXT_PUBLIC_MICROSOFT_CLIENT_ID` with the Application (client) ID from the portal registration, or use any existing client ID.

- Optionally, you may replace any of the other parameters, or you can remove them and use the default values.

#### Install npm dependencies for sample

```bash

# Install dev dependencies for backend and frontend repos in their respective root folders and start the server and webapp


# Change directory to backend
cd  backend
# Install npm dependencies
npm  install
# Run the dev server
npm run dev


# Change directory to frontend
cd  frontend
# Install npm dependencies
npm  install
# Run the dev server
npm  run  dev

```

#### Running the sample development server

1. In a command prompt, run `npm run dev`.

1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

1. Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to see the list of one drive files. If you are not yet signed in, signin will be invoked automatically.
