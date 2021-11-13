from flask import Flask, request
import MongoDb
from twilio.rest import Client

app = Flask(__name__)
db = MongoDb.getConnection()


@app.route('/')
def hello_world():

    # Your Account SID from twilio.com/console
    account_sid = "AC5300921060d16947c2d88961eced4a04"
    # Your Auth Token from twilio.com/console
    auth_token = "5dab464a1e38dcaf25d2473ad6800159"

    client = Client(account_sid, auth_token)

    message = client.chat.create(
        to="+15558675309",
        from_="+15017250604",
        body="Hello from Python!")

    print(message.sid)
    return 'Hello World!'


@app.route('/generateTags', methods=['POST'])
def generateTags():
    req = request.get_json()
    tags = req['tags']
    userId = req['userId']
    userProfile = db["users"].find_one({"userId": userId})
    newTags = []
    if "tags" in userProfile:
        newTags.extend(userProfile.get("tags"))
        newTags.extend(tags)
        print(newTags)
        db["users"].update_one({"userId": userId}, {"$set": {"tags": newTags}})
    else:
        db["users"].update_one({"userId": userId}, {"$set": {"tags": tags}})
    return 'check'
