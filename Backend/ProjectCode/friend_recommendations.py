import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def jaccard_binary(x,y):
    """A function for finding the similarity between two binary vectors"""
    intersection = np.logical_and(x, y)
    union = np.logical_or(x, y)
    similarity = intersection.sum() / float(union.sum())
    return similarity

def fof_recommendation(target_user, k=10):
    data_path = "Backend/Data/user-user-relationships.csv"
    friends_data = pd.read_csv(data_path)
    # friends_data.head()

    f1 = friends_data.iloc[target_user-1][1:]
    # f2 = friends_data.iloc[6][1:]

    # jaccard_similarities = pd.DataFrame(columns=['User', 'Similarity'])
    sim_dict = {'User': [], 'Similarity': []}
    for i in range(len(f1)):
      if f1[i] == 0 and i+1 != target_user:
        f2 = friends_data.iloc[i][1:]
        sim_dict['User'].append(i+1)
        sim_dict['Similarity'].append(jaccard_binary(f1,f2))

    jaccard_similarities = pd.DataFrame.from_dict(sim_dict)
    result = jaccard_similarities.sort_values(by=['Similarity'], ascending=False).head(k).to_dict()
    return list(result['User'].values())

def get_recommendations(target_user):
    return fof_recommendation(target_user)