# Wardrobify

Team:

* Long Guan - Hats microservices
* Drew Norman-Meadows - Shoe microservice

## Design

## Shoes microservice

The Shoe model and BinVo models are created in this project.

The Shoe model is used to create shoe objects with certain properties in shoes_rest app. The BinVO model is created to represent a bin in the wardrobe microservice.

The poller is created to fetch data from the wardrobe api every 60 sec to keep the Shoe microservice data up to date

The bin_location variable in the Shoe Model has a foreign key with the BinVO model in it.


The api_list_shoes function is used for the CRUD operations for the Shoe Model

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

Explain your models and integration with the wardrobe
microservice, here.
