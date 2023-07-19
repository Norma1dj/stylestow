from .models import Hat
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "color",
        "picture_url",
        "location",
    ]


@require_http_methods(["GET"])
def api_list_hat(request):
    if request.method == "GET":
        hats = Hat.objects.all()
    return JsonResponse(
        {"hats" : hats},
        encoder = HatListEncoder,
    )
