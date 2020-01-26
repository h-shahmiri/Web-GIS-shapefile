from django import forms
from app1.models import Movies


class MoviesForm(forms.ModelForm):
    class Meta:
        model  = Movies
        fields = ['name','gener','watch','age_status']

class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={
        "class":"form-control col-md-8","id":"regname","placeholder":"Username"
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        "class":"form-control col-md-8","id":"reglname","placeholder":"Password"
    }))


class RegisterForm(forms.Form):
    name     = forms.CharField(widget=forms.TextInput(attrs={
        "class":"form-control col-md-8","id":"regname","placeholder":"Name"
    }))
    lastname = forms.CharField(widget=forms.TextInput(attrs={
        "class":"form-control col-md-8","id":"reglname","placeholder":"LastName"
    }))
    email    = forms.EmailField(widget=forms.TextInput(attrs={
        "class":"form-control col-md-8","id":"regemail","placeholder":"Email@gmail.com"
    }))

    def email_valid(self):
        emails = self.cleaned_data['email']
        if "gmail.com" not in emails:
            raise forms.ValidationError("Pls use Gmail")
        return emails

    password = forms.CharField(widget=forms.PasswordInput(attrs={
        "class":"form-control col-md-8","id":"regpass"
    }))