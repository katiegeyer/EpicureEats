from flask.cli import AppGroup
from .users import seed_users, undo_users
from .recipes import seed_recipes, undo_recipes, seed_more_recipes, undo_more_recipes
from .seed_apple_pie import seed_apple_pie, undo_apple_pie
from .seed_beef_stew import seed_beef_stew, undo_beef_stew
from .seed_vegan_curry import seed_vegan_curry, undo_vegan_curry
from .seed_falafel_pita import seed_falafel_pita, undo_falafel_pita

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_falafel_pita()
        undo_vegan_curry()
        undo_beef_stew()
        undo_apple_pie()
        undo_recipes()
        undo_more_recipes()
        undo_users()
    seed_users()
    seed_recipes()
    seed_more_recipes()
    seed_apple_pie()
    seed_beef_stew()
    seed_vegan_curry()
    seed_falafel_pita()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_recipes()
    undo_more_recipes()
    undo_apple_pie()
    undo_beef_stew()

    # Add other undo functions here
