import csv

with open('data.csv', 'r') as fin, open('final.csv', 'w', newline='') as fout:

    # define reader and writer objects
    reader = csv.reader(fin, skipinitialspace=True)
    writer = csv.writer(fout, delimiter=',')


    writer.writerow(next(reader))


    for i in reader:
        if (i[0] !="" and i[1]!="" and i[0]!="ONLY" and i[1]!="ONLY" and i[0]!="EY" and i[1]!="EY" and i[0]!="ERROR" and i[1]!="ERROR"):

            writer.writerow(i)
