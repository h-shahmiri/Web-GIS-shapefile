from django.shortcuts import render , redirect ;
from django.http      import HttpResponse
from django.core      import serializers;
from django.template  import loader      
from django.contrib   import messages;
from django.contrib.auth import authenticate , login , get_user_model
from django.core.paginator import Paginator ; import json ;
from django.urls import reverse ; import re
from .models import *
from .forms import *

# Create your views here.

# Login and Registration
def Loginform(request):
    login_form = LoginForm(request.POST or None)
    context = {
        "log_form" : login_form
    }
    
    if login_form.is_valid():
        print(login_form.cleaned_data)
        username = login_form.cleaned_data.get("username")
        password = login_form.cleaned_data.get("password")
        user     = authenticate(request, username=username , password=password)
        print("user = " , user)

        if username=="prance" and password=="123":
            request.user.is_authenticated
            login(request ,user)
            print("authenticate Success")
            return redirect("/")
        else:
            context = {
                "log_form" : login_form,
                "Error"    : "Error Username or Password is Wrong"
            }
            print("Error Loging")
    
    return render(request , "Login.html" , context)


User = get_user_model()
def Regstform(request):
    reg_form = RegisterForm(request.POST or None)
    
    if reg_form.is_valid():

        context = {
            "regst_form"  : reg_form,
            "regsubmit"   : "Registraion Success"
        }
        print(reg_form.cleaned_data)
        username = reg_form.cleaned_data.get("username")
        email    = reg_form.cleaned_data.get("email")
        password = reg_form.cleaned_data.get("password")
        new_user = User.objects.create_user(username , email , password)
        new_user.save()
        print(new_user)
    else:
        context = {
            "regst_form"  : reg_form , 
            "regerror"    : "Error Please Check Details"
        }
        print("Error Registration")
    
    return render(request , "Register.html" , context)

#===============================================================================

# MoviePage Views
def Moviesview(request):
    if request.method == "POST":
        form = MoviesForm(request.POST or None)
        if form.is_valid():
            form.save()
        messages.success(request , ("Success"))
        return redirect('movies')
    else:
        all_movies = Movies.objects.all()
        # 3 commondfor paginator
        paginator  = Paginator(all_movies , 6)
        page       = request.GET.get('pg')
        all_movies = paginator.get_page(page)
        context    = {'all_movies': all_movies}
        return render(request , "movies.html" , context)

def Delete_movies(request ,task_id):
    movie = Movies.objects.get(pk=task_id)
    movie.delete()
    return redirect('movies')

def Edit_movies(request ,task_id):
    if request.method == "POST":
        task   = Movies.objects.get(pk=task_id)
        form   = MoviesForm(request.POST or None , instance= task)
        if form.is_valid():
            form.save()
        messages.success(request , ("Edit Success"))
        return redirect('movies')
    else:
        editmovies = Movies.objects.get(pk=task_id)
        context    = {'editmovies': editmovies}
        return render(request , "edit.html" , context)

def Watched(request ,task_id):
    movie_w = Movies.objects.get(pk=task_id)
    movie_w.watch = True
    movie_w.save()
    return redirect('movies')

def Watch(request ,task_id):
    movie_w = Movies.objects.get(pk=task_id)
    movie_w.watch = False
    movie_w.save()
    return redirect('movies')

##=========================================================================================

def movies_details(request):
    # json movies details
    movie      = Movies.objects.all()
    movies_ser = serializers.serialize('json' , movie)
    movie_json = json.loads(movies_ser)
    movie_data = json.dumps(movie_json)

    #json mines details
    mines      = Mine.objects.all()
    mines_ser  = serializers.serialize('json' , mines)
    mines_json = json.loads(mines_ser)
    mines_data = json.dumps(mines_json)

    #mine table
    minelocat = Fence.objects.all()
    geom_list = []  ; split_geom = []

    #mine geom_list
    for x in minelocat:
        geom_list.append(x.geom)
    

    if request.user.is_authenticated:
        context = {
            'movie_data' : movie_data,
            'mines_data' : mines_data,
            'cation'     : "Json Details: ",
            'geom_list'  : geom_list,
        }
    else:
        context = {
            'movie_data': movie_data,
        }

    return render(request , "Details.html" , context)

#===================================================================================================================
#mine points coordinate
    minelocat = Fence.objects.all()
    geom_list = []  ; split_geom = [] ; split_point = []

    for x in minelocat:
        geom_list.append(str(x.geom))

    # Regex
    regex = r'\((.*))'

    for i in geom_list:
        matches = re.finditer(regex, i, re.MULTILINE)

        for matchNum, match in enumerate(matches, start=1):
            
            for gn in range(0, len(match.groups())):
                gn = gn + 1
                split_geom.append(match.group(gn))
            
    # split points_list
    for ii in split_geom:
        aa = ii.split()
        split_point.append(aa)
    pp = split_point[0][0] ; pp1 = split_point[0][1] ; pp2 = dd[1][0] ; pp3 = dd[1][1] ; pp4 = dd[1][0] ; pp5 = dd[1][1]


    if request.user.is_authenticated:
        context = {
            'pp'  : pp,
            'pp1' : pp1,
            'pp2' : pp2,
            'pp3' : pp3,
            'pp4' : pp4,
            'pp5' : pp5,
            
        }

    return render(request , "Index.html" , context)