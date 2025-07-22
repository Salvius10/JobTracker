from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import JobApplicationListCreateView,JobApplicationDetailView,RegisterView
urlpatterns=[
    path('register/',RegisterView.as_view(),name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jobs/',JobApplicationListCreateView.as_view(),name='job-list'),
    path('jobs/<int:pk>',JobApplicationDetailView.as_view(),name='job-detail')
]