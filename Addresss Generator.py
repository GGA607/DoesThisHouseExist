import random

roads = ["Main Street",
         "Park Road",
         "Maple Avenue",
         "Cedar Boulevard",
         "Lake Street",
         "5th Street",
         "Ridge Road",
         "Spruce Lane",
         "Chestnut Drive",
         "Washington Way",
         "River Court",
         "Lincoln Place"
         ]

cities = ["Toronto",
          "Montreal",
          "Vancouver",
          "Portland",
          "Cleveland",
          "Chicago"
        ]

def select_road():
    return roads[random.randint(0, 11)]

def select_city():
    return cities[random.randint(0,5)]

def select_state(city):
    if city == "Toronto":
        return "ON"
    elif city == "Montreal":
        return "QC"
    elif city == "Vancouver":
        return "BC"
    elif city == "Portland":
        return "OR"
    elif city == "Cleveland":
        return "OH"
    else:
        return "IL"

def select_country(city):
    if city == "Toronto" or city == "Montreal" or city == "Vancouver":
        return "Canada"
    else:
        return "USA"

def make_data():
    address = str(random.randint(1, 9999)) + " " + select_road()
    city = select_city()
    state = select_state(city)
    country = select_country(city)

    return "{\n    id: '',\n    address: '" + address + "',\n    city: '" + city +"',\n    state: '" + state + "',\n    country: '" + country + "',\n    postalCode: '',\n    exists: " + str(random.randint(0, 50)) + ",\n    existsBut: " + str(random.randint(0, 50)) + ",\n    doesNotExist: " + str(random.randint(0, 50)) + "\n},"


for i in range(15):
    print(make_data() + "\n")