from flask import Flask, request
import MongoDb
from friend_recommendations import get_recommendations

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
    req = request.getjson()
    user_id = req['userID']
    result = get_recommendations(user_id)
    return result


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

import timeline
