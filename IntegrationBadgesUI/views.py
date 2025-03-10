from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.conf import settings
import os
import json

# /Volumes/T7-Shield-Dinuka/iub-access/repo/Operations_Django_IntegrationBadges/static/integration-badges-ui-react/asset-manifest.json
# /Volumes/T7-Shield-Dinuka/iub-access/repo/Operations_Django_IntegrationBadges/static/integration-badges-ui-react/asset-manifest.json
def index(request, rest_of_path=None):
    with open(os.path.join(settings.BASE_DIR, 'IntegrationBadgesUI', 'static', 'integration-badges-ui-react/.vite/manifest.json'), 'r') as f:
        manifest_json = json.load(f)
        print("###### manifest_json : ", manifest_json)

        main_js = manifest_json["index.html"]["file"]
        main_css = manifest_json["index.html"]["css"][0]

    return render(request, 'IntegrationBadgesUI/index.html', {
        "main_js": "integration-badges-ui-react/%s" % main_js,
        "main_css": "integration-badges-ui-react/%s" % main_css
    })


