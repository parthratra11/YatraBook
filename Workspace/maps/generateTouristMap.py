import folium
from folium.plugins import HeatMap

# Center Assam
assam_center = [26.2, 92.9]
m = folium.Map(location=assam_center, zoom_start=7, tiles="OpenStreetMap")

# Tourist clusters (simulate heatmap points in Assam)
tourist_points = [
    # Guwahati cluster
    *[[26.18 + 0.03 * i, 91.75 + 0.03 * j, 1.5] for i in range(3) for j in range(3)],
    # Kaziranga cluster
    *[[26.58 + 0.02 * i, 93.33 + 0.02 * j, 1.2] for i in range(2) for j in range(2)],
    # Silchar cluster
    *[[24.83 + 0.02 * i, 92.78 + 0.02 * j, 1.0] for i in range(2) for j in range(2)],
    # Random spread
    *[[25.5 + 0.5 * i, 92.0 + 0.5 * j, 0.7] for i in range(2) for j in range(2)],
]

# Add heatmap layer
HeatMap(
    [[lat, lng, intensity] for lat, lng, intensity in tourist_points],
    radius=35,
    blur=25,
    max_zoom=13,
    gradient={
        0.1: "blue",
        0.3: "cyan",
        0.5: "lime",
        0.7: "yellow",
        0.9: "orange",
        1.0: "red",
    },
).add_to(m)

# SOS alerts (pinpoint markers)
sos_alerts = [
    {"lat": 26.18, "lng": 91.75, "name": "SOS Alert #1"},
    {"lat": 26.58, "lng": 93.33, "name": "SOS Alert #2"},
    {"lat": 24.83, "lng": 92.78, "name": "SOS Alert #3"},
    {"lat": 25.5, "lng": 92.0, "name": "SOS Alert #4"},
]

for alert in sos_alerts:
    folium.Marker(
        location=[alert["lat"], alert["lng"]],
        popup=alert["name"],
        icon=folium.Icon(color="red", icon="exclamation-sign"),
    ).add_to(m)

# Save to HTML
m.save("d:/YatraBook/Workspace/maps/tourist_density_sos_assam.html")
