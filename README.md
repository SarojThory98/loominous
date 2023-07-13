# Loominous Backend
This contains the backend code written in node.js for loominous

## Table of Contents
2. [Getting started](#Getting)
3. [Installation](#Installation)
4. [Usage](#Usage)
5. [Run](#Run)
7. [Convetions](#Convetions)


## Getting started
To get started make sure you've node installed (min version 16.0.0).


## Installation
### Prerequisites
```sh
    node v16.0.0
```

### Installing

Clone the repository and move to the project directory

```sh
git clone https://bitbucket.org/reachparaggupta/loominous_nodejs.git
cd loominous_nodejs
```

### Install dependencies

Install dependencies from the project directory

```sh
npm install
```


## Usage

The scripts are run in the function app.listen() (of src/server.ts).

## Run

To launch the scripts, run the below command in the terminal:

##### For local
```sh
npm run local
```

##### For development
```sh
npm run development
```

##### For uat
```sh
npm run uat
```

##### For production
```sh
npm run production
```

## Convetions
### Branch Naming Convetions

#### Feature Branch
```sh
feature-{ticketId}-narration
```

#### Bug Fix Branch
```sh
bugfix-{ticketId}-narration
```

#### Hot Fix Branch
```sh
hotfix-{ticketId}-narration
```

#### Release Branch
```sh
release-{sprint}-narration
```

### Folder Naming Convetions
Make all the folders using snake case
```
    folder_name
```

### Files Naming Convetions
Make all the files using kebab case
```
    kebab-case.<Folder/Feature>.<extension>
```

### Commit Message Conventions

#### Feature Commit Message
```sh
feat: [{ticketId}] commit message <Developers Name>
```

#### Bug Fix Commit Message
```sh
fix: [{ticketId}] commit message <Developers Name>
```