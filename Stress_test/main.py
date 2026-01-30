import numpy as np
import pandas as pd 
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OrdinalEncoder
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix


#loading the dataset and displaying the first few rows
df = pd.read_csv('student_monnitoring_data.csv')
#print(df.head())

#seeing information about the dataset
# print(df.info())
# print(df.describe())

#dropping unnecessary columns
df = df.drop(columns=['Student ID', 'Date'])
#print(df.head())

#bivariate analysis
# sns.barplot(x='Stress Level (GSR)',y='Risk Level', data=df)
# plt.show()

# sns.barplot(x='Anxiety Level',y='Risk Level', data=df)
# #plt.show()

# sns.barplot(x='Sleep Hours',y='Risk Level', data=df)
# plt.show()

# sns.heatmap(pd.crosstab(df['Attendance Status'],df['Risk Level']))
# plt.show()

#Selecting input and output cols
X = df[['Attendance Status',
        'Stress Level (GSR)',
        'Anxiety Level',
        'Mood Score']]

y = df['Risk Level']

#print(y.head())

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)

#Encode categorical column
ode = OrdinalEncoder(categories=[['Absent','Late','Present']])
X_train[['Attendance Status']] = ode.fit_transform(X_train[['Attendance Status']])
X_test[['Attendance Status']] = ode.transform(X_test[['Attendance Status']])
le = LabelEncoder()
le.fit(y_train)
y_train = le.transform(y_train)
y_test = le.transform(y_test)

#Apply Logistic Regression
lr = LogisticRegression(max_iter=1000, random_state=42)
lr.fit(X_train,y_train)
y_pred = lr.predict(X_test)
y_pred_label = le.inverse_transform(y_pred)
y_test_label = le.inverse_transform(y_test)

print("Accuracy:", accuracy_score(y_test_label, y_pred_label))
print("Confusion Matrix:\n", confusion_matrix(y_test_label, y_pred_label))

