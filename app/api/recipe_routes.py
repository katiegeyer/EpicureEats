from flask import request
from datetime import datetime
from flask_wtf.csrf import generate_csrf
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Recipe, Ingredient, Preparation, RecipeComment
from app.forms import RecipeForm, IngredientForm, PreparationDataForm
from datetime import date
from app.models import db
import os
from flask import redirect, request
from sqlalchemy import insert
from flask_wtf.csrf import CSRFProtect, generate_csrf
from sqlalchemy import or_
# from app.models import Ingredient, recipe_ingredient

csrf = CSRFProtect()

recipe_routes = Blueprint('recipes', __name__, url_prefix="/api/recipes")


@recipe_routes.route('/')
def get_all_recipes():
    recipes = Recipe.query.all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}


@recipe_routes.route('/new', methods=['POST'])
def create_recipe():
    form = RecipeForm()
    # request. keys into the request (request.json will key into the body, giving the json value from the request object's body.  you'll save it to a variable and key into all of the values and assign them)
    form['csrf_token'].data = request.cookies['csrf_token']
    # print(request.json)
    if form.validate_on_submit():
        # No need to upload a file, just use the provided URL directly
        preview_img_url = form.data['preview_img']

        new_recipe = Recipe(
            recipe_name=form.data['recipe_name'],
            recipe_owner=form.data['recipe_owner'],
            type=form.data['type'],
            cook_time=form.data['cook_time'],
            user_id=current_user.id,
            preview_img=preview_img_url,
            description=form.data['description'],
            created_at=date.today(),
            updated_at=date.today()
        )
        db.session.add(new_recipe)
        db.session.commit()
        return new_recipe.to_dict()
    return {"errors": form.errors}


# @recipe_routes.route('/<int:id>', methods=["PUT"])
# def update_recipe(id):
#     data = request.json

#     recipe = Recipe.query.get(id)

#     if not recipe:
#         return {"errors": "recipe doesn't exist"}

#     elif recipe.user_id != current_user.id:
#         return {"errors": "this is not your recipe"}

#     recipe.recipe_name = data.get('recipe_name')
#     recipe.recipe_owner = data.get('recipe_owner')
#     recipe.type = data.get('type')
#     recipe.cook_time = data.get('cook_time')
#     recipe.description = data.get('description')
#     if data.get('preview_img'):
#         recipe.preview_img = data.get('preview_img')
#     else:
#         recipe.preview_img = None
#     recipe.updated_at = date.today()

#     db.session.add(recipe)
#     db.session.commit()

#     return recipe.to_dict()


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
        recipe.description = form.data['description']
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


# @recipe_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['POST'])
# def add_ingredient_to_recipe(recipe_id, ingredient_id):
#     recipe = Recipe.query.get(recipe_id)
#     ingredient = Ingredient.query.get(ingredient_id)

#     if not recipe or not ingredient:
#         return {"error": "Recipe or Ingredient not found"}, 404

#     # Add the ingredient to the recipe
#     ins = recipe_ingredient.insert().values(
#         recipe_id=recipe_id, ingredient_id=ingredient_id)
#     db.session.execute(ins)
#     db.session.commit()

#     return {"success": "Ingredient added to the recipe"}


@recipe_routes.route('/current')
@login_required
def get_current_user_recipes():
    recipes = Recipe.query.filter_by(user_id=current_user.id).all()
    return {"recipes": [recipe.to_dict() for recipe in recipes]}

# INGREDIENT ROUTES

# Get all ingredients for a specific recipe


@csrf.exempt
@recipe_routes.route('/<int:recipe_id>/ingredients', methods=['GET'])
@csrf.exempt
def get_ingredients(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if recipe:
        return {"ingredients": [ingredient.to_dict() for ingredient in recipe.ingredients]}
    else:
        return {"errors": "recipe not found"}

# Add a new ingredient to a recipe


# @recipe_routes.route('/<int:recipe_id>/ingredients', methods=['POST'])
# def add_ingredient(recipe_id):
#     form = IngredientForm()

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         recipe = Recipe.query.get(recipe_id)

#         if not recipe:
#             return {"error": "Recipe not found"}, 404

#         # Find the ingredient by name, or create it if it doesn't exist
#         ingredient = Ingredient.query.filter_by(name=form.data['name']).first()
#         if not ingredient:
#             ingredient = Ingredient(
#                 name=form.data['name'], quantity=form.data['quantity'])
#             db.session.add(ingredient)
#             db.session.commit()

#         # Add the ingredient to the recipe
#         recipe.ingredients.append(ingredient)
#         db.session.commit()

#         print(ingredient)
#         return ingredient.to_dict()

#     return {"errors": form.errors}

# @recipe_routes.route('/<int:recipe_id>/ingredients', methods=['POST'])
# @login_required
# def add_ingredient(recipe_id):
#     form = IngredientForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     print('request.json:', request.json)
#     print('form.data:', form.data)

#     if form.validate_on_submit():
#         print('Form validated')
#         recipe = Recipe.query.get(recipe_id)
#         if not recipe:
#             return {"error": "Recipe not found"}, 404

#         ingredients = []
#         for ingredient_data in form.data['ingredients']:
#             print('Processing ingredient: ', ingredient_data)
#             # Find the ingredient by name, or create it if it doesn't exist
#             ingredient = Ingredient.query.filter_by(
#                 name=ingredient_data['name']).first()

#             if not ingredient:
#                 ingredient = Ingredient(
#                     name=ingredient_data['name'],
#                     quantity=ingredient_data['quantity'])
#                 db.session.add(ingredient)
#                 print('Added ingredient: ', ingredient_data)
#             # Link the ingredient with the recipe
#             recipe.ingredients.append(ingredient)
#             ingredients.append(ingredient)

#         # commit the session after the loop
#         db.session.commit()
#         return [ingredient.to_dict() for ingredient in ingredients]
#     print('Form errors: ', form.errors)
#     return {"errors": form.errors}

@recipe_routes.route('/<int:recipe_id>/ingredients', methods=['POST'])
@login_required
def add_ingredient(recipe_id):
    data = request.json
    print('request.json:', data)

    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return {"error": "Recipe not found"}, 404

    ingredients = []
    for ingredient_data in data['ingredient']:
        print('Processing ingredient: ', ingredient_data)
        # Find the ingredient by name, or create it if it doesn't exist
        ingredient = Ingredient.query.filter_by(
            name=ingredient_data['name']).first()

        if not ingredient:
            ingredient = Ingredient(
                name=ingredient_data['name'],
                quantity=ingredient_data['quantity'])
            db.session.add(ingredient)
            print('Added ingredient: ', ingredient_data)
        # Link the ingredient with the recipe
        recipe.ingredients.append(ingredient)
        ingredients.append(ingredient)

    # commit the session after the loop
    db.session.commit()
    return [ingredient.to_dict() for ingredient in ingredients]


# @recipe_routes.route('/<int:recipe_id>/ingredients', methods=['POST'])
# # @csrf.exempt
# @login_required
# def add_ingredient(recipe_id):
#     print('COOKIE', request.cookies['csrf_token'])
#     form = IngredientForm()

#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         recipe = Recipe.query.get(recipe_id)

#         if not recipe:
#             return {"error": "Recipe not found"}, 404

#         ingredients = []

#         for ingredient_data in form.data['ingredients']:
#             # Find the ingredient by name, or create it if it doesn't exist
#             ingredient = Ingredient.query.filter_by(
#                 name=ingredient_data['name']).first()
#             if not ingredient:
#                 ingredient = Ingredient(
#                     name=ingredient_data['name'],
#                     quantity=ingredient_data['quantity'])
#                 db.session.add(ingredient)
#                 db.session.commit()

#             # Add the ingredient to the recipe
#             recipe.ingredients.append(ingredient)
#             ingredients.append(ingredient)

#         db.session.commit()

#         return [ingredient.to_dict() for ingredient in ingredients]

#     return {"errors": form.errors}


# Update an ingredient


@recipe_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['PUT'])
def update_ingredient(recipe_id, ingredient_id):
    form = IngredientForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        ingredient = Ingredient.query.get(ingredient_id)

        if not ingredient:
            return {"errors": "ingredient doesn't exist"}

        ingredient.name = form.data['name']
        ingredient.quantity = form.data['quantity']

        db.session.add(ingredient)
        db.session.commit()

        return ingredient.to_dict()

    return {"errors": form.errors}

# Delete an ingredient from a recipe


@recipe_routes.route('/<int:recipe_id>/ingredients/<int:ingredient_id>', methods=['DELETE'])
def remove_ingredient(recipe_id, ingredient_id):
    recipe = Recipe.query.get(recipe_id)
    ingredient = Ingredient.query.get(ingredient_id)

    if not recipe or not ingredient:
        return {"error": "Recipe or Ingredient not found"}, 404

    if ingredient in recipe.ingredients:
        recipe.ingredients.remove(ingredient)
        db.session.commit()

    return {'success': 'ingredient removed'}

# PREPARATION ROUTES


@recipe_routes.route('/<int:recipe_id>/preparations', methods=['GET'])
def get_preparations(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if recipe:
        return {"preparations": [preparation.to_dict() for preparation in recipe.preparations]}
    else:
        return {"errors": "recipe not found"}


@recipe_routes.route('/<int:recipe_id>/preparations', methods=['POST'])
@login_required
def add_preparation(recipe_id):
    data = request.json
    print('request.json:', data)

    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return {"error": "Recipe not found"}, 404

    preparations = []
    for preparation_data in data['preparations']:
        print('Processing prep: ', preparation_data)
        print('preppp', Preparation)
        # Find the ingredient by name, or create it if it doesn't exist
        preparation = Preparation.query.filter_by(
            step=preparation_data['step_number']).first()

        if not preparation:
            preparation = Preparation(
                step=preparation_data['step_number'],
                instruction=preparation_data['instruction'])
            db.session.add(preparation)
            print('Added preparation: ', preparation_data)
        # Link the preparation with the recipe
        recipe.preparations.append(preparation)
        preparations.append(preparation)

    # commit the session after the loop
    db.session.commit()
    return [preparation.to_dict() for preparation in preparations]


@recipe_routes.route('/<int:recipe_id>/preparations/<int:preparation_id>', methods=['DELETE'])
def remove_preparation(recipe_id, preparation_id):
    recipe = Recipe.query.get(recipe_id)
    preparation = Preparation.query.get(preparation_id)

    if not recipe or not preparation:
        return {"error": "Recipe or preparation not found"}, 404

    if preparation in recipe.preparations:
        recipe.preparations.remove(preparation)
        db.session.commit()

    return {'success': 'preparation removed'}


@recipe_routes.route('/<int:recipe_id>/preparations/<int:preparation_id>', methods=['PUT'])
def update_preparation(recipe_id, preparation_id):
    data = request.get_json()
    form = PreparationDataForm(data=data)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        preparation = preparation.query.get(preparation_id)

        if not preparation:
            return {"errors": "preparation doesn't exist"}

        preparation.step = form.data['step_number']
        preparation.instruction = form.data['instruction']

        db.session.add(preparation)
        db.session.commit()

        return preparation.to_dict()

    return {"errors": form.errors}

# COMMENTS ROUTES


@recipe_routes.route('/<int:recipe_id>/comments', methods=['GET'])
def get_comments(recipe_id):
    print("this is running")
    comments = RecipeComment.query.filter_by(recipe_id=recipe_id).all()
    print("COMMENTSSSSSS", comments)
    return {"comments": [comment.to_dict() for comment in comments]}
# @recipe_routes.route('/recipes/<int:recipe_id>/comments', methods=['POST'])
# @login_required
# def post_comment(recipe_id):
#     data = request.get_json()
#     recipe = Recipe.query.filter_by(recipe_id=recipe_id)
#     if recipe:
#         comment = RecipeComment(
#             text=data['text'], user_id=current_user.id, recipe_id=recipe_id)

#     # comment = RecipeComment(user_id=data['user_id'], recipe_id=data['recipe_id'],
#     #                         user_name=data['user_name'])
#     db.session.add(comment)
#     db.session.commit()
#     return jsonify(comment.to_dict()), 201


@recipe_routes.route('/<int:recipe_id>/comments', methods=['POST'])
@login_required
def post_comment(recipe_id):
    data = request.get_json()
    print('DATAAAA', data)
    recipe = Recipe.query.get(recipe_id)
    if recipe is None:
        return jsonify({'error': 'Recipe not found'}), 404
    comment = RecipeComment(
        comment=data['text'], user_id=current_user.id, user_name=data['user_name'], recipe_id=recipe_id)
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201


@recipe_routes.route('/<int:recipe_id>/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    data = request.get_json()
    comment = RecipeComment.query.get(comment_id)
    comment.is_public = data['is_public']
    db.session.commit()
    return jsonify(comment.to_dict())


@recipe_routes.route('/<int:recipe_id>/comments/<int:comment_id>', methods=['DELETE'])
# def delete_comment(recipe_id, comment_id):
#     # your code here
#     print('COMEOMOEMRE', id)
#     comment = RecipeComment.query.get(id)
#     db.session.delete(comment)
#     db.session.commit()
#     return jsonify({'message': 'deleted'})
def delete_comment(recipe_id, comment_id):
    print('COMEOMOEMRE', comment_id)
    comment = RecipeComment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'deleted'})


@recipe_routes.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    results = Recipe.query.filter(
        db.or_(
            Recipe.recipe_name.ilike(f'%{query}%'),
            Recipe.description.ilike(f'%{query}%'),
            Recipe.type.ilike(f'%{query}%')  # Include the type field in search
        )
    ).all()
    return {"recipes": [result.to_dict() for result in results]}
