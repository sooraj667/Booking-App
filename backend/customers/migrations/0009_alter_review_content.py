# Generated by Django 4.2.4 on 2023-10-14 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("customers", "0008_review"),
    ]

    operations = [
        migrations.AlterField(
            model_name="review",
            name="content",
            field=models.CharField(max_length=200),
        ),
    ]