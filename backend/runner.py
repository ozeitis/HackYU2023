import json
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.dates as mdates
import pandas as pd


def process(percentage):
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

        # print("10-K:")
        # for item in ten_ks:
        #     print(item["end"] + ", " + item["form"] + ": " + str(item["val"]))

        if len(x) == 0:
            continue

        fig, ax = plt.subplots()

        # Plot all the data
        ax.plot(x, y, marker='o', linestyle='')
        # Plot only the last data point
        ax.plot(x[-1], y[-1], marker='o', linestyle='')

        fig.autofmt_xdate()

        # Convert dates to numerical format for regression
        x_numerical = mdates.datestr2num(x)

        # Calculate line of best fit
        m, b = np.polyfit(x_numerical, y, 1)

        # Plot line of best fit
        ax.plot(x, m * x_numerical + b, color='red')

        # Calculate distance between latest point and line of best fit
        latest_point = np.array([x_numerical[-1], y[-1]])
        line_point = np.array([x_numerical[-1], m * x_numerical[-1] + b])
        distance = np.linalg.norm(latest_point - line_point)

        print("Distance between latest point and line of best fit:", distance)
        threshold_distance = (m * x_numerical[-1] + b) * percentage
        if distance > threshold_distance:
            # Save the plot if the distance is greater than the threshold
            print("Threshold " + str(threshold_distance))
            print(fact_obj[fact]["label"])

            plt.savefig(f"output_{fact}.png")
        else:
            plt.close(fig)  # Close the figure if not saved