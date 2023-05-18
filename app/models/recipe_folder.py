# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class RecipeFolder(db.Model):
#     __tablename__="recipe_folders"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)
#     description = db.Column(db.String(100), )
#     recipe_id = db.Column(db.Integer, nullable=False)
#     recipe_box_id = db.Column(db.Integer, nullable=False)
