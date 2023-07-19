from .models import Hat
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "color",
        "picture_url",
        "location",
        "fabric",
    ]


@require_http_methods(["GET", "POST"])
def api_list_hat(request, pk=None):
    if request.method == "GET":
        if pk == None:
            hats = Hat.objects.all()
        else:
            hats = Hat.objects.filter(id=pk)
        return JsonResponse(
            {"hats" : hats},
            encoder = HatListEncoder,
        )
    else:
        content = json.loads(request.body)
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder= HatListEncoder,
            safe=False,
        )
