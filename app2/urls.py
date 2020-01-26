from django.conf.urls import url
from django.urls import path
from django.views.generic import TemplateView
from .import views ; from app2 import views


urlpatterns = [
    url(r'^$' , TemplateView.as_view(template_name = 'map.html') , name = 'osm'),
#    url(r'^login$' , TemplateView.as_view(template_name = 'Login.html') , name = 'login'),
]