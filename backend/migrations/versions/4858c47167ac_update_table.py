"""update table

Revision ID: 4858c47167ac
Revises: 94ae88eed23c
Create Date: 2023-06-14 14:44:01.730654

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4858c47167ac'
down_revision = '94ae88eed23c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dataset', schema=None) as batch_op:
        batch_op.alter_column('tanggal',
               existing_type=sa.DATE(),
               type_=sa.DateTime(),
               existing_nullable=True)
        batch_op.drop_column('fk_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('dataset', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fk_id', mysql.BIGINT(display_width=20), autoincrement=False, nullable=False))
        batch_op.alter_column('tanggal',
               existing_type=sa.DateTime(),
               type_=sa.DATE(),
               existing_nullable=True)

    # ### end Alembic commands ###
