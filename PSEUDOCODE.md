---

## THEME

- Color Scheme

# Main Page

-1.Cards
-- favorites
--- make button
--- On click stores game in user profile/database

---

## -- Pictures and data from api

-2.Videos - headline videos
-3.Games - section for top games - section for worst games - new games/upcoming games (most anticipated)
-Charts
-Comment Section
-- Post
---Read posts
---- Posts by user
-----chronological timeline
------Box for all posts
-NavBar
-- Login
-Carosal
-Logo

# Profile Page

-User profile picture

- Favorite games
- user chart
- user friends
  --- fav five

# About Us

- About the company.
- about the developers

# Authentication

-- Form
-- Passport
-- Login and

# Routing

- # POST
  --- Route to post user profile data
  ---- connect route to database
- # GET
- make main page route
  --- routes to get search page
  --- reroutes to get profile pages

## Search Page

----# Charts

# DATABASE

-- make database to store users
--- store user passwords
---- store user preferences

- # SCHEMA
- # SEEDS


-## Tables
// Users
Shannon is creating
    // first_name
    // last_name
    // user_name
    // user_id
    // email
    // password_hash (TBD)
    // profile_picture
    // profile_cover

// Favorites
    // game_slug
    // unique_id
    // user_id

// top favs/worst table use booleans
    // favorites - false
    // non_favorites - true
    // currently_playing - false

// comments table
    // user_id
    // comment