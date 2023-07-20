from django.contrib import admin
from .models import Shoe, BinVO

# Register your models here.
@admin.register(Shoe)
class HatAdmin(admin.ModelAdmin):
    list_display = (
    "manufacturer",
    "model_name",
    "color",
    "picture_url",
    "bin_location",
    )


@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    list_display = (
        "closet_name",
        "bin_number",
        "bin_size",
    )

