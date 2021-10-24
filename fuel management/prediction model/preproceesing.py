import csv

with open('data.csv', 'r') as fin, open('final.csv', 'w', newline='') as fout:

    # define reader and writer objects
    reader = csv.reader(fin, skipinitialspace=True)
    writer = csv.writer(fout, delimiter=',')

    
    writer.writerow(next(reader))

    
    for i in reader:
        if (i[1] !="" and i[2]!="" and i[1]!="ONE AUDIT" and i[2]!="ONE AUDIT" ):
            
            writer.writerow(i)
                       