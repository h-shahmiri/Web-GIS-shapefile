from django.conf.urls import url
from django.urls import path
from django.views.generic import TemplateView
from .import views
from django.views.generic.edit import DeleteView
from djgeojson.views import GeoJSONLayerView
from .models import *
urlpatterns = [
    url(r'^$' ,         TemplateView.as_view(template_name = 'Index.html') , name = 'home'),
    #url(r'^edit$' ,     TemplateView.as_view(template_name = 'Edit.html')  , name = 'edit'),

    path('login'    , views.Loginform , name='login'),
    path('register' , views.Regstform , name='register'),

    # movies URLs
    path('movies'             , views.Moviesview     , name='movies'),
    path('delete/<task_id>\d' , views.Delete_movies  , name='delete_movies'), # OR USE Below command
    path('edit/<task_id>'     , views.Edit_movies    , name='edit_movies'),
    path('moviesdetails'      , views.movies_details , name='details'),
    path('watch/<task_id>'    , views.Watch          , name='watch'),
    path('watched/<task_id>'  , views.Watched        , name='watched'),
    
    #url(r'^edit/(?P<pk>\d+)/$', views.edit_movies , name='edit_movies'),
    

    url(r'^hospital/$' , GeoJSONLayerView.as_view(model=Hospital ,
        properties =('entity','mslink_dmr','fname','mapid''name','kind','capacity',
        'operation_field','recno','fence','geom' )),  name = 'hospital'),

    url(r'^mine_data/$' , GeoJSONLayerView.as_view(model=Mine ,
        properties =('layer','name','name_en','mineral_en','mineral_1','code_state','et_id','geom' )),
        name = 'mine'),

    url(r'^fence_data/$' , GeoJSONLayerView.as_view(model=Fence ,
        properties =('name','fencerange','color','ringcolor','address','warnning','geom' )),
        name = 'fence'),

]