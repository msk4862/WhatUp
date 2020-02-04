from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class MyUserManager(BaseUserManager):
    def create_user(self, email, user_type, phone_no,firstname='', lastname='', password=None):
        """
        Creates and saves a User with the given field
        """
        print('called')
        if not email:
            raise ValueError('Users must have an email address')
        if not user_type:
            raise ValueError('Users must have an user type')

        user = self.model(
            email=self.normalize_email(email),
            user_type=user_type,
            firstname=firstname,
            lastname=lastname,
            phone_no=phone_no,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, user_type='AD'):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email=email,
            password=password,
            phone_no='1234567890',
            user_type=user_type,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    USER_TYPE = (
        ('ST', 'Student'),
        ('TE', 'Teacher'),
        ('AG', 'Agent'),
        ('AD', 'Admin'),
    )

    email               = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    phone_no            = models.CharField(max_length=15)
    firstname           = models.CharField(max_length = 20)
    lastname            = models.CharField(max_length = 20)
    user_type           = models.CharField(max_length = 2, choices=USER_TYPE)
    date_joined         = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login          = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_active           = models.BooleanField(default=True)
    is_admin            = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type', 'phone_no',]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Student(models.Model):
    StudentID = models.OneToOneField(MyUser, on_delete=models.CASCADE, primary_key=True)
    GroupID = models.CharField(max_length = 50)
    SubscriptionID = models.CharField(max_length = 50)
