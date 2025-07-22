from django.shortcuts import render
from rest_framework import generics,permissions
from .models import JobApplication
from .serializer import JobApplicationSerializer,RegisterSerializer
from django.contrib.auth.models import User
# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer
    permission_classes=[permissions.AllowAny]

class JobApplicationListCreateView(generics.ListCreateAPIView):
    serializer_class=JobApplicationSerializer
    permission_classes=[permissions.AllowAny]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    
class JobApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=JobApplicationSerializer
    permission_classes=[permissions.AllowAny]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user)