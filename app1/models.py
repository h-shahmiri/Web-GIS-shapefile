from __future__ import unicode_literals
from django.db import models# import uuid  ;
from django.contrib.gis.db import models
#from django.contrib.gis.geos import GEOSGeometry

# Create your models here.

class Movies(models.Model):
    #id               = models.UUIDField(primary_key=True , default=uuid.uuid4)
    id               = models.AutoField(primary_key=True)
    gener            = models.CharField(max_length=33)
    name             = models.CharField(max_length=30)
    Manufacturing    = models.CharField(max_length=50, blank=True, null=True)
    production_date  = models.DateField(blank=True, null=True)
    age =  (('Child','-12'),
            ('adolescent','12-15'),
            ('young man','15-18'),
            ('adult','18+'))

    age_status = models.CharField(max_length=10, choices=age , blank=True , default='adolescent')
    watch      = models.BooleanField(default=False)
    movieimg   = models.ImageField(upload_to='app1/images' , blank=True, null=True)
class Meta:
    ordering = ["name"]


class Tiser(models.Model):
    id     = models.AutoField(primary_key=True)
    image  = models.ImageField(upload_to="app1/images")
    name   = models.ForeignKey(Movies, on_delete = models.SET_NULL, null = True)


class Hospital(models.Model):
    entity      = models.CharField(max_length=14)
    mslink_dmr  = models.BigIntegerField()
    fname       = models.CharField(max_length=32)
    mapid       = models.IntegerField()
    name        = models.CharField(max_length=33)
    kind        = models.CharField(max_length=11)
    capacity    = models.IntegerField()
    operation_field = models.CharField(max_length=17)
    recno       = models.IntegerField()
    fence       = models.CharField(max_length=50)
    geom        = models.MultiPolygonField(srid=4326)
    def __unicode__(self):
        return self.entity

class Fence(models.Model):
    name       = models.CharField(max_length= 30)
    fencerange = models.IntegerField(default="200")
    color      = models.CharField(max_length= 30, default="red")
    ringcolor  = models.CharField(max_length= 30, default="f03")
    address    = models.CharField(max_length= 60, default="none")
    warnning   = models.CharField(max_length= 90, default="Silence Please", blank=True, null=True)
    geom       = models.MultiPointField(srid = 4326, blank=True, null=True)

    def __unicode__(self):
        return self.name


class Mine(models.Model):
    layer = models.CharField(max_length=21)
    name = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200)
    mineral_na = models.CharField(max_length=100)
    mineral_1 = models.CharField(max_length=100)
    code_state = models.CharField(max_length=60)
    et_id = models.IntegerField()
    geom = models.MultiPointField(srid=4236)

    def __unicode__(self):
        return self.name
