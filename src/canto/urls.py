from django.conf.urls import url

from canto.views import (
    CantoSettingsView,
    refresh_token,
    disconnect,
    canto_binary_view,
    CantoImageLibraryView,
    CantoFolderLibraryView,
    CantoAlbumJsonView,
    CantoTreeJsonView,
    CantoSearchJsonView,
)

app_name = "canto"
urlpatterns = [
    url(r"^canto/settings/$", CantoSettingsView.as_view(), name="settings"),
    url(r"^canto/refresh/$", refresh_token, name="refresh-token"),
    url(r"^canto/disconnect/$", disconnect, name="disconnect"),
    url(r"^canto/image_library/$", CantoImageLibraryView.as_view(), name="library"),
    url(
        r"^canto/folder_library/$", 
        CantoFolderLibraryView.as_view(), 
        name="folder-library",
    ),
    url(r"^canto/tree.json$", CantoTreeJsonView.as_view(), name="tree-json"),
    url(
        r"^canto/search/(?P<query>.+).json$",
        CantoSearchJsonView.as_view(),
        name="search-json",
    ),
    url(
        r"^canto/album/(?P<album_id>.+).json$",
        CantoAlbumJsonView.as_view(),
        name="album-json",
    ),
    url(r"^canto/binary/(?P<url>.+)$", canto_binary_view, name="binary"),
]
