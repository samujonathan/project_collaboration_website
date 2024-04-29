from django.db import models

from django.db import models

class Projects(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()
    class Meta:
        db_table = 'projects'

class Users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    resume_path = models.CharField(max_length=255) 
    class Meta:
        db_table = 'users'

# Create your models here.
