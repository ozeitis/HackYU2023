import json
import numpy as np
import matplotlib.dates as mdates

def process(percentage):
    output = {}
    
    doc_file = open("d.json", "r")
    doc = json.loads(doc_file.read())
    print(doc["entityName"])

    fact_obj = doc["facts"]["us-gaap"]
    fact_list = list(fact_obj.keys())

    for fact in fact_list:
        fact_label = fact_obj[fact]["label"]

        if "USD" not in fact_obj[fact]["units"]:
            continue

        data = fact_obj[fact]["units"]["USD"]
        ten_ks = []
        ten_qs = []
        x = []
        y = []
        for datum in data:
            if datum["form"] == "10-Q":
                ten_ks.append(datum)
                y.append(datum["val"]/1_000_000)
                x.append(datum["end"])

        if len(x) == 0:
            continue

        x_numerical = mdates.datestr2num(x)
        m, b = np.polyfit(x_numerical, y, 1)

        # Create a new list to store the reformatted data
        reformatted_data = []

        # Iterate over x and y, and add a dictionary with keys "time" and "value" to the new list
        for i in range(len(x)):
            reformatted_data.append({"time": x[i], "value": y[i]})

        # Add the reformatted data to the output dictionary with the fact_label as the key
        output[fact_label] = reformatted_data

    # Return the output as a JSON object
    return output