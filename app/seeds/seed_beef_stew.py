from app.models import db, Recipe, Ingredient, Preparation, environment, SCHEMA
from sqlalchemy.sql import text


def seed_beef_stew():
    beef_stew = Recipe.query.get(2)  # Assuming the ID for beef stew is 2

    ingredients = [
        ('Beef', '1 pound'),
        ('Carrots', '4'),
        ('Potatoes', '3'),
        ('Onion', '1'),
        ('Beef broth', '4 cups'),
    ]

    for name, quantity in ingredients:
        ingredient = Ingredient(name=name, quantity=quantity)
        beef_stew.ingredients.append(ingredient)
        db.session.add(ingredient)

    preparations = [
        (1, 'Brown beef'),
        (2, 'Add vegetables'),
        (3, 'Simmer for 2 hours'),
    ]

    for step, instruction in preparations:
        preparation = Preparation(step=step, instruction=instruction, recipe_id=beef_stew.id)
        db.session.add(preparation)

    db.session.commit()

def undo_beef_stew():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.preparations RESTART IDENTITY CASCADE;")


    else:
        db.session.execute(text("DELETE FROM ingredients"))
        db.session.execute(text("DELETE FROM preparations"))


    db.session.commit()
