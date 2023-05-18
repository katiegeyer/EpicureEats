from flask_wtf.csrf import generate_csrf
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Recipe
from app.forms import RecipeForm
from datetime import date
from app.models import db
import os
from flask import redirect, request
from sqlalchemy import insert
# from app.models import Ingredient, recipe_ingredient


recipe_routes = Blueprint('recipes', __name__, url_prefix="/api/recipes")

@recipe_routes.route('/')
def get_all_recipes():
    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}

@recipe_routes.route('/new', methods=['POST'])
def create_recipe():
    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        preview_img_file = request.files["preview_img"]
        preview_img_file.filename = get_unique_filename(
            preview_img_file.filename)
        preview_img_upload = upload_file_to_s3(preview_img_file)

        if "url" not in preview_img_upload:
            return preview_img_upload, 400

        preview_img_url = preview_img_upload["url"]
        new_recipe = Recipe(
            recipe_name=form.data['recipe_name'],
            recipe_owner=form.data['recipe_owner'],
            type=form.data['type'],
            cook_time=form.data['cook_time'],
            user_id=current_user.id,
            preview_img=preview_img_url,
            created_at=date.today(),
            updated_at=date.today()
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    return {"errors": form.errors}

@recipe_routes.route('/<int:id>', methods=["PUT"])
def update_recipe(id):
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        recipe = Recipe.query.get(id)

        if not recipe:
            return {"errors": "recipe doesn't exist"}

        elif recipe.user_id != current_user.id:
            return {"errors": "this is not your recipe"}

        recipe.recipe_name = form.data['recipe_name']
        recipe.recipe_owner = form.data['recipe_owner']
        recipe.type = form.data['type']
        recipe.cook_time = form.data['cook_time']
        if 'preview_img' in form.data:
            recipe.preview_img = form.data['preview_img']
        else:
            recipe.preview_img = None
        recipe.updated_at = date.today()

        db.session.add(recipe)
        db.session.commit()

        return recipe.to_dict()

    return {"errors": form.errors}

@recipe_routes.route('/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe.user_id != current_user.id:
        return {"errors": 'this is not your recipe'}
    else:
        db.session.delete(recipe)
        db.session.commit()
        return {'success': 'recipe deleted'}

@recipe_routes.route('/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get(id)
    if recipe:
        return recipe.to_dict()
    else:
        return {"errors": "recipe not found"}

@recipe_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['POST'])
def add_ingredient_to_recipe(recipe_id, ingredient_id):
    recipe = Recipe.query.get(recipe_id)
    ingredient = Ingredient.query.get(ingredient_id)

    if not recipe or not ingredient:
        return {"error": "Recipe or Ingredient not found"}, 404

    # Add the ingredient to the recipe
    ins = recipe_ingredient.insert().values(
        recipe_id=recipe_id, ingredient_id=ingredient_id)
    db.session.execute(ins)
    db.session.commit()

    return {"success": "Ingredient added to the recipe"}

@recipe_routes.route('/current')
@login_required
def get_current_user_recipes():
    recipes = Recipe.query.filter_by(user_id=current_user.id).all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}
