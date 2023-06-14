"""update foreign key

Revision ID: fb89a79218b9
Revises: 8c178c223e7c
Create Date: 2023-06-14 15:32:44.756557

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb89a79218b9'
down_revision = '8c178c223e7c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dataset', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id_master', sa.BigInteger(), nullable=False))
        batch_op.create_foreign_key(None, 'master', ['id_master'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dataset', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('id_master')

    # ### end Alembic commands ###
