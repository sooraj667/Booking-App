# Generated by Django 4.2.4 on 2023-10-19 04:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("beautician", "0028_alter_beautician_appointment_count"),
    ]

    operations = [
        migrations.AlterField(
            model_name="beautician",
            name="wallet_amount",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
