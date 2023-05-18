# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .recipe_box_item_join import recipe_box_item

# class RecipeBox(db.Model):
#     __tablename__ = "recipe_boxes"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

#     user = db.relationship('User', back_populates='recipe_boxes')
#     recipe = db.relationship('Recipe', secondary=recipe_box_item, back_populates='recipe_boxes')
