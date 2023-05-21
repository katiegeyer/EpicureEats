# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .recipe_ingredient_join import recipe_ingredient

# class Ingredient(db.Model):
#     __tablename__ = "ingredients"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     ingredient = db.Column(db.Text, nullable=False)

#     recipes = db.relationship('Recipe', secondary=recipe_ingredient, back_populates='ingredients')

from .db import db, environment, SCHEMA, add_prefix_for_prod
from .recipe_ingredient_join import recipe_ingredient

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.String(255), nullable=True)

    # This relationship is optional; only needed if you want to directly access
    # the recipes associated with a given ingredient.
    recipes = db.relationship(
        'Recipe', secondary=recipe_ingredient, back_populates='ingredients')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
        }


# recipe_ingredient = db.Table(
#     'recipe_ingredient',
#     db.Column('recipe_id', db.Integer, db.ForeignKey(
#         'recipes.id'), primary_key=True),
#     db.Column('ingredient_id', db.Integer, db.ForeignKey(
#         'ingredients.id'), primary_key=True),
#     # optionally, you can store quantity here if it varies per recipe
#     db.Column('quantity', db.String(255)),
# )
