from app.models import db, Recipe, Ingredient, Preparation, environment, SCHEMA
from sqlalchemy.sql import text


def seed_falafel_pita():
    falafel_pita = Recipe.query.get(30)  # Assuming the ID for falafel pita is 4

    ingredients = [
        ('Falafel', '6 balls'),
        ('Pita bread', '2'),
        ('Lettuce', '1 cup'),
        ('Tomato', '1'),
    ]

    for name, quantity in ingredients:
        ingredient = Ingredient(name=name, quantity=quantity)
        falafel_pita.ingredients.append(ingredient)
        db.session.add(ingredient)

    preparations = [
        (1, 'Heat falafel'),
        (2, 'Stuff pita with falafel and veggies'),
    ]

    for step, instruction in preparations:
        preparation = Preparation(
            step=step, instruction=instruction, recipe_id=falafel_pita.id)
        db.session.add(preparation)

    db.session.commit()


def undo_falafel_pita():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.preparations RESTART IDENTITY CASCADE;")


    else:
        db.session.execute(text("DELETE FROM ingredients"))
        db.session.execute(text("DELETE FROM preparations"))


    db.session.commit()
