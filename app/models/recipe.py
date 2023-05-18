from .db import db, environment, SCHEMA, add_prefix_for_prod
from .recipe_ingredient_join import recipe_ingredient


class Recipe(db.Model):
    __tablename__ = "recipes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_name = db.Column(db.String(255), nullable=False)
    recipe_owner = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    type = db.Column(db.String(50), nullable=False)
    cook_time = db.Column(db.Float(50), nullable=False)
    preview_img = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    user = db.relationship('User', back_populates='recipes')
    tags = db.relationship('RecipeTag', back_populates='recipes')
    ingredients = db.relationship(
        'Ingredient', secondary=recipe_ingredient, back_populates='recipes')
    ratings = db.relationship('RecipeRating', back_populates='recipes')
    boxes = db.relationship('RecipeBoxItem', back_populates='recipes')
    folders = db.relationship('RecipeFolder', back_populates='recipes')
    comments = db.relationship('RecipeComment', back_populates='recipes')
    preparations = db.relationship('Preparation', back_populates='recipes', cascade='all, delete-orphan')

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
