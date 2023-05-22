from .db import db, environment, SCHEMA, add_prefix_for_prod
from .recipe_ingredient_join import recipe_ingredient


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.Text, nullable=False)

    # recipes = db.relationship('Recipe', secondary=recipe_ingredient, back_populates='ingredients')
    @property
    def recipes(self):
        from .recipe_ingredient_join import recipe_ingredient
        return db.relationship('Recipe', secondary=recipe_ingredient, back_populates='ingredients')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
        }
