from app.models import db, Recipe, Ingredient, Preparation, environment, SCHEMA
from sqlalchemy.sql import text


def seed_vegan_curry():
    vegan_curry = Recipe.query.get(3)  # Assuming the ID for vegan curry is 3

    ingredients = [
        ('Tofu', '1 block'),
        ('Coconut milk', '1 can'),
        ('Curry powder', '2 tablespoons'),
        ('Vegetables', '3 cups'),
    ]

    for name, quantity in ingredients:
        ingredient = Ingredient(name=name, quantity=quantity)
        vegan_curry.ingredients.append(ingredient)
        db.session.add(ingredient)

    preparations = [
        (1, 'Fry tofu'),
        (2, 'Add coconut milk and curry powder'),
        (3, 'Simmer for 20 minutes'),
    ]

    for step, instruction in preparations:
        preparation = Preparation(
            step=step, instruction=instruction, recipe_id=vegan_curry.id)
        db.session.add(preparation)

    db.session.commit()


def undo_vegan_curry():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.preparations RESTART IDENTITY CASCADE;")

    else:
        db.session.execute(text("DELETE FROM ingredients"))
        db.session.execute(text("DELETE FROM preparations"))

    db.session.commit()
