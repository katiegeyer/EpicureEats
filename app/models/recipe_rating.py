from .db import db, environment, SCHEMA, add_prefix_for_prod

class RecipeRating(db.Model):
    __tablename__ = "recipe_rating"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    rating = db.Column(db.Integer)

    recipe = db.relationship('Recipe', back_populates='ratings')
    user = db.relationship('User', back_populates='ratings')

