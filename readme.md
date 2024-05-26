# MERN Application & Authentication with JWT

NOTE : This documentation presents an overview of the authentication (Auth) module and its associated screens.


This is an app for a MERN stack application with authentication. This is for a SPA (Single Page Application) workflow that uses the [Vite](https://vite.dev) Build tool.

App Screens :
<img src="./frontend/src/assets/images/git.png" />

It includes the following:

- Backend API with Express & MongoDB
- Routes for login, logout, signup, profile, settings (update profile) , ...
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- State Management using Redux
- Payment Integration with Flousi for handling subscriptions and payments
- Managing Backend and Frontend Links using mutations
- Custom error middleware
- React Toastify notifications
- React frontend to register, login, logout, view profile, update profile and others screens
- custom component for login and sign up design 

### API Endpoints

## User Authentication
```
POST /api/user/signup - Register a new user
POST /api/user/auth - Authenticate user and generate token
POST /api/user/logout - Logout user and clear cookie
GET /api/user/getUser - Get user profile
PUT /api/user/settings - Update user profile
```

## Artist Management
```
POST /api/artist/openOrder - Open an order for an artist
PATCH /api/artist/socialMedia - Update artist social media
GET /api/artist/
- Get artist by ID
```
## Artwork Management
```
POST /api/artwork/addArtwork - Add new artwork
GET /api/artwork/getArtworks - Get all artworks
GET /api/artwork/getExclusiveArtworks - Get exclusive artworks
```
## Saved Artworks
```
GET /api/liked/saved/getSavedArtworks - Get all saved artworks by a user
POST /api/liked/saved/saveArtwork - Save an artwork
DELETE /api/liked/saved/unsaveArtwork - Unsave an artwork
```
## Plans
```
POST /api/plan/subscribe - Subscribe to a plan
GET /api/plan/plans - Get all available plans
GET /api/plan/history - Get all history plans of an artist
GET /api/plan/activePlan - Get active current plan of an artist
```
## Orders
```
GET /api/order/client - Get orders for a specific client
GET /api/order/artist - Get orders for a specific artist
POST /api/order/new - Make a new order by client to an artist
PUT /api/order/accept - Accept order of a client
PUT /api/order/reject - Reject order of a client
PATCH /api/order/submit - Submit work of an artist to order
```
## Reviews
```
GET /api/review/artwork/
- Get reviews by artwork ID
PATCH /api/review/addComment - Add a comment to a review or update it
PATCH /api/review/updateView - Save the view of a client for an artwork
DELETE /api/review/deleteComment - Delete a comment from a review
```
## Reports
```
GET /api/report/review/reports - Get reported reviews
GET /api/report/artwork/reports - Get reported artworks
GET /api/report/getReviewsReportsByClass - Get reported reviews by class
GET /api/report/getArtworksReportsByClass - Get reported artworks by class
POST /api/report/reportComment - Report a comment in a review
POST /api/report/reportArtwork - Report an artwork
```
## Following
```
GET /api/follow/isFollowing - Check if the client is following the given artist
POST /api/follow/followArtist/
- Follow an artist
DELETE /api/follow/unfollowArtist/
- Unfollow an artist
GET /api/follow/followers - Get followers of an artist
GET /api/follow/FollowedArtists - Get followed artists by a client
```
## Categories
```
POST /api/categories - Add a new category
GET /api/categories/
- Get category name by ID
```
## Museums
```
POST /api/museum/create - Create a museum
GET /api/museum - Get all museums
POST /api/museum/artistJoin - Artist joins a museum
POST /api/museum/clientJoin - Client joins a museum
PATCH /api/museum/edit - Edit a museum
POST /api/museum/addExclusiveArtwork - Add new exclusive artwork to museum
POST /api/museum/addArtworks - Add multiple existing artworks to a museum
```
## Analytics
```
POST /api/analytics/getArtistAnalytics - Get artist analytics
```

## License
This project is licensed under the MIT License.
© 2024 Artifex All rights reserved

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)


Change the MongoDB URI with your own from atlas & 
Change the JWT_SECRET to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm i
cd ..
cd backend
npm i
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm start

# Run backend only
npm run server

# Run frontend only
npm run client
```
