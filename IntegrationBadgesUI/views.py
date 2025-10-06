from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.conf import settings
import os
import json


def index(request, rest_of_path=None):
    return render(request, 'IntegrationBadgesUI/index.html', {
        "OPERATIONS_INTEGRATION_BADGES_WEBAPP_VERSION": settings.OPERATIONS_INTEGRATION_BADGES_WEBAPP_VERSION,
        "OPERATIONS_API_BASE_URL": settings.OPERATIONS_API_BASE_URL
    })
