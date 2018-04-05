# UserCloningDesignTool
This is everything needed to run the user cloning tool we developed

# File and program structure
/frontend
 * Holds the static angular based frontend that talks to the backend via a rest api.

/backend
 * Holds the django based backend that serves everything via uWSGI (using django whitenoise for static files)

/(root)
 * Holds docker-compose that sets up a container for the backend and a postgresql database  

# Instructions:
1) Build the frontend
    
        cd frontend
        npm run build-prod
2) Run it
    
        docker-compose up


# To do
 * Fix CSV output (only gives reverse primer)
 * Attempt to update frontend components
 * Put online