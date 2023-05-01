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

        # To determine if the most recent report contained anomaloous data we can do the following:
        # Calculate distance between latest point and line of best fit as follows:
        # latest_point = np.array([x_numerical[-1], y[-1]])
        # line_point = np.array([x_numerical[-1], m * x_numerical[-1] + b])
        # distance = np.linalg.norm(latest_point - line_point)
        
        # Then we can calculate the distribution of distances from the line of best fit for all 
        # datapoints
        
        # Finaly, we can see if the distance of the last data point to the line of best fit
        # is 2 standard deviations away from the mean distance. 
        # We could give the user the option to only view statistics where the most recent data
        # broke away from the trend

        # Create a new list to store the reformatted data
        reformatted_data = []

        # Iterate over x and y, and add a dictionary with keys "time" and "value" to the new list
        for i in range(len(x)):
            reformatted_data.append({"time": x[i], "value": y[i]})

        # Add the reformatted data to the output dictionary with the fact_label as the key
        output[fact_label] = reformatted_data

    # Return the output as a JSON object
    return output