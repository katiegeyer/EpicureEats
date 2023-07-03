# Epicure Eats

Welcome to Epicure Eats! A platform for food lovers to find recipes, create food, and build community. Once in our website, you will find a homepage where you can click the main picture which leads you to either a log in form or sign up form. Once logged in or an account is created, it will take you to the recipes page where you can discover and review new recipes. You can post your own recipe, review others, and even delete your own comments or account if needed.

This project is built with a Flask-React architecture.

## Live Site
[Epicure Eats Live](<https://epicure-eats.onrender.com/>)

## Features
- Dynamic forms to post your own recipe.
- Ability to add ingredients and cooking steps, and remove them if needed.
- Review and comment on others' recipes.
- User account management with the ability to delete account.

## Technologies Used
- React.js
- Redux
- Python
- Flask
- JavaScript
- SQL
- Git
- HTML5
- CSS
- PostgreSQL

## Getting Started

1. Clone this repository (only this branch)

2. Install dependencies
```shell
pipenv install -r requirements.txt
```

3. Create a .env file based on the example with proper settings for your development environment.

4. Make sure the SQLite3 database connection URL is in the .env file. This starter organizes all tables inside the flask_schema schema, defined by the SCHEMA environment variable. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app
```shell
pipenv shell
flask db upgrade
flask seed all
flask run
```
6. To run the React App in development, checkout the README inside the react-app directory.

## Additional Libraries
We are using react-slick and moment in our program, you will need to install both in your terminal:

```shell
npm install react-moment
npm install react-slick --save
npm install slick-carousel
```

## Deployment through Render.com
Please refer to the detailed instruction inside the repo for Render.com deployment.

## Acknowledgement
This is the starter for the Flask React project.

## License
This project is licensed under the terms of the XYZ license.

## Contact
For more information, feel free to reach us at [our contact email](mailto:kegeyer@icloud.com)

## Epicure Eats in Action




<!-- Welcome to Epicure Eats!!

Epicure eats is the spot to find recipes, create food, and build community.

Once in our website, you will find a homepage where you can click the main picture which leads you to either a log in form or sign up form.  Once you have logged in or created an account, it will take you to the recipes page where you can discover and review new recipes.

Upon signing in, you will find an option to 'Post a Recipe' on the right side of your nav bar.  If you choose to do so, you can enter the information along with a delicious image, and post your recipe for other's to enjoy.

Once on your recipe page, you will have the ability to add ingredients and cooking steps.  There is no limit, and you can always remove the ingredients and steps you no longer need in the case you change your mind.

On the recipes page, you are able to review other's recipes as well as delete your own comments.

If you are thoroughly unsatisfied with your experience, feel free to navigate to the profile dropdown menu and delete your account.



This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

We are using react-slick and moment in our program, you will need to install both in your terminal:

```shell
# start script
npm install react-moment
npm install react-slick --save
npm install slick-carousel
```


### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/ -->
