"""empty message

Revision ID: 988276c0d7cd
Revises: 02d721e971f7
Create Date: 2023-05-23 11:19:54.613777

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '988276c0d7cd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('recipes', sa.Column('description', sa.String))


def downgrade():
    op.drop_column('recipes', 'description')
