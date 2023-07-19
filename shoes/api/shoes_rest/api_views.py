from .models import Shoe
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin_location",
    ]





@require_http_methods(["GET", "POST"])
def api_list_shoes(request, pk=None):
 
    if request.method == "GET":
        if pk == None:
            shoes = Shoe.objects.all()
        else:
            shoes = Shoe.objects.filter(id=pk)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        shoe = Shoe.objects.create(**content)
        # Your POST handling logic here

        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )