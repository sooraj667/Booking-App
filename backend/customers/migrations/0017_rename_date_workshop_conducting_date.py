# Generated by Django 4.2.4 on 2023-10-23 06:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("customers", "0016_alter_workshop_status"),
    ]

    operations = [
        migrations.RenameField(
            model_name="workshop",
            old_name="date",
            new_name="conducting_date",
        ),
    ]