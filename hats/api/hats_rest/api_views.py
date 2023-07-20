from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json
from .acls import get_photo


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "name",
        "color",
        "picture_url",
        "fabric",
        "id",
    ]

    def get_extra_data(self, o):
        return {"location":
            {
                "import_href": o.location.import_href,
                "closet_name": o.location.closet_name,
                "section_number": o.location.section_number,
                "shelf_number": o.location.shelf_number,
            }
        }


@require_http_methods(["GET", "POST", "DELETE"])
def api_list_hat(request, pk=None):
    if request.method == "GET":
        if pk == None:
            hats = Hat.objects.all()
        else:
            hats = Hat.objects.get(id=pk)
        return JsonResponse(
            {"hats" : hats},
            encoder = HatListEncoder,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        photo = get_photo(content["color"], content["fabric"])
        content.update(photo)
        location_href = content["location"]
        location = LocationVO.objects.get(import_href=location_href)
        content["location"] = location
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder= HatListEncoder,
            safe=False,
        )
