from .db import db, environment, SCHEMA, add_prefix_for_prod
from .recipe_ingredient_join import recipe_ingredient

class Ingredient(db.Model):
    __tablename__ = "ingredients"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ingredient = db.Column(db.Text, nullable=False)

    recipes = db.relationship('Recipe', secondary=recipe_ingredient, back_populates='ingredients')

    def to_dict(self):
        return {
            'id': self.id,
            'recipe_name': self.recipe_name,
            'recipe_owner': self.recipe_owner,
            'user_id': self.user_id,
            'type': self.type,
            'cook_time': self.cook_time,
            'preview_img': self.preview_img,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            # 'user': self.user.to_dict() if self.user else None,
            # 'tags': [tag.to_dict() for tag in self.tags] if self.tags else [],
            # 'ingredients': [ingredient.to_dict() for ingredient in self.ingredients] if self.ingredients else [],
            # 'ratings': [rating.to_dict() for rating in self.ratings] if self.ratings else [],
            # 'boxes': [box.to_dict() for box in self.boxes] if self.boxes else [],
            # 'folders': [folder.to_dict() for folder in self.folders] if self.folders else [],
            # 'comments': [comment.to_dict() for comment in self.comments] if self.comments else []
        }
