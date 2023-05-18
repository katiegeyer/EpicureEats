# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.sql import func


# class RecipeComment(db.Model):
#     __tablename__ ='recipe_comments'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key = True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable = False)
#     recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable = False)
#     user_name = db.Column(db.String(50))
#     is_public = db.Column(db.Boolean, nullable=False)
#     created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
#     updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "recipe_id": self.user_id,
#             "user_name": self.song_id,
#             "is_public": self.text,
#         }

#     user = db.relationship('User', back_populates = 'recipe_comments')
#     recipe = db.relationship('Recipe', back_populates = 'recipe_comments')
