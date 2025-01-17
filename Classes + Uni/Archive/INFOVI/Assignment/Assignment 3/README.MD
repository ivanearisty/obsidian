# Overview

To run the project, both, the FastAPI and React servers must be running.

I used pnpm for React, if you intend to run this locally, I would do the same.

## To run the Backend:

1. Make a python virtual environment
2. Activate it
3. Install requirements.txt
4. run `fastapi dev main.py`

## To run the Frontend:

1. Run `pnpm start` 

If you get an error, check node_modules

## Location

Backend is congfigured to run on port 8000; Frontend on 3000

## Caveats

I would advise against rigurously testing the project, since Lolalytics has not authorized me to scrape their webiste.
They don't have a robots.txt, but I would highly doubt that getting 2k requests in less than an hour from 1IP is within
their TOS.