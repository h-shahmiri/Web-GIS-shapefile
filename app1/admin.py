from django.contrib import admin
from .models import Hospital ; from .models import Fence    ; from .models import Mine
from .models import Tiser    ; from .models import Movies
from leaflet.admin import LeafletGeoAdmin
from django.contrib.gis.admin import GeoModelAdmin
# Register your models here.

class MoviesInline(admin.TabularInline):
    '''Tabular Inline View for '''
    model = Tiser
    extra = 1

class MoviesAdmin(admin.ModelAdmin):
    list_display = ('name','gener','Manufacturing','production_date','age_status', 'watch','id')
    fieldsets       = (('Main' ,{'fields': ['name','gener', 'watch']}),
                        ('off' ,{'fields':['Manufacturing','production_date','age_status','movieimg']
                        }),
                    )

    list_filter  = ['gener' , 'age_status']
admin.site.register(Movies , MoviesAdmin)

class TiserAdmin(admin.ModelAdmin):
    list_display = ('id','image','name')
    fields       = [('id','name'),'image']
admin.site.register(Tiser , TiserAdmin)

class HospitalAdmin(LeafletGeoAdmin):
    list_display = ('entity','mslink_dmr','fname','mapid','name','kind','capacity','operation_field','recno','fence' , 'geom')
admin.site.register(Hospital , HospitalAdmin)

class FenceAdmin(LeafletGeoAdmin):
    list_display = ('name' ,'fencerange', 'color', 'ringcolor', 'address', 'warnning', 'geom')
admin.site.register(Fence , FenceAdmin)

class MineAdmin(LeafletGeoAdmin):
    list_display = ('layer', 'name', 'name_en', 'mineral_na', 'mineral_1', 'code_state', 'et_id', 'geom')
admin.site.register(Mine , MineAdmin)
