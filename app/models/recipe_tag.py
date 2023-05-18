from .db import db, environment, SCHEMA, add_prefix_for_prod

class RecipeTag(db.Model):
    __tablename__ = "recipe_tags"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.Text, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')))

    recipe = db.relationship('Recipe', back_populates='tags')
