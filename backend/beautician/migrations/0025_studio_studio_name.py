# Generated by Django 4.2.4 on 2023-10-16 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("beautician", "0024_beautician_wallet_amount"),
    ]

    operations = [
        migrations.AddField(
            model_name="studio",
            name="studio_name",
            field=models.CharField(default=1, max_length=200),
            preserve_default=False,
        ),
    ]
