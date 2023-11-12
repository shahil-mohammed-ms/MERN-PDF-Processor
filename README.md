# MERN-PDF-Processor
 A web application that allows users to upload a PDF file and extract certain pages from the PDF to create a new PDF. The user is be able to select which pages they want to include in the new PDF.
## Features
-user signup and login
-jwt Authentication and Authorization
-selecting pdf files and opening the image format(.png) for pdf page wise 
-select each page with preffered order and create new pdf
## Installation
- `git clone <this_url> && cd <repo_name>`
- install npm on client and server
  - `cd client`
  - `npm install`
  - `cd ../server`
  - `npm install`
 -configure mongodb in servers src
- Configure Server
  - Create `.env` file in `server`
  - Update `.env` file with `MONGODB_URI=mongodb://127.0.0.1:27017/MERN-PDF-Processor`,`CORS_ORIGIN=http://localhost:3000`,`JWT_SECRET=MERN_PDF_Processor`
- Configure Client
  - Create `.env` file in `client`
  - Update `.env` file with `REACT_APP_API_URL=http://localhost:5000`
 - Development Mode (Client only): `cd client` then `npm run start` then open `http://localhost:3000` in a browser
 - Development Mode (Server only): `cd server` then `npm run start` then open `http://localhost:5000` in a browser
# App runung Demo
-link 
