# from .db import db, environment, SCHEMA, add_prefix_for_prod

# recipe_box_item = db.Table(
#     'recipe_box_items',
#     db.Model.metadata,
#     db.Column("recipe_box_id", db.ForeignKey(add_prefix_for_prod("recipe_boxes.id")), primary_key=True),
#     db.Column("recipe_id", db.ForeignKey(add_prefix_for_prod("recipes.id")), primary_key=True),
# )

# if environment == 'production':
#     recipe_box_item.schema = SCHEMA
