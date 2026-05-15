from rest_framework.routers import DefaultRouter
from .views import FeeViewSet

router = DefaultRouter()
router.register('', FeeViewSet, basename='fees')
urlpatterns = router.urls
