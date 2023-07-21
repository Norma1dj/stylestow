from .models import Shoe, BinVO
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
from .acls import get_shoe_photo
import json


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id",
    ]
    def get_extra_data(self, o):
        return {"bin_location":
            {
                'closet_name': o.bin_location.closet_name,
                'bin_number': o.bin_location.bin_number,
                'bin_size': o.bin_location.bin_size,
                'import_href': o.bin_location.import_href,
                }}


@require_http_methods(["GET", "POST", "DELETE"])
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
    
    elif request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)

       
        bin_location_href = content["bin_location"]
        bin_location = BinVO.objects.get(import_href=bin_location_href)
        content["bin_location"] = bin_location
 
        
        photo = get_shoe_photo(content["color"], content["manufacturer"], content["model_name"])
        content.update(photo)
        shoe = Shoe.objects.create(**content)
        # Your POST handling logic here

        return JsonResponse(
            shoe,
            encoder=ShoeListEncoder,
            safe=False,
        )