# Generated by Django 4.2.4 on 2023-09-12 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("customers", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="customer",
            name="image",
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]
