# Generated by Django 3.0.3 on 2020-04-11 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='BodyMeta',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]