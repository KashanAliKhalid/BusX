from sklearn import preprocessing
import pickle
import sys

inputt=[[]]
for v in sys.argv[1:]:
  inputt[0].append(float(v))



x= inputt


model = pickle.load(open('C:/Users/HP/WebstormProjects/BusX/backend/controllers/fuel management/prediction model/model.sav', 'rb'))
y=model.predict(x)


b=str((y[0]+162)*3.7)
print(b)


