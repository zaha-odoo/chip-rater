# Chip Rater

This is a simple program for Odooers to rate different kinds of chips from the kitchen.

## User Features

- View existing chips and it's # of likes/dislikes.
- Add a new type of chip to the database.
- Rate different chips with "Like" and "Dislike" buttons.

## Technology Details

- Frontend: Web based GUI with JQuery (maybe OWL).
- Backend: Python with flask for server and psycopg2 for data access.
- Data: PostgreSQL.
- Use cookies to prevent multiple voting. (Ideally use login)

## Data Model

- Chip
    - Name
    - Like Count (1toMany)