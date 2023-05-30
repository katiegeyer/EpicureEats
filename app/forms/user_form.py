from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class UserDetailsForm(FlaskForm):
    # profile_pic = StringField('Profile Picture', validators=[DataRequired()])
    display_name = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
