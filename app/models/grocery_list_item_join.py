# from .db import db, environment, SCHEMA, add_prefix_for_prod

# grocery_list_item = db.Table(
#     'grocery_list_items',
#     db.Model.metadata,
#     db.Column("grocery_list_id", db.ForeignKey(
#         add_prefix_for_prod("grocery_lists.id")), primary_key=True),
#     db.Column("recipe_ingredient_id", db.ForeignKey(
#         add_prefix_for_prod("recipes.id")), primary_key=True),
# )

# if environment == 'production':
#     grocery_list_item.schema = SCHEMA
