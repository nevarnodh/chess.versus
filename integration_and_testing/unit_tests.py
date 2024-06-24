import unittest
from app import app, db
from models import User

class UserModelTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_user_creation(self):
        user = User(username='testuser', email='test@example.com')
        db.session.add(user)
        db.session.commit()
        self.assertEqual(user.username, 'testuser')

if __name__ == '__main__':
    unittest.main()

