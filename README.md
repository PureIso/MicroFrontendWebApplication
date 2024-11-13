# MicroFrontendWebApplication

This project demonstrates a **micro frontend** architecture in Angular using **@angular-architects/native-federation**. The architecture includes two applications:

1. **FrontendWebApplication**: The host application, which loads a remote component dynamically.
2. **RemoteFrontendWebApplication**: The remote application, which exposes components to be consumed by the host application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
  - [RemoteFrontendWebApplication](#remote-frontend-web-application)
  - [FrontendWebApplication](#frontend-web-application)
- [Running the Applications](#running-the-applications)
- [Troubleshooting](#troubleshooting)
- [Further Reading](#further-reading)

## Prerequisites

- **Node.js** (>=14.x)
- **Angular CLI** (ensure compatibility with Angular 18)
- **@angular-architects/native-federation** library

Ensure that you have installed the Angular CLI globally:

```bash
npm install -g @angular/cli
```

## Installation
Clone the repository and navigate into the project directory. Then, install dependencies for each application.

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies for both applications
cd MicroFrontendWebApplication
npm install
```

## Running the Applications
1.  Start RemoteFrontendWebApplication:
```bash
ng serve RemoteFrontendWebApplication --port 4201
```
2.  Start FrontendWebApplication:
```bash
ng serve FrontendWebApplication --port 4200
```
3. Access the Applications:
- FrontendWebApplication: http://localhost:4200/
- RemoteFrontendWebApplication: http://localhost:4201/