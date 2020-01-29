from django.test import TestCase
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError

class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', user_type='ST', phone_no='1234567890', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertEqual(user.user_type, 'ST')
        self.assertEqual(user.phone_no, '1234567890')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_admin)

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', password='foo', phone_no='1234567')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertEqual(admin_user.phone_no, '1234567')
        self.assertEqual(admin_user.user_type, 'AD')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_admin)
        

    def test_primary_key(self):
        User = get_user_model()
        try:
            admin_user = User.objects.create_superuser('super@user.com', password='foo', phone_no='1234567')
        except IntegrityError:
            self.assertRaises(IntegrityError)