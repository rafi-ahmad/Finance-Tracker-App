# Finance-Tracker-App

This application is designed to help users track their financial activities.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:


node.js npm or yarn


### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repository to your local machine.
2. Navigate to the `server` folder and install dependencies:


cd server npm install


3. Navigate to the `client` folder and install dependencies:


cd …/client npm install


### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:


PORT=5000 ATLAS_URI=your_mongodb_atlas_uri


Replace `your_mongodb_atlas_uri` with your actual MongoDB Atlas URI.

### Running the Application

To run the server, execute:


npm start


To run the client, navigate to the `client` folder and execute:


npm start


## Built With

* React - The web framework used
* Node.js - The server environment
* Express.js - The web application framework
