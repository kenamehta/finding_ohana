import ssl

from pymongo import MongoClient


def getConnection():
    client = MongoClient('mongodb+srv://archit:qazwsxedc@cluster0.ocdka.mongodb.net/Cluster0?retryWrites=true&w=majority', ssl_cert_reqs=ssl.CERT_NONE)
    mydb = client["Cluster0"]
    return mydb
