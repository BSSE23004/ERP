from django.http import HttpResponse
from django.utils.deprecation import MiddlewareMixin


class DisableCSRFForAPI(MiddlewareMixin):
    """
    Middleware to disable CSRF token requirement for API endpoints.
    API clients use session-based auth but shouldn't need CSRF tokens.
    """

    def process_request(self, request):
        if request.path.startswith('/api/'):
            # Set a flag to disable CSRF validation for this request
            setattr(request, '_dont_enforce_csrf_checks', True)
        return None
