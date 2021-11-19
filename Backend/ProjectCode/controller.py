from flask import Flask, request
import MongoDb

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

import timeline