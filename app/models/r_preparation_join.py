from .db import db, environment, SCHEMA, add_prefix_for_prod

recipe_preparation = db.Table(
    'recipe_preparations',
    db.Model.metadata,
    db.Column("preparation_id", db.ForeignKey(add_prefix_for_prod("preparations.id")), primary_key=True),
    db.Column("recipe_id", db.ForeignKey(add_prefix_for_prod("recipes.id")), primary_key=True),
)

if environment == 'production':
    recipe_preparation.schema = SCHEMA
