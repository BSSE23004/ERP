from django.shortcuts import render, redirect 
from django.http import HttpResponse
from datetime import date
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login

# Create your views here.

def getHomeCards(request):
    return HttpResponse("Home Cards")

# Create your views here.

def checkAuthentication(request):
    if request.session.get('Username') is None:
        print("User is anonymous, redirecting to login")
        return redirect('login')
    else:
        username = request.session.get('Username')
        context = {'Username': username} if username else {"Username": "Guest"}
        print("The html of the request is:", request.session.get('template'))
        return render(request, request.session.get('template'), context) 

def index(request):
    request.session['template'] = 'index.html'
    return checkAuthentication(request)

def about(request):
    request.session['template'] = 'about.html'
    return checkAuthentication(request)

def contact(request):
    if request.method == "POST":
        print("This is a post request")
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')
        print(name, email, phone, message, date.today())
        contact = Contact(name=name, email=email, phone=phone, message=message, date=date.today())
        contact.save()
        messages.success(request, 'Your form has been submitted successfully!')
    request.session['template'] = 'contact.html' 
    return checkAuthentication(request)

def pricings(request):
    request.session['template'] = 'pricings.html'
    return checkAuthentication(request)

def loginUser(request):
    if request.method == "POST":
        print("This is a post request of login")
        username = request.POST.get('username')
        password = request.POST.get('login_password')
        print(username, password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            # A backend authenticated the credentials
            print("Authenticated Successfully")
            login(request, user)
            request.session['Username'] = username
            return redirect('index')
        else:
            # No backend authenticated the credentials
            print("Invalid Credentials, Please try again")
            messages.error(request, 'Invalid Credentials, Please try again')
    return render(request, 'login.html')

def signup(request):
    if request.method == "POST":
        print("This is a post request of signup")
        username = request.POST.get('signup_username')
        email = request.POST.get('signup_email')
        password = request.POST.get('signup_password')
        print(username, email, password)
        # Here you would typically create the user
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        print("User Created Successfully")
        messages.success(request, 'Your account has been created successfully!')
        return redirect('login')
    return render(request, 'login.html')

def logoutUser(request):
    request.session.flush()
    logout(request)
    print("User logged out successfully")
    return redirect('login')
            