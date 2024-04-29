from django.urls import path
from . import views

urlpatterns = [
    path('recommendations/<int:user_id>/', views.get_recommendations, name='get_recommendations'),
]
