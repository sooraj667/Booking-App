# Generated by Django 4.2.4 on 2023-10-19 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("beautician", "0032_alter_beautician_bio"),
    ]

    operations = [
        migrations.AlterField(
            model_name="beautician",
            name="bio",
            field=models.CharField(blank=True, default=" ", max_length=200, null=True),
        ),
    ]