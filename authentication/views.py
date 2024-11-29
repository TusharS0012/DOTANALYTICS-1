from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .serilizer import RegisterSerializer, LoginSerializer
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from django.shortcuts import redirect
 


User = get_user_model()

class RegisterView(APIView):
     
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return render(request,'home.html' )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request,):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

            user = authenticate(username=user.email, password=password)
            if user is not None:
                token ,created= Token.objects.get_or_create(user=user)
                return redirect('http://localhost:5173/')
            else:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     

def home (request):
    return render(request, "index.html")

 
 