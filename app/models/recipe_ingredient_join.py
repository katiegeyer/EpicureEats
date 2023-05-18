# from .db import db, environment, SCHEMA, add_prefix_for_prod

# recipe_ingredient = db.Table(
#     'recipe_ingredients',
#     db.Model.metadata,
#     db.Column("ingredient_id", db.ForeignKey(add_prefix_for_prod("ingredients.id")), primary_key=True),
#     db.Column("recipe_id", db.ForeignKey(add_prefix_for_prod("recipes.id")), primary_key=True),
# )

# if environment == 'production':
#     recipe_ingredient.schema = SCHEMA

# class RecipeIngredient(db.Model):
#     __tablename__ = "recipe_ingredients"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     ingredient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('ingredients.id')))
#     recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))

#     ingredient = db.relationship('Ingredient', back_populates='recipe_ingredients')
#     recipe = db.relationship('Recipe', back_populates='ingredients')
