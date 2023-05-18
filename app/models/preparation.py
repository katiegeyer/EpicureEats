# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.sql import func

# class Preparation(db.Model):
#     __tablename__ = "preparation_steps"

#     id = db.Column(db.Integer, primary_key=True)
#     step_number = db.Column(db.Integer, nullable=False)
#     instruction = db.Column(db.String(1000), nullable=False)
#     recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'))


#     recipe = db.relationship('Recipe', back_populates='preparation_stepscccccccccc')
