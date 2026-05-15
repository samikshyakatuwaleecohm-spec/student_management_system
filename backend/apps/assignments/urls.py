from rest_framework.routers import DefaultRouter
from .views import AssignmentViewSet

router = DefaultRouter()
router.register('', AssignmentViewSet, basename='assignments')
urlpatterns = router.urls
