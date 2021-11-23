from flask import Flask, request
import MongoDb
from friend_recommendations import get_recommendations
# from populate_user_data import populate_matrix
from comprehend import comprehend_text
from datetime import datetime, timedelta

app = Flask(__name__)
db = MongoDb.getConnection()


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/generateTags', methods=['POST'])
def generateTags():
    req = request.get_json()
    tags = req['tags']
    userId = req['userID']
    userProfile = db["profiles"].find_one({"_id": userId})
    newTags = []
    if "tags" in userProfile:
        newTags.extend(userProfile.get("tags"))
        newTags.extend(tags)
        db["users"].update_one({"userId": userId}, {"$set": {"tags": newTags}})
    else:
        db["users"].update_one({"userId": userId}, {"$set": {"tags": tags}})
    return 'generated'

@app.route('/generateFriendRecommendations', methods=['POST'])
def generateFriendRecommendations():
    req = request.get_json()
    user_id = req['userID']
    result = get_recommendations(user_id)
    return result

@app.route('/tagPosts', methods=['POST'])
def tag_posts():
    """Fetch new posts from mongo
    For each post, generate tags
    Store tags in the following format:
    {
        postid, userid, tags[]
    }
    In the future user object must store tags in the following format:
    {
        userid, tags{t1:count1, t2:count2, ...}
    }"""
    # Select a window of T-2 hours
    cutoff_date = datetime.today() - timedelta(hours=2)
    all_posts = db["posts"].find({'createdAt': {"$gt": cutoff_date}})
    result = {}
    for post in all_posts:
        # print(post)
        text_labels = comprehend_text(post['content'].lower())
        # print(f"Found {len(text_labels)} text labels.")
        # print(post['_id'], set(text_labels['entities'] + text_labels['phrases']))
        result[str(post['_id'])] = list(set(text_labels['entities'] + text_labels['phrases']))
        tags = list(set(text_labels['entities'] + text_labels['phrases']))
        post_id = post['_id']
        user_id = post.get('userID')
        db["posts"].update_one({"_id": post_id}, {"$set": {"tags": tags}})
        user = db["profiles"].find_one({"_id": user_id})
        if user:
            user_tags = user["tags"] + tags
            user_tags = list(set(user_tags))
            # print(user['name'], user['tags'])
            print("Current User:", user['name'])
        else:
            user_tags = []
        # print(post['content'], user_tags)
        db["profiles"].update_one({"_id": user_id}, {"$set": {"tags": user_tags}})
    return result

# @app.route('/populateUserData', methods=['POST'])
# def populate_user_data():
#     users = db["profiles"].find({})
#     print([user['_id'] for user in users])
#     # for user in users:
#     #     print(user)
#     populate_matrix(users)
#     return {"Test": "Run"}

"""Find all posts relevant to a user
1. Find tags associated with that user
2. Find all posts associated with those tags
3. Recommend them to the user
Optional. Get userIDs of users whose posts are selected. Get userIDs of recommended users.
Recommend posts from users based on the union."""
@app.route('/getRecommendedPosts', methods=['POST'])
def get_recommended_posts():
    req = request.get_json()
    user_id = req['userID']
    user = db["profiles"].find_one({"_id": user_id})
    mongo_query = []
    for tag in user["tags"]:
        mongo_query.append({"tags": tag})
    if mongo_query:
        posts = db["posts"].find({"$or": mongo_query})
    else:
        posts = db["posts"].find({})
    recommended_posts = []
    for post in posts:
        if post["userID"] != user_id:
            recommended_posts.append(str(post["_id"]))
        # else:
        #     print(str(post["_id"]) + " belongs to the same user")
    db["profiles"].update_one({"_id": user_id}, {"$set": {"recommendedPosts": recommended_posts}})
    return {"recommended_posts": recommended_posts}


@app.route('/getCommonTags', methods=['POST'])
def get_common_tags():
    req = request.get_json()
    user1_id = req['user1ID']
    user2_id = req['user2ID']
    user1 = db["profiles"].find_one({"_id": user1_id})
    user2 = db["profiles"].find_one({"_id": user2_id})
    common_tags = set(user1["tags"]).intersection(user2["tags"])
    return {"common_tags": list(common_tags)}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

import timeline
