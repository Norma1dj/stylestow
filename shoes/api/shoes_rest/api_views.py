from .models import Shoe
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = '__all__'



@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
 
    if request.method == "GET":
        shoes = Shoe.objects.all()
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