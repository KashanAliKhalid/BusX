from sklearn import preprocessing
import pickle
import sys

inputt=[[]]
for v in sys.argv[1:]:
  inputt[0].append(float(v))



x= inputt


model = pickle.load(open('D:/FYP/EW updated 2/controller/prediction model2/model.sav', 'rb'))
y=model.predict(x)

a=int(y)
b=str(a)
print(c)

    
