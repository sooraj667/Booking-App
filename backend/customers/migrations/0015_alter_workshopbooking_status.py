# Generated by Django 4.2.4 on 2023-10-23 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("customers", "0014_alter_workshop_customers"),
    ]

    operations = [
        migrations.AlterField(
            model_name="workshopbooking",
            name="status",
            field=models.CharField(default="Confirmed", max_length=200),
        ),
    ]
