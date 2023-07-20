from django.contrib import admin
from .models import LocationVO, Hat
# Register your models here.

@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    list_display = (
        "import_href",
        "closet_name",
        "section_number",
        "shelf_number",
    )

@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "color",
        "picture_url",
        "location",
        "fabric",
    )
