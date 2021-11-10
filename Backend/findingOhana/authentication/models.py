from djongo import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=500, default="")
    email = models.CharField(max_length=5000, default="")

    def getUserByEmail(self, email):
        user = User.objects.filter(email=email)
        return user

    def getAllUsers(self):
        users = User.objects.all()
        return users