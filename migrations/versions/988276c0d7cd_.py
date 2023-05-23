"""empty message

Revision ID: 988276c0d7cd
Revises: b99e852cff02
Create Date: 2023-05-23 11:56:24.460978

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '988276c0d7cd'
down_revision = 'b99e852cff02'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ingredients',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('quantity', sa.String(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('preparations',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('step', sa.Integer(), nullable=False),
                    sa.Column('instruction', sa.String(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('recipes',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('recipe_name', sa.String(
                        length=255), nullable=False),
                    sa.Column('recipe_owner', sa.String(
                        length=255), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=True),
                    sa.Column('type', sa.String(length=50), nullable=False),
                    sa.Column('cook_time', sa.String(
                        length=50), nullable=False),
                    sa.Column('preview_img', sa.String(
                        length=255), nullable=True),
                    sa.Column('description', sa.String(
                        length=500), nullable=False),
                    sa.Column('created_at', sa.Date(), nullable=False),
                    sa.Column('updated_at', sa.Date(), nullable=False),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('recipe_ingredients',
                    sa.Column('ingredient_id', sa.Integer(), nullable=False),
                    sa.Column('recipe_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['ingredient_id'], ['ingredients.id'], ),
                    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
                    sa.PrimaryKeyConstraint('ingredient_id', 'recipe_id')
                    )
    op.create_table('recipe_preparations',
                    sa.Column('preparation_id', sa.Integer(), nullable=False),
                    sa.Column('recipe_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['preparation_id'], [
                                            'preparations.id'], ),
                    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], ),
                    sa.PrimaryKeyConstraint('preparation_id', 'recipe_id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipe_preparations')
    op.drop_table('recipe_ingredients')
    op.drop_table('recipes')
    op.drop_table('users')
    op.drop_table('preparations')
    op.drop_table('ingredients')
    # ### end Alembic commands ###
