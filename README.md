# movie-magic-may-2026

## Workshop 1 - Express and Templating

### Setup
- [x] Initialize Project
- [x] Add Express Server `npm 1 express`
- [x] Config debugging and dev script
- [x] Add Workshop Resources
- [x] Setup Handlebars `npm i express-handlebars
- [x] Render Home Page
- [x] Setup static files
- [x] Render About Page
- [x] Add Layout
### Architecture and dynamic rendering
- [x] Add home controller
- [x] Add movie data layer
- [x] Add movie service
- [x] Render single movie on home page
- [x] Render movies on home page
- [x] Show no movies screen
### Create Movie
- [x] Add Movie Controller
- [x] Show create movie page
- [x] Add routes
- [x] Add 404 page
- [x] Ready body data
- [x] Create movie
    - [x] Add action
    - [x] Add Service
    - [x] Add repository
- [x] Redirect after creation
- [x] Add unique id for each created movie
### Details
- [x] Add navigation button for details page
- [x] Add route with param for details page
- [x] Get one movie from service
- [x] Find movie by id from repository
- [x] Render details page with dynamic data
### Search
- [x] Show static search page
- [x] Render all movies
- [x] Modify search form
- [x] Filter movies
    - [x] By year
    - [x] By genre
    - [x] By title
- [x] Remember search words
### Bonuses
- [x] Dynamic page title (basic)
- [x] Rating (temp solution)
- [x] File Presistance


## Workshop 2 - PostgreSQL and Prisma

### Prerequisites
- [x] PostgreSQL Installed `psql --version`
- [x] GUI Client like pgAdmin\

### Setup Database
- [x] Install and Setup TypeScript support
- [x] Change npm start script to use tsx `tsx --watch src/index.js``
- [x] Install Prisma related packages
- [x] Initialize Prisma `npx prisma init --output ../generated/prisma`
- [x] Add Database url and variable
- [x] Generate first prisma client `npx prisma generated`
- [x] Instantiate Prisma client

### Setup Models
- [x] Add Movie Model
- [x] Migrate database `npx prisma migrate dev --name add_movies_table` or `npx prisma db push`

### Refactor Movies
- [x] Remove uuid
- [x] Create Movie
- [x] Read all movies
- [x] Movie details page
- [x] Remove file persistance related code

### Artist
- [x] Add Resources 
- [x] Add Artist model
- [x] Add Artist view
- [x] Add Artist controller
- [x] Add Artist to routes
- [x] Add Artist header link
- [x] Modify create form
- [x] Add artist post action
- [x] Add Artist service
- [x] Add Artist repository

### Attach Artist to Movie
- [x] Add relation between Artists and movies (Implicit Many-to-Many)
- [x] Add page view 
- [x] Add dynamic data
- [x] Populate artist select
- [x] Attach functionality

### Show Artists on Details page
- [x] Modify details page 
- [x] Link to attach page  
- [x] Show dynamic cast

### Bonuses
- [x] Show filtered artists in attach page
- [x] Search filter in db
- [] Name in movie (Explicit Many-to-Many)
- [] Modify service export
 
 
## Workshop 3 - PostgreSQL and Prisma

### Intro
-[x] Add Resources

### Register
- [x] Add auth controller
- [x] Add register page
- [x] Add register post action
- [x] Add service
- [x] Add repository
- [x] Add model
- [x] Hash password `npm i bcrypt` 

### Login
- [x] Add login page
- [x] Add login post action
- [x] Add service method
- [x] Add findByEmail repository method
- [x] Validate password
- [x] Issue JWT token `npm i jsonwebtoken`
- [x] Return token in cookie

### Logout
- [x] Add logout action
- [x] Use logout on invalid token

### Authentication & Authorization
- [x] Create auth middleware
- [x] Setup cookie parser
- [x] Validate Token
- [x] Add isAuthenticated guard
- [x] Add isGuest guard

### Edit and Delete movies
- [x] Add user movies relation 
- [x] Add owner on movie create
- [x] Show dynamic details buttons
- [x] Implement delete button
- [x] Add static edi page
- [x] Show dynamic values on edit page
- [x] Add edit post action

### Dynamic navigation
- [x] Show dynamic navigation based on user session

### Bonuses
- [x] Automatic login on register
- [x] Fix secret
- [x] Fix select on edit
- [ ] Make token generation async
- [ ] Fix rating  


## Workshop 4 - Validation and Error Handling

### Intro
- [x] Add resources

### Movie validation and error handling
- [x] Create movie scheme with Zod
- [x] Catch, extract and return errors
- [x] Populate already filled data
- [x] Populate select category
- [x] Show single error
- [x] Show multiple errors
- [x] Get Prisma errors


### Artist validation and error handling
- [ ] Validate Movie 
- [ ] Validate Artist
- [ ] Validate User
- [ ] Validate repeat password