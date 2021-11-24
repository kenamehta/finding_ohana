import json

from bson import json_util
from flask import request, Response
from flask_cors import cross_origin

import MongoDb
from controller import app

db = MongoDb.getConnection()


@app.route('/test', methods=['GET'])
def test():
    return 'it works!'


@app.route('/getFriends', methods=['GET'])
@cross_origin()
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


@app.route('/getIncomingFriends', methods=['GET'])
@cross_origin()
def getIncomingFriends():
    userId = request.args.get('userID')
    friendsList = []
    friends, payload = {}, {}
    userProfile = db["profiles"].find_one({"_id": userId})
    if "friends" in userProfile:
        for friend in userProfile["friendRequests"]:
            friendsList.append(db["profiles"].find_one({"_id": friend}))
    friends["friends"] = friendsList
    payload["payload"] = friends
    return json.loads(json_util.dumps(payload))


@app.route('/getTimeline', methods=['GET'])
@cross_origin()
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
@cross_origin()
def sendRequest():
    userId = request.args.get('userID')
    friendId = request.args.get('friendID')
    try:
        db["profiles"].update({"_id": userId}, {"$push": {"friendRequested": friendId}})
        db["profiles"].update({"_id": friendId}, {"$push": {"friendRequests": userId}})
        return Response(status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(status=500, mimetype='application/json')


@app.route('/acceptRequest')
@cross_origin()
def acceptRequest():
    userId = request.args.get('userID')
    friendId = request.args.get('friendID')
    try:
        db["profiles"].update({"_id": userId}, {"$push": {"friends": friendId}})
        db["profiles"].update({"_id": friendId}, {"$push": {"friends": userId}})
        db["profiles"].update({"_id": friendId}, {"$pull": {"friendRequested": userId}})
        db["profiles"].update({"_id": userId}, {"$pull": {"friendRequests": friendId}})
        return Response(status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(status=500, mimetype='application/json')


@app.route('/rejectRequest')
@cross_origin()
def rejectRequest():
    userId = request.args.get('userID')
    friendId = request.args.get('friendID')
    try:
        db["profiles"].update({"_id": friendId}, {"$pull": {"friendRequested": userId}})
        db["profiles"].update({"_id": userId}, {"$pull": {"friendRequests": friendId}})
        return Response(status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(status=500, mimetype='application/json')


@app.route('/unfriendRequest')
@cross_origin()
def unfriendRequest():
    userId = request.args.get('userID')
    friendId = request.args.get('friendID')
    try:
        db["profiles"].update({"_id": friendId}, {"$pull": {"friends": userId}})
        db["profiles"].update({"_id": userId}, {"$pull": {"friends": friendId}})
        return Response(status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(status=500, mimetype='application/json')


@app.route('/removeRequest')
@cross_origin()
def removeRequest():
    userId = request.args.get('userID')
    friendId = request.args.get('friendID')
    try:
        db["profiles"].update({"_id": friendId}, {"$pull": {"friendRequests": userId}})
        db["profiles"].update({"_id": userId}, {"$pull": {"friendRequested": friendId}})
        return Response(status=200, mimetype='application/json')
    except Exception as e:
        print(e)
        return Response(status=500, mimetype='application/json')
