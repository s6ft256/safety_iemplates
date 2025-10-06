from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'templates', views.TemplateViewSet)
router.register(r'downloads', views.DownloadViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/contact/', views.contact_message, name='contact_message'),
    path('api/subscribe/', views.subscribe, name='subscribe'),
    path('api/track-download/', views.track_download, name='track_download'),
]