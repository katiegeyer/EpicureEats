from app.models import db, Recipe, Ingredient, Preparation, environment, SCHEMA
from sqlalchemy.sql import text


def seed_apple_pie():
    apple_pie = Recipe.query.get(1)  # Assuming the ID for apple pie is 1

    ingredients = [
        ('Apples', '6 cups'),
        ('Sugar', '3/4 cup'),
        ('Flour', '2 tablespoons'),
        ('Cinnamon', '1/2 teaspoon'),
        ('Pie crust', '1 package'),
    ]

    for name, quantity in ingredients:
        ingredient = Ingredient(name=name, quantity=quantity)
        apple_pie.ingredients.append(ingredient)
        db.session.add(ingredient)

    preparations = [
        (1, 'Preheat the oven to 425 degrees F'),
        (2, 'Mix ingredients together'),
        (3, 'Bake for 45 minutes'),
    ]

    for step, instruction in preparations:
        preparation = Preparation(
            step=step, instruction=instruction, recipe_id=apple_pie.id)
        db.session.add(preparation)

    db.session.commit()


def undo_apple_pie():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.preparations RESTART IDENTITY CASCADE;")


    else:
        db.session.execute(text("DELETE FROM ingredients"))
        db.session.execute(text("DELETE FROM preparations"))


    db.session.commit()
