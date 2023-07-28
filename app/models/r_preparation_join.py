# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy import PrimaryKeyConstraint

# recipe_preparation = db.Table(
#     'recipe_preparations',
#     db.Model.metadata,
#     db.Column("preparation_id", db.ForeignKey(
#         add_prefix_for_prod("preparations.id")), primary_key=True),
#     db.Column("recipe_id", db.ForeignKey(
#         add_prefix_for_prod("recipes.id")), primary_key=True),
#     db.Column("step", db.Integer, nullable=False),  # new step column
#     # unique constraint
#     PrimaryKeyConstraint('recipe_id', 'step', name='recipe_step_pk'),
# )

# if environment == 'production':
#     recipe_preparation.schema = SCHEMA
