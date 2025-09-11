# EV Charging Station Management System

## Project Overview

A modern EV charging station management platform with role-based dashboards for drivers, staff, and administrators.

## How to run this project?

**Local Development**

You can clone this repo and run it locally using your preferred IDE.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd SWP391

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Alternative Development Methods

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Frontend library
- **shadcn-ui** - Modern UI components
- **Tailwind CSS** - Utility-first CSS framework

## Features

- Role-based dashboards (Driver, Staff, Administrator)
- Modern responsive design
- Authentication system
- EV charging station management

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── types/         # TypeScript type definitions
└── lib/           # Utility functions
```
