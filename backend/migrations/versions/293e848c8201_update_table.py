"""update table

Revision ID: 293e848c8201
Revises: 4858c47167ac
Create Date: 2023-06-14 14:46:55.374329

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '293e848c8201'
down_revision = '4858c47167ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dataset',
    sa.Column('id', sa.BigInteger(), autoincrement=True, nullable=False),
    sa.Column('no', sa.String(length=255), nullable=True),
    sa.Column('tanggal', sa.DateTime(), nullable=True),
    sa.Column('jenis_donasi', sa.String(length=255), nullable=True),
    sa.Column('jumlah_donasi', sa.BigInteger(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('dataset')
    # ### end Alembic commands ###
