from datetime import datetime
from app.models import db, Recipe, environment, SCHEMA


def seed_recipes():

    recipes_data = [
        ('Apple Pie', 'John Doe', 'Vegetarian', 1.5,
         'https://littlespoonfarm.com/wp-content/uploads/2021/08/Homemade-Apple-Pie-Recipe-2-2.jpg'),
        ('Beef Stew', 'Jane Smith', 'Non-vegetarian', 2.0,
         'https://www.cookingclassy.com/wp-content/uploads/2021/10/beef-stew-30.jpg'),
        ('Vegan Curry', 'Alex Brown', 'Vegan', 1.0,
         'https://makeitdairyfree.com/wp-content/uploads/2022/09/easy-vegan-chickpea-curry-3.jpg'),
        ('Chicken Salad', 'Sam Wilson', 'Non-vegetarian', 0.5,
         'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/05/Chicken-Salad-3.jpg'),
        ('Lentil Soup', 'Sarah Johnson', 'Vegetarian', 1.5,
         'https://www.healthyseasonalrecipes.com/wp-content/uploads/2021/08/lentil-soup-sq-029.jpg'),
        ('Spinach Pasta', 'Oliver Queen', 'Vegan', 1.0,
         'https://www.connoisseurusveg.com/wp-content/uploads/2023/05/vegan-spinach-pasta-sq.jpg'),
        ('Grilled Salmon', 'Barry Allen',
         'Non-vegetarian', 1.0, 'https://www.dinneratthezoo.com/wp-content/uploads/2019/05/grilled-salmon-final-2.jpg'),
        ('Mushroom Risotto', 'Clark Kent',
         'Vegetarian', 2.0, 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto.jpg'),
        ('Pumpkin Pie', 'Peter Parker', 'Vegan', 1.5,
         'https://www.recipetineats.com/wp-content/uploads/2019/11/Pumpkin-Pie_2.jpg'),
        ('Beetroot Salad', 'Bruce Wayne', 'Vegetarian', 0.5,
         'https://www.wellplated.com/wp-content/uploads/2021/11/Simple-Beet-Salad.jpg'),
        ('Pesto Pasta', 'Natasha Romanoff', 'Vegan', 1.0,
         'https://www.nospoonnecessary.com/wp-content/uploads/2016/04/Arugula-Pesto-Pasta-671.jpg'),
        ('Lemon Chicken', 'Tony Stark', 'Non-vegetarian', 1.5,
         'https://therecipecritic.com/wp-content/uploads/2017/04/greeklemonchicken.jpg'),
        ('Potato Soup', 'Steve Rogers', 'Vegetarian', 1.0,
         'https://wholefoodsoulfoodkitchen.com/wp-content/uploads/2022/10/vegetarian-potato-soup.jpg'),
        ('Ratatouille', 'Wanda Maximoff', 'Vegan', 2.0,
         'https://www.vibrantplate.com/wp-content/uploads/2022/07/Homemade-Classic-French-Ratatouille-02-735x1103.jpg'),
        ('Hamburgers', 'Peter Quill', 'Non-vegetarian', 1.0,
         'https://bestbeefrecipes.com/wp-content/uploads/2022/06/loaded-burgers-featured.jpg'),
    ]

    for recipe_name, recipe_owner, type, cook_time, preview_img in recipes_data:
        recipe = Recipe(
            recipe_name=recipe_name,
            recipe_owner=recipe_owner,
            user_id=1,  
            type=type,
            cook_time=cook_time,
            preview_img=preview_img,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(recipe)

    # Commit the changes
    db.session.commit()


# Call the function to seed the data
seed_recipes()


def seed_more_recipes():

    more_recipes_data = [
        ('Tomato Soup', 'James Bond', 'Vegetarian', 1.0,
         'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg'),
        ('Lamb Chops', 'Sherlock Holmes', 'Non-vegetarian', 2.0,
         'https://cafedelites.com/wp-content/uploads/2018/02/Lamb-Chops-ONE-1.jpg'),
        ('Quinoa Salad', 'Hermione Granger', 'Vegan', 0.5,
         'https://www.cookingclassy.com/wp-content/uploads/2020/01/quinoa-salad-16.jpg'),
        ('Shrimp Paella', 'Bilbo Baggins',
         'Non-vegetarian', 2.5, 'https://assets.bonappetit.com/photos/57acce0453e63daf11a4da2b/master/w_1620,h_1080,c_limit/PAELLA.jpg'),
        ('Vegetable Stir Fry', 'Frodo Baggins', 'Vegan', 1.0,
         'https://www.forkinthekitchen.com/wp-content/uploads/2022/01/220113.veggie.stir_.fry-0308.jpg'),
        ('BBQ Chicken', 'Harry Potter', 'Non-vegetarian', 1.5,
         'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2022/06/BBQ-Chicken-main-1.jpg'),
        ('Pumpkin Soup', 'Ron Weasley', 'Vegan', 1.0,
         'https://img.delicious.com.au/0Hfc6oZG/w1200/del/2017/03/creamy-pumpkin-soup-43936-2.jpg'),
        ('Lemon Tart', 'Arya Stark', 'Vegetarian', 2.0,
         'https://livingthegourmet.com/wp-content/uploads/2018/09/French_Lemon_Tart_4.jpg'),
        ('Eggplant Parmesan', 'Jon Snow', 'Vegetarian', 2.5,
         'https://www.onceuponachef.com/images/2022/09/eggplant-parmesan.jpg'),
        ('Mango Smoothie', 'Daenerys Targaryen',
         'Vegan', 0.5, 'https://joyfoodsunshine.com/wp-content/uploads/2020/01/mango-smoothie-recipe-4.jpg'),
        ('Grilled Steak', 'Tyrion Lannister',
         'Non-vegetarian', 1.5, 'https://playswellwithbutter.com/wp-content/uploads/2022/05/Perfect-Grilled-Steak-Butter-Basted-with-Herb-Brush-26.jpg'),
        ('Potato Gratin', 'Sansa Stark', 'Vegetarian', 1.5,
         'https://assets.bonappetit.com/photos/57acd8a31b3340441497524d/1:1/w_3024,h_3024,c_limit/classic-potato-gratin.jpg'),
        ('Chocolate Brownies', 'Bran Stark',
         'Vegan', 1.0, 'https://www.recipetineats.com/wp-content/uploads/2020/03/Brownies_0-SQ.jpg'),
        ('Lobster Bisque', 'Jaime Lannister',
         'Non-vegetarian', 2.0, 'https://selfproclaimedfoodie.com/wp-content/uploads/lobster-bisque-square-2.jpg'),
        ('Falafel Pita', 'Cersei Lannister', 'Vegan', 1.0,
         'https://joyfoodsunshine.com/wp-content/uploads/2016/05/baked-falafel-recipe-square-2.jpg'),
    ]

    for recipe_name, recipe_owner, type, cook_time, preview_img in more_recipes_data:
        recipe = Recipe(
            recipe_name=recipe_name,
            recipe_owner=recipe_owner,
            user_id=2,  # assigning all recipes to a user with id 2
            type=type,
            cook_time=cook_time,
            preview_img=preview_img,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(recipe)

    # Commit the changes
    db.session.commit()


# Call the function to seed the data
seed_more_recipes()
