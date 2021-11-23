import json

from bson import json_util
from flask import request, Response

import MongoDb
from controller import app

db = MongoDb.getConnection()


@app.route('/test', methods=['GET'])
def test():
    return 'it works!'


@app.route('/getFriends', methods=['GET'])
def getFriends():
    userId = request.args.get('userID')
    friendsList = []
    friends, payload = {}, {}
    userProfile = db["profiles"].find_one({"_id": userId})
    if "friends" in userProfile:
        for friend in userProfile["friends"]:
            friendsList.append(db["profiles"].find_one({"_id": friend}))
    friends["friends"] = friendsList
    payload["payload"] = friends
    return json.loads(json_util.dumps(payload))


@app.route('/getTimeline', methods=['GET'])
def getTimelinePosts():
    userId = request.args.get('userID')
    postList = []
    timeline = {}
    payload = {}
    userProfile = db["profiles"].find_one({"_id": userId})
    if "friends" in userProfile:
        friendsList = userProfile["friends"]
    friendsList.append(userId)
    posts = db["posts"].find({"userId": {"$in": friendsList}}).sort("date", -1)
    for post in posts:
        postList.append(post)
    payload["payload"] = timeline
    timeline["posts"] = postList
    return Response(payload, status=200, mimetype='application/json')


@app.route('/sendRequest')
def sendRequest():
    userId = request.args.get('userID')
    friendId = request.args.get('friendID')
    try:
        db["profiles"].update({"_id": userId}, {"$push": {"sentRequests": friendId}})
        db["profiles"].update({"_id": friendId}, {"$push": {"receivedRequests": userId}})
        return Response(status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(status=500, mimetype='application/json')


@app.route('/acceptRequest')
def acceptRequest():
    userId = request.args.get('userID')
    friendId = request.args.get('friendID')
    try:
        db["profiles"].update({"_id": userId}, {"$push": {"friends": friendId}})
        db["profiles"].update({"_id": friendId}, {"$push": {"friends": userId}})
        db["profiles"].update({"_id": friendId}, {"$pull": {"sentRequests": userId}})
        db["profiles"].update({"_id": userId}, {"$pull": {"receivedRequests": friendId}})
        return Response(status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(status=500, mimetype='application/json')