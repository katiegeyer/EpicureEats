from flask_wtf import FlaskForm
from wtforms import StringField, FormField, FieldList
from wtforms.validators import DataRequired


class IngredientForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    quantity = StringField('quantity')  # optional; adjust as needed
