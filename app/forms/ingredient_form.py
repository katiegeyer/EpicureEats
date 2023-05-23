# from flask_wtf import FlaskForm
# from wtforms import StringField, FloatField, IntegerField, TextAreaField, SubmitField, BooleanField, SelectField, DateField
# from wtforms.validators import DataRequired
# from app.models import ingredient


# class IngredientForm(FlaskForm):
#     name = StringField("Ingredient Name", validators=[DataRequired()])
#     quantity = StringField("Quantity", validators=[DataRequired()])
#     submit = SubmitField("Submit")

from flask_wtf import FlaskForm
from wtforms import StringField, FieldList, FormField
from wtforms.validators import DataRequired


class IngredientDataForm(FlaskForm):
    class Meta:
        csrf = False

    name = StringField('Name', validators=[DataRequired()])
    print('name', name)
    quantity = StringField('Quantity', validators=[DataRequired()])
    print('quantity', quantity)


class IngredientForm(FlaskForm):
    # class Meta:
    #     csrf = False
    ingredients = FieldList(FormField(IngredientDataForm), min_entries=1)
    print('ingredient form', ingredients)
