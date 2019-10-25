from database import DataBase


# user default seed
username = 'admin'
password = ''
email = username + '@yourdomain.com'


def create_default_user(db: DataBase):
    db.cursor.execute("SELECT * FROM user")
    users = db.cursor.fetchall()
    if not users or len(users) < 1:
        db.cursor.execute("INSERT INTO user(username, password, email, admin) VALUES (%s, %s, %s, 1)", (
            username, password, email
        ))
        db.conn.commit()


# about default seed
about_content = '{"ops":[{"insert":"Insert your about information here, any thing you want. You also can edit this about in admin dashboard"}]}'


def create_default_blog_about(db: DataBase):
    db.cursor.execute("SELECT * FROM about")
    abouts = db.cursor.fetchall()
    if not abouts or len(abouts) < 1:
        db.cursor.execute("INSERT INTO about(content) VALUES (%s)", about_content)
        db.conn.commit()


# category default seed
category = 'New Category'
icon = 'Add'


def create_default_category(db: DataBase):
    db.cursor.execute("SELECT * FROM category")
    categories = db.cursor.fetchall()
    if not categories or len(categories) < 1:
        db.cursor.execute("INSERT INTO category(label, icon) VALUES (%s,%s)", category, icon)
        db.conn.commit()