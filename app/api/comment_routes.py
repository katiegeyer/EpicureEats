from flask import Blueprint, jsonify, request
from app.models import RecipeComment, db
from flask import request
from datetime import datetime
from flask_wtf.csrf import generate_csrf
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Recipe, Ingredient, Preparation
from app.forms import RecipeForm, IngredientForm
from datetime import date
from app.models import db
import os
from flask import redirect, request
from sqlalchemy import insert
from flask_wtf.csrf import CSRFProtect

# comment_routes = Blueprint('comments', __name__,
#                            url_prefix='/api/comments')


# @recipe_routes.route('/<int:recipe_id>/comments', methods=['GET'])
# def get_comments(recipe_id):
#     comments = RecipeComment.query.filter_by(recipe_id=recipe_id).all()
#     return jsonify([comment.to_dict() for comment in comments])


# @recipe_routes.route('/comments/<int:id>', methods=['POST'])
# def post_comment():
#     data = request.get_json()
#     comment = RecipeComment(user_id=data['user_id'], recipe_id=data['recipe_id'],
#                             user_name=data['user_name'], is_public=data['is_public'])
#     db.session.add(comment)
#     db.session.commit()
#     return jsonify(comment.to_dict()), 201


# @recipe_routes.route('/<int:recipe_id>/comments/<int:id>', methods=['PUT'])
# def update_comment(id):
#     data = request.get_json()
#     comment = RecipeComment.query.get(id)
#     comment.is_public = data['is_public']
#     db.session.commit()
#     return jsonify(comment.to_dict())


# @recipe_routes.route('/<int:recipe_id>/comments/<int:id>', methods=['DELETE'])
# def delete_comment(id):
#     comment = RecipeComment.query.get(id)
#     db.session.delete(comment)
#     db.session.commit()
#     return jsonify({'message': 'deleted'})
