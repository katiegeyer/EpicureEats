from datetime import datetime
from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


def seed_recipes():

    recipes_data = [
        ('Apple Pie', 'John Doe', 'Vegetarian', '1.5 hours',
         'https://littlespoonfarm.com/wp-content/uploads/2021/08/Homemade-Apple-Pie-Recipe-2-2.jpg', "There's nothing quite like the intoxicating aroma of a freshly baked apple pie wafting through the kitchen, instantly evoking memories of crisp autumn days, cozy gatherings, and the warmth of home. The quintessential American dessert, apple pie has long held a special place in our culinary heritage. With its buttery crust, tender apples, and fragrant spices, it's a true celebration of seasonal flavors and comforting indulgence. Join us on this culinary journey as we explore the art of crafting the perfect apple pie."),
        ('Beef Stew', 'Jane Smith', 'Non-vegetarian', '2 hours',
         'https://www.cookingclassy.com/wp-content/uploads/2021/10/beef-stew-30.jpg', "As the weather turns colder and the leaves paint the landscape with vibrant hues, there's no better time to cozy up with a bowl of steaming beef stew. This beloved comfort food has graced tables for generations, offering a hearty and satisfying meal that warms both body and soul. With tender chunks of beef, an array of robust vegetables, and a flavorful broth that simmers for hours, homemade beef stew is the epitome of slow-cooked perfection. Join us as we embark on a culinary journey to unlock the secrets of crafting a beef stew that will captivate your taste buds and leave you longing for more."),
        ('Vegan Curry', 'Alex Brown', 'Vegan', '1 hour',
         'https://makeitdairyfree.com/wp-content/uploads/2022/09/easy-vegan-chickpea-curry-3.jpg', "In a world where culinary exploration knows no boundaries, vegan curry emerges as a captivating symphony of plant-based ingredients that delight the senses and nourish the body. Drawing inspiration from diverse cultures and a kaleidoscope of spices, vegan curry embraces the ethos of compassionate eating while showcasing the infinite possibilities of a plant-powered palate. Join us on a culinary journey as we unlock the secrets of crafting a vegan curry that captivates with its vibrant colors, robust flavors, and harmonious medley of ingredients."),
        ('Chicken Salad', 'Sam Wilson', 'Non-vegetarian', '30 minutes',
         'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/05/Chicken-Salad-3.jpg', "When it comes to classic salads, few can rival the timeless charm and versatility of chicken salad. With its tender chunks of seasoned chicken, crisp vegetables, and a creamy dressing that ties it all together, chicken salad has become a beloved staple in kitchens and picnics alike. Whether enjoyed on its own, sandwiched between two slices of fresh bread, or nestled atop a bed of greens, this refreshing creation is a celebration of flavors, textures, and endless possibilities. Join us on a culinary adventure as we explore the art of crafting the perfect chicken salad."),
        ('Lentil Soup', 'Sarah Johnson', 'Vegetarian', '1 hour 30 minutes',
         'https://www.healthyseasonalrecipes.com/wp-content/uploads/2021/08/lentil-soup-sq-029.jpg', "In the realm of comforting and nourishing soups, lentil soup reigns supreme. With its humble origins and rich history spanning across cultures, this hearty dish has stood the test of time, offering solace in a bowl during colder months or any time a wholesome and satisfying meal is desired. Bursting with earthy flavors, a velvety texture, and a medley of aromatic spices, lentil soup embodies the essence of comfort and nourishment. Join us as we embark on a culinary journey to discover the heartwarming allure of lentil soup."),
        ('Spinach Pasta', 'Oliver Queen', 'Vegan', '1 hour',
         'https://www.connoisseurusveg.com/wp-content/uploads/2023/05/vegan-spinach-pasta-sq.jpg', "Spinach pasta, a verdant marvel of Italian cuisine, presents a tantalizing fusion of vibrant colors, delicate flavors, and wholesome ingredients. The marriage of tender pasta and vibrant spinach creates a harmonious canvas upon which countless culinary creations can flourish. From the simplicity of a light garlic-infused olive oil dressing to the complexity of a creamy sauce bursting with herbs and spices, spinach pasta offers endless possibilities to please both the palate and the eye. Join us on this culinary escapade as we delve into the delightful world of spinach pasta, where freshness meets elegance."),
        ('Grilled Salmon', 'Barry Allen',
         'Non-vegetarian', '1 hour', 'https://www.dinneratthezoo.com/wp-content/uploads/2019/05/grilled-salmon-final-2.jpg', "Grilled salmon, a pinnacle of seafood mastery, beckons food enthusiasts with its succulent flesh, delicate flavors, and enticing smoky aroma. Whether enjoyed as a centerpiece to an elegant dinner or a casual backyard gathering, grilled salmon captivates the senses with its exquisite texture and the interplay of flavors that dance upon the palate. Join us as we embark on a culinary journey to explore the art of grilling salmon to perfection, celebrating its natural richness and transforming it into a symphony of taste."),
        ('Mushroom Risotto', 'Clark Kent',
         'Vegetarian', '2 hours', 'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto.jpg', "Mushroom risotto, a timeless Italian classic, epitomizes comfort and elegance in a single dish. This indulgent creation seamlessly blends the earthy flavors of mushrooms with the luxurious creaminess of Arborio rice, resulting in a symphony of taste and texture that captivates both the palate and the soul. Join us as we delve into the art of crafting the perfect mushroom risotto, where every spoonful delights with its velvety consistency, umami richness, and the irresistible allure of aromatic mushrooms."),
        ('Pumpkin Pie', 'Peter Parker', 'Vegan', '1 hour 30 minutes',
         'https://www.recipetineats.com/wp-content/uploads/2019/11/Pumpkin-Pie_2.jpg', "Pumpkin pie, the epitome of fall's culinary splendor, is a treasured delight that evokes memories of cozy gatherings, crackling fires, and the vibrant hues of autumn. As the air turns crisp and the leaves paint the landscape with hues of gold and amber, the allure of this classic dessert becomes irresistible. With its velvety pumpkin filling, fragrant spices, and a buttery crust that cradles the essence of the season, pumpkin pie is a cherished tradition that embodies the comforting embrace of homemade goodness. Join us as we embark on a culinary journey to unlock the secrets of crafting the perfect pumpkin pie."),
        ('Beetroot Salad', 'Bruce Wayne', 'Vegetarian', '30 minutes',
         'https://www.wellplated.com/wp-content/uploads/2021/11/Simple-Beet-Salad.jpg', "Beetroot salad, a vibrant and refreshing medley of flavors and textures, celebrates the natural beauty and earthy sweetness of this versatile root vegetable. With its stunning hues ranging from deep red to golden yellow, beetroot lends an artistic touch to any salad. Whether served as a refreshing side dish or a light meal on its own, beetroot salad showcases the harmonious fusion of earthiness, sweetness, and a refreshing crunch. Join us as we explore the art of crafting a beetroot salad that will entice both the eyes and the taste buds, celebrating the natural goodness and versatility of this humble vegetable."),
        ('Pesto Pasta', 'Natasha Romanoff', 'Vegan', '1 hour',
         'https://www.nospoonnecessary.com/wp-content/uploads/2016/04/Arugula-Pesto-Pasta-671.jpg', "Pesto pasta, a culinary masterpiece hailing from the sun-drenched hills of Italy, is a celebration of vibrant flavors, fragrant herbs, and the sheer joy of a perfectly cooked pasta. This classic dish intertwines the lush greenness of fresh basil, the creaminess of pine nuts, the sharpness of garlic, and the richness of Parmesan cheese into a velvety sauce that coats each strand of pasta, transporting your taste buds to new heights of delight. Join us on a gastronomic journey as we explore the art of crafting the ultimate pesto pasta, where every forkful reveals a burst of Mediterranean goodness."),
        ('Lemon Chicken', 'Tony Stark', 'Non-vegetarian', '1 hour and 30 minutes',
         'https://therecipecritic.com/wp-content/uploads/2017/04/greeklemonchicken.jpg', "Lemon chicken, a tantalizing culinary creation, showcases the harmonious marriage of succulent poultry and the vibrant zing of citrus. With its tangy and refreshing flavors, lemon chicken transforms a humble ingredient into a symphony of taste that delights the senses. From tender and juicy meat to the bright and invigorating essence of lemons, this dish exemplifies the art of balancing flavors, delivering a culinary experience that is both comforting and refreshing. Join us as we embark on a culinary journey to uncover the secrets of crafting the perfect lemon chicken, where each bite unveils a burst of zest and satisfaction."),
        ('Potato Soup', 'Steve Rogers', 'Vegetarian', '1 hour',
         'https://wholefoodsoulfoodkitchen.com/wp-content/uploads/2022/10/vegetarian-potato-soup.jpg', "Lemon chicken, a tantalizing culinary creation, showcases the harmonious marriage of succulent poultry and the vibrant zing of citrus. With its tangy and refreshing flavors, lemon chicken transforms a humble ingredient into a symphony of taste that delights the senses. From tender and juicy meat to the bright and invigorating essence of lemons, this dish exemplifies the art of balancing flavors, delivering a culinary experience that is both comforting and refreshing. Join us as we embark on a culinary journey to uncover the secrets of crafting the perfect lemon chicken, where each bite unveils a burst of zest and satisfaction."),
        ('Ratatouille', 'Wanda Maximoff', 'Vegan', '2 hours',
         'https://www.vibrantplate.com/wp-content/uploads/2022/07/Homemade-Classic-French-Ratatouille-02-735x1103.jpg', "Ratatouille, a beloved dish hailing from the sun-drenched shores of the Mediterranean, is a celebration of vibrant flavors and the bountiful harvest of seasonal vegetables. With its harmonious blend of eggplant, zucchini, bell peppers, tomatoes, and aromatic herbs, ratatouille embodies the essence of rustic simplicity and wholesome abundance. This vegetable medley, slow-cooked to perfection, transports us to a world of sun-soaked gardens and the aromas of a bustling Provencal kitchen. Join us as we embark on a culinary adventure to explore the art of crafting the quintessential ratatouille, where each bite unveils a tapestry of Mediterranean delights."),
        ('Hamburgers', 'Peter Quill', 'Non-vegetarian', '1 hour',
         'https://bestbeefrecipes.com/wp-content/uploads/2022/06/loaded-burgers-featured.jpg', "Hamburgers, an iconic culinary delight that has captivated taste buds for generations, evoke images of sizzling grills, backyard gatherings, and the unmistakable aroma of grilled meat. With their juicy patties, pillowy buns, and endless possibilities for customization, hamburgers have become a beloved symbol of indulgence and satisfaction. Whether enjoyed with classic toppings or adorned with gourmet ingredients, the allure of a well-crafted hamburger is undeniable. Join us on a culinary journey as we delve into the art of creating the perfect hamburger, where each bite promises a harmonious blend of flavors and a gratifying experience for the senses."),
    ]

    for recipe_name, recipe_owner, type, cook_time, preview_img, description in recipes_data:
        recipe = Recipe(
            recipe_name=recipe_name,
            recipe_owner=recipe_owner,
            user_id=1,
            type=type,
            cook_time=cook_time,
            preview_img=preview_img,
            description=description,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(recipe)

    # Commit the changes
    db.session.commit()


# Call the function to seed the data
# seed_recipes()

def undo_recipes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()


def seed_more_recipes():

    more_recipes_data = [
        ('Tomato Soup', 'James Bond', 'Vegetarian', 1.0,
         'https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg', "Tomato soup, a timeless comfort food, holds a special place in our culinary hearts, offering a taste of nostalgia and the promise of warmth on a chilly day. With its vibrant color, velvety texture, and the familiar tang of ripe tomatoes, this classic soup embodies the essence of comfort and simplicity. Whether enjoyed as a soothing starter or a satisfying meal on its own, tomato soup enchants the palate with its rich flavors and the comforting embrace of its silky texture. Join us as we embark on a culinary journey to uncover the secrets of crafting the perfect tomato soup, where each spoonful unveils a symphony of warmth and satisfaction."),
        ('Lamb Chops', 'Sherlock Holmes', 'Non-vegetarian', 2.0,
         'https://cafedelites.com/wp-content/uploads/2018/02/Lamb-Chops-ONE-1.jpg', "Lamb chops, a culinary indulgence renowned for their tender meat and distinctive flavors, captivate the senses with their succulent juiciness and exquisite tenderness. This exceptional cut of meat embodies the perfect balance of richness and delicate refinement, making it a true delight for the discerning palate. Whether grilled, roasted, or pan-seared to perfection, lamb chops offer a luxurious dining experience that celebrates the inherent flavors of the meat. Join us as we embark on a culinary adventure to explore the art of crafting the ultimate lamb chops, where each bite unveils a succulent symphony of taste and texture."),
        ('Quinoa Salad', 'Hermione Granger', 'Vegan', 0.5,
         'https://www.cookingclassy.com/wp-content/uploads/2020/01/quinoa-salad-16.jpg', "Quinoa salad, a nutritional powerhouse and a celebration of wholesome ingredients, offers a delightful medley of flavors, textures, and vibrant colors. With its nutty taste and delicate yet satisfying crunch, quinoa serves as the perfect canvas for a myriad of ingredients, creating a salad that is both nutritious and indulgent. Bursting with fresh vegetables, protein-rich legumes, and a symphony of aromatic herbs, quinoa salad embraces the beauty of simplicity and nourishment. Join us as we embark on a culinary journey to uncover the secrets of crafting the perfect quinoa salad, where each bite brings a harmonious blend of flavors and a vibrant dose of wellness."),
        ('Shrimp Paella', 'Bilbo Baggins',
         'Non-vegetarian', 2.5, 'https://assets.bonappetit.com/photos/57acce0453e63daf11a4da2b/master/w_1620,h_1080,c_limit/PAELLA.jpg', "Shrimp paella, a culinary gem from the coastal regions of Spain, transports us to sun-soaked shores with its vibrant colors, bold flavors, and the unmistakable aroma of saffron-infused rice. This iconic dish, steeped in tradition and coastal influences, showcases the natural sweetness of succulent shrimp, harmonizing with an exquisite combination of vegetables, spices, and aromatic herbs. Join us on a gastronomic journey as we delve into the art of crafting the perfect shrimp paella, where each spoonful offers a taste of coastal paradise and a symphony of flavors."),
        ('Vegetable Stir Fry', 'Frodo Baggins', 'Vegan', 1.0,
         'https://www.forkinthekitchen.com/wp-content/uploads/2022/01/220113.veggie.stir_.fry-0308.jpg', "Vegetable stir-fry, a celebration of freshness and vibrant flavors, invites us to savor a rainbow of crisp vegetables, tender textures, and a symphony of aromatic seasonings. This versatile dish, originating from the culinary traditions of Asia, captures the essence of balance, harmony, and nourishment. With its quick cooking time and endless variations, vegetable stir-fry offers a delightful canvas for creativity in the kitchen. Join us as we explore the art of crafting the perfect vegetable stir-fry, where each bite bursts with a harmonious blend of colors, textures, and fragrant flavors."),
        ('BBQ Chicken', 'Harry Potter', 'Non-vegetarian', 1.5,
         'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2022/06/BBQ-Chicken-main-1.jpg', "BBQ chicken, a culinary masterpiece that epitomizes summertime gatherings and backyard feasts, delights taste buds with its smoky aroma and irresistible tang. This beloved dish showcases the perfect balance of tender chicken, a mouthwatering BBQ sauce, and the enticing charred flavors that only grilling can impart. Whether enjoyed at a casual cookout, a family picnic, or a weekend get-together, BBQ chicken is a timeless favorite that brings people together over its lip-smacking deliciousness. Join us as we explore the art of grilling the perfect BBQ chicken, where each bite ignites a symphony of smoky, tangy flavors."),
        ('Pumpkin Soup', 'Ron Weasley', 'Vegan', 1.0,
         'https://img.delicious.com.au/0Hfc6oZG/w1200/del/2017/03/creamy-pumpkin-soup-43936-2.jpg', "Pumpkin soup, a quintessential autumn delight, embraces the essence of the season with its velvety texture, warm flavors, and comforting aromas. This soul-warming soup captures the earthy sweetness of pumpkin and infuses it with a symphony of aromatic spices, creating a bowl of pure comfort. Whether enjoyed as a cozy starter or a comforting meal on a chilly day, pumpkin soup takes us on a culinary journey through the bountiful flavors of fall. Join us as we explore the art of crafting the perfect pumpkin soup, where each spoonful immerses you in a comforting embrace of autumn's bounty."),
        ('Lemon Tart', 'Arya Stark', 'Vegetarian', 2.0,
         'https://livingthegourmet.com/wp-content/uploads/2018/09/French_Lemon_Tart_4.jpg', "Lemon tart, a timeless dessert that epitomizes elegance and zest, transports us to a world of sunny indulgence with its vibrant flavors and delicate textures. This culinary masterpiece harmonizes the brightness of fresh lemons with the buttery embrace of a flaky crust, creating a symphony of tangy sweetness that dances on the taste buds. Whether enjoyed as a light finale to a memorable meal or as a delightful treat on any occasion, lemon tart is a celebration of simplicity and sophistication. Join us on a culinary journey as we explore the art of crafting the perfect lemon tart, where each bite offers a burst of citrusy bliss."),
        ('Eggplant Parmesan', 'Jon Snow', 'Vegetarian', 2.5,
         'https://www.onceuponachef.com/images/2022/09/eggplant-parmesan.jpg', "Eggplant Parmesan, a beloved vegetarian dish that showcases the versatility of eggplant, captures the heart and palate with its layers of flavor and irresistible cheesy goodness. This Italian classic takes humble eggplant slices, lightly breaded and fried to perfection, and layers them with a robust tomato sauce and melty cheese. The result is a dish that marries the earthiness of eggplant with the tanginess of tomatoes and the richness of melted cheese. Join us as we embark on a culinary adventure to uncover the secrets of crafting the perfect eggplant Parmesan, where each bite offers a symphony of textures and flavors that will leave you craving more."),
        ('Mango Smoothie', 'Daenerys Targaryen',
         'Vegan', 0.5, 'https://joyfoodsunshine.com/wp-content/uploads/2020/01/mango-smoothie-recipe-4.jpg', "Mango smoothie, a tropical delight that transports us to sun-soaked beaches and exotic landscapes, captures the essence of summer with its luscious sweetness and refreshing qualities. This vibrant beverage celebrates the succulent flavors of ripe mangoes, blending them with creamy textures and a hint of tanginess for a truly delightful experience. Whether enjoyed as a refreshing breakfast, a revitalizing snack, or a cooling treat on a hot day, mango smoothie offers a burst of tropical goodness that will leave you feeling invigorated. Join us on a tantalizing journey as we explore the art of crafting the perfect mango smoothie, where each sip transports you to paradise."),
        ('Grilled Steak', 'Tyrion Lannister',
         'Non-vegetarian', 1.5, 'https://playswellwithbutter.com/wp-content/uploads/2022/05/Perfect-Grilled-Steak-Butter-Basted-with-Herb-Brush-26.jpg', "Grilled steak, a culinary marvel that ignites the taste buds and evokes images of sizzling grills and smoky barbecues, is a carnivorous delight that showcases the art of cooking meat to juicy perfection. This beloved dish tantalizes with its robust flavors, succulent textures, and the irresistible aroma of seared perfection. Whether enjoyed as the centerpiece of a hearty feast or a special treat, grilled steak promises a sensory experience that leaves an indelible mark. Join us as we delve into the world of grilling steak, uncovering the secrets to achieving mouthwatering results and relishing the charred indulgence that awaits."),
        ('Potato Gratin', 'Sansa Stark', 'Vegetarian', 1.5,
         'https://assets.bonappetit.com/photos/57acd8a31b3340441497524d/1:1/w_3024,h_3024,c_limit/classic-potato-gratin.jpg', "Potato gratin, a timeless comfort dish that epitomizes richness and indulgence, transports us to a world of creamy delight with its layers of tender potatoes, velvety cream, and golden melted cheese. This culinary masterpiece harmonizes the humble potato with the luxurious embrace of cream and cheese, creating a symphony of flavors and textures that awaken the senses. Whether enjoyed as a comforting side dish or a show-stopping main course, potato gratin enchants with its golden crust, velvety layers, and the sheer decadence that it brings to any table. Join us as we embark on a culinary journey to uncover the secrets of crafting the perfect potato gratin, where each bite offers a creamy, comforting sensation that warms both heart and soul."),
        ('Chocolate Brownies', 'Bran Stark',
         'Vegan', 1.0, 'https://www.recipetineats.com/wp-content/uploads/2020/03/Brownies_0-SQ.jpg', "Chocolate brownies, the epitome of indulgence and comfort, beckon dessert lovers with their irresistible aroma and fudgy texture. These delectable treats are the perfect embodiment of chocolatey goodness, boasting a rich, melt-in-your-mouth experience that leaves a lasting impression. Whether enjoyed with a cup of coffee, as a sweet finale to a meal, or as a pick-me-up during a cozy afternoon, chocolate brownies offer a little slice of heaven that satisfies even the most discerning sweet tooth. Join us on a delightful journey as we explore the art of crafting the perfect chocolate brownies, where each bite reveals a symphony of rich, chocolaty bliss."),
        ('Lobster Bisque', 'Jaime Lannister',
         'Non-vegetarian', 2.0, 'https://selfproclaimedfoodie.com/wp-content/uploads/lobster-bisque-square-2.jpg', "Lobster bisque, a culinary masterpiece that exudes sophistication and indulgence, captures the essence of seafood elegance with its rich flavors and silky textures. This luxurious soup combines the sweet, delicate meat of lobster with a velvety base of cream, aromatic herbs, and a touch of sherry or brandy, creating a symphony of flavors that enchants the palate. Whether enjoyed as an appetizer or a show-stopping centerpiece, lobster bisque is a celebration of fine dining and the ocean's bounty. Join us on a culinary journey as we explore the art of crafting the perfect lobster bisque, where each spoonful offers a taste of pure decadence and culinary finesse."),
        ('Falafel Pita', 'Cersei Lannister', 'Vegan', 1.0,
         'https://joyfoodsunshine.com/wp-content/uploads/2016/05/baked-falafel-recipe-square-2.jpg', "Falafel pita, a beloved staple of Mediterranean cuisine, invites us to indulge in the vibrant flavors and textures of this Middle Eastern delight. With its crispy, herb-infused falafel patties nestled in warm and pillowy pita bread, this handheld creation offers a perfect balance of savory and fresh elements. Bursting with aromatic spices, tangy sauces, and an array of colorful toppings, falafel pita showcases the art of combining wholesome ingredients into a delicious and satisfying meal. Join us as we explore the art of crafting the perfect falafel pita, where each bite brings a symphony of Mediterranean delights."),
    ]

    for recipe_name, recipe_owner, type, cook_time, preview_img, description in more_recipes_data:
        recipe = Recipe(
            recipe_name=recipe_name,
            recipe_owner=recipe_owner,
            user_id=2,  # assigning all recipes to a user with id 2
            type=type,
            cook_time=cook_time,
            preview_img=preview_img,
            description=description,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(recipe)

    # Commit the changes
    db.session.commit()


# Call the function to seed the data
# seed_more_recipes()

def undo_more_recipes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))

    db.session.commit()
