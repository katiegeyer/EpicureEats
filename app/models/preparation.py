from .db import db, environment, SCHEMA, add_prefix_for_prod
from .r_preparation_join import recipe_preparation


class Preparation(db.Model):
    __tablename__ = "preparations"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    step = db.Column(db.Integer, nullable=False)
    instruction = db.Column(db.String, nullable=True)

    recipes = db.relationship(
        'Recipe', secondary=recipe_preparation, back_populates='preparations')
    # @property
    # def recipes(self):
    #     from .recipe_preparation_join import recipe_preparation
    #     return db.relationship('Recipe', secondary=recipe_preparation, back_populates='preparations')

    def to_dict(self):
        return {
            'id': self.id,
            'step': self.step,
            'instruction': self.instruction,
        }
