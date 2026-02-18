import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder , MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score , confusion_matrix , classification_report
from imblearn.over_sampling import SMOTE

#importing the data
df = pd.read_csv("Digital Behavior & Personality Survey.csv")
#print(df.head())

# analyzing different features

#print(df.describe())
#print(df.iloc[:, 6])
# sns.barplot(df.iloc[:, 6])
# plt.show()

X = df.drop(columns=['Timestamp','Which personality best describes you?'])
y = df['Which personality best describes you?']

#encoding target column

le = LabelEncoder()
y = le.fit_transform(y)

# # train_test_split
X_train, X_test, y_train, y_test = train_test_split(X,y,test_size=0.2,stratify=y,random_state=42)
# the "STRATIFY" parameter is used to ensures that the training and testing sets maintain the same proportion of class as original dataset

#scaling the numerical column

sc = MinMaxScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Apply SMOTE

smote = SMOTE(random_state = 42, k_neighbors = 1)
X_train,y_train = smote.fit_resample(X_train, y_train)

# Apply KNN 

knn = KNeighborsClassifier(n_neighbors=3, metric='euclidean', weights='uniform')
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

# accuracy score

accuracy = accuracy_score(y_test, y_pred)
print("accuracy is: ",accuracy)

# confusion matrix

cm = confusion_matrix(y_test, y_pred)
print(cm)

# classification report

print(classification_report(y_test,y_pred))
