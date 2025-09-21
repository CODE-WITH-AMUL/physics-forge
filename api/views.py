from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class HomeAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("Request headers:", request.headers) # DEBUG
        is_authenticated = request.user.is_authenticated
        return Response({
            'is_authenticated': is_authenticated,
            'username': request.user.username if is_authenticated else None
        })
        
