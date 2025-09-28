# import folium
# import math

# # Center Assam
# assam_center = [26.2, 92.9]
# m = folium.Map(location=assam_center, zoom_start=7, tiles="OpenStreetMap")

# # Weather data for major zones (from leaderboard + cities)
# weather_data = [
#     {
#         "city": "Guwahati City Center",
#         "lat": 26.1445,
#         "lng": 91.7362,
#         "temp": "28°C",
#         "humidity": "72%",
#         "wind": "10 km/h SW",
#         "wind_dir": 225,
#         "condition": "Partly Cloudy",
#     },
#     {
#         "city": "Kaziranga National Park",
#         "lat": 26.5775,
#         "lng": 93.1711,
#         "temp": "27°C",
#         "humidity": "80%",
#         "wind": "8 km/h NE",
#         "wind_dir": 45,
#         "condition": "Rain Showers",
#     },
#     {
#         "city": "Majuli Island",
#         "lat": 26.9546,
#         "lng": 94.203,
#         "temp": "26°C",
#         "humidity": "78%",
#         "wind": "7 km/h N",
#         "wind_dir": 0,
#         "condition": "Cloudy",
#     },
#     {
#         "city": "Manas National Park",
#         "lat": 26.6593,
#         "lng": 90.9391,
#         "temp": "27°C",
#         "humidity": "76%",
#         "wind": "9 km/h W",
#         "wind_dir": 270,
#         "condition": "Thunderstorm",
#     },
#     {
#         "city": "Sivasagar Heritage Zone",
#         "lat": 26.9821,
#         "lng": 94.6426,
#         "temp": "28°C",
#         "humidity": "74%",
#         "wind": "11 km/h E",
#         "wind_dir": 90,
#         "condition": "Sunny",
#     },
#     {
#         "city": "Haflong Hill Station",
#         "lat": 25.1706,
#         "lng": 93.0176,
#         "temp": "25°C",
#         "humidity": "82%",
#         "wind": "6 km/h SE",
#         "wind_dir": 135,
#         "condition": "Rain Showers",
#     },
#     {
#         "city": "Dibrugarh Riverside",
#         "lat": 27.4728,
#         "lng": 94.9120,
#         "temp": "26°C",
#         "humidity": "80%",
#         "wind": "8 km/h NE",
#         "wind_dir": 45,
#         "condition": "Rain Showers",
#     },
#     {
#         "city": "Tezpur Cultural Zone",
#         "lat": 26.6338,
#         "lng": 92.8000,
#         "temp": "28°C",
#         "humidity": "74%",
#         "wind": "11 km/h W",
#         "wind_dir": 270,
#         "condition": "Thunderstorm",
#     },
#     {
#         "city": "Jorhat Tea Gardens",
#         "lat": 26.75,
#         "lng": 94.2167,
#         "temp": "27°C",
#         "humidity": "78%",
#         "wind": "9 km/h NW",
#         "wind_dir": 315,
#         "condition": "Cloudy",
#     },
#     {
#         "city": "Barak Valley",
#         "lat": 24.8333,
#         "lng": 92.8333,
#         "temp": "29°C",
#         "humidity": "75%",
#         "wind": "12 km/h SE",
#         "wind_dir": 135,
#         "condition": "Sunny",
#     },
#     {
#         "city": "Diphu Eco Zone",
#         "lat": 25.84,
#         "lng": 93.43,
#         "temp": "26°C",
#         "humidity": "79%",
#         "wind": "7 km/h S",
#         "wind_dir": 180,
#         "condition": "Cloudy",
#     },
#     {
#         "city": "Silchar Urban Area",
#         "lat": 24.8333,
#         "lng": 92.7789,
#         "temp": "29°C",
#         "humidity": "75%",
#         "wind": "12 km/h SE",
#         "wind_dir": 135,
#         "condition": "Sunny",
#     },
#     {
#         "city": "North Cachar Hills",
#         "lat": 25.5,
#         "lng": 93.0,
#         "temp": "25°C",
#         "humidity": "80%",
#         "wind": "8 km/h NE",
#         "wind_dir": 45,
#         "condition": "Rain Showers",
#     },
#     {
#         "city": "Goalpara Wetlands",
#         "lat": 26.1833,
#         "lng": 90.6167,
#         "temp": "27°C",
#         "humidity": "76%",
#         "wind": "9 km/h W",
#         "wind_dir": 270,
#         "condition": "Thunderstorm",
#     },
#     {
#         "city": "Tinsukia Eco Park",
#         "lat": 27.4922,
#         "lng": 95.3537,
#         "temp": "25°C",
#         "humidity": "82%",
#         "wind": "6 km/h E",
#         "wind_dir": 90,
#         "condition": "Rain Showers",
#     },
#     {
#         "city": "Bongaigaon Urban Zone",
#         "lat": 26.4826,
#         "lng": 90.561,
#         "temp": "27°C",
#         "humidity": "77%",
#         "wind": "7 km/h S",
#         "wind_dir": 180,
#         "condition": "Cloudy",
#     },
#     {
#         "city": "Dhemaji Riverside",
#         "lat": 27.4861,
#         "lng": 94.6167,
#         "temp": "26°C",
#         "humidity": "80%",
#         "wind": "8 km/h NE",
#         "wind_dir": 45,
#         "condition": "Rain Showers",
#     },
#     {
#         "city": "Nagaon Heritage Zone",
#         "lat": 26.35,
#         "lng": 92.6833,
#         "temp": "27°C",
#         "humidity": "77%",
#         "wind": "7 km/h S",
#         "wind_dir": 180,
#         "condition": "Cloudy",
#     },
# ]

# # Add weather markers and wind arrows
# for w in weather_data:
#     popup_html = f"""
#     <b>{w['city']}</b><br>
#     Condition: {w['condition']}<br>
#     Temperature: {w['temp']}<br>
#     Humidity: {w['humidity']}<br>
#     Wind: {w['wind']}
#     """
#     folium.Marker(
#         location=[w["lat"], w["lng"]],
#         popup=popup_html,
#         icon=folium.Icon(color="blue", icon="cloud", prefix="fa"),
#     ).add_to(m)
#     # Add wind arrow (polyline)
#     length = 0.18  # degrees, approx 20km visually
#     angle_rad = math.radians(w.get("wind_dir", 0))
#     end_lat = w["lat"] + length * math.cos(angle_rad)
#     end_lng = w["lng"] + length * math.sin(angle_rad)
#     folium.PolyLine(
#         locations=[[w["lat"], w["lng"]], [end_lat, end_lng]],
#         color="orange",
#         weight=3,
#         opacity=0.7,
#         tooltip=f"Wind: {w['wind']}",
#     ).add_to(m)

# # Save to HTML
# m.save("d:/YatraBook/Workspace/maps/weather_map_assam.html")

import folium
import math
import random
from folium.plugins import HeatMap
import numpy as np

# Set random seed for consistent weather alerts
random.seed(42)

# Center Assam
assam_center = [26.2, 92.9]
m = folium.Map(location=assam_center, zoom_start=7, tiles="OpenStreetMap")

# Weather data for major zones (from leaderboard + cities)
weather_data = [
    {
        "city": "Guwahati City Center",
        "lat": 26.1445,
        "lng": 91.7362,
        "temp": "28°C",
        "temp_val": 28,
        "humidity": "72%",
        "wind": "10 km/h SW",
        "wind_speed": 10,
        "wind_dir": 225,
        "condition": "Partly Cloudy",
        "alert_level": "low"
    },
    {
        "city": "Kaziranga National Park",
        "lat": 26.5775,
        "lng": 93.1711,
        "temp": "27°C",
        "temp_val": 27,
        "humidity": "80%",
        "wind": "8 km/h NE",
        "wind_speed": 8,
        "wind_dir": 45,
        "condition": "Rain Showers",
        "alert_level": "medium"
    },
    {
        "city": "Majuli Island",
        "lat": 26.9546,
        "lng": 94.203,
        "temp": "26°C",
        "temp_val": 26,
        "humidity": "78%",
        "wind": "7 km/h N",
        "wind_speed": 7,
        "wind_dir": 0,
        "condition": "Cloudy",
        "alert_level": "low"
    },
    {
        "city": "Manas National Park",
        "lat": 26.6593,
        "lng": 90.9391,
        "temp": "27°C",
        "temp_val": 27,
        "humidity": "76%",
        "wind": "9 km/h W",
        "wind_speed": 9,
        "wind_dir": 270,
        "condition": "Thunderstorm",
        "alert_level": "high"
    },
    {
        "city": "Sivasagar Heritage Zone",
        "lat": 26.9821,
        "lng": 94.6426,
        "temp": "28°C",
        "temp_val": 28,
        "humidity": "74%",
        "wind": "11 km/h E",
        "wind_speed": 11,
        "wind_dir": 90,
        "condition": "Sunny",
        "alert_level": "low"
    },
    {
        "city": "Haflong Hill Station",
        "lat": 25.1706,
        "lng": 93.0176,
        "temp": "25°C",
        "temp_val": 25,
        "humidity": "82%",
        "wind": "6 km/h SE",
        "wind_speed": 6,
        "wind_dir": 135,
        "condition": "Rain Showers",
        "alert_level": "medium"
    },
    {
        "city": "Dibrugarh Riverside",
        "lat": 27.4728,
        "lng": 94.9120,
        "temp": "26°C",
        "temp_val": 26,
        "humidity": "80%",
        "wind": "8 km/h NE",
        "wind_speed": 8,
        "wind_dir": 45,
        "condition": "Rain Showers",
        "alert_level": "medium"
    },
    {
        "city": "Tezpur Cultural Zone",
        "lat": 26.6338,
        "lng": 92.8000,
        "temp": "28°C",
        "temp_val": 28,
        "humidity": "74%",
        "wind": "11 km/h W",
        "wind_speed": 11,
        "wind_dir": 270,
        "condition": "Thunderstorm",
        "alert_level": "high"
    },
    {
        "city": "Jorhat Tea Gardens",
        "lat": 26.75,
        "lng": 94.2167,
        "temp": "27°C",
        "temp_val": 27,
        "humidity": "78%",
        "wind": "9 km/h NW",
        "wind_speed": 9,
        "wind_dir": 315,
        "condition": "Cloudy",
        "alert_level": "low"
    },
    {
        "city": "Barak Valley",
        "lat": 24.8333,
        "lng": 92.8333,
        "temp": "29°C",
        "temp_val": 29,
        "humidity": "75%",
        "wind": "12 km/h SE",
        "wind_speed": 12,
        "wind_dir": 135,
        "condition": "Sunny",
        "alert_level": "medium"  # High temperature alert
    },
    {
        "city": "Diphu Eco Zone",
        "lat": 25.84,
        "lng": 93.43,
        "temp": "26°C",
        "temp_val": 26,
        "humidity": "79%",
        "wind": "7 km/h S",
        "wind_speed": 7,
        "wind_dir": 180,
        "condition": "Cloudy",
        "alert_level": "low"
    },
    {
        "city": "Silchar Urban Area",
        "lat": 24.8333,
        "lng": 92.7789,
        "temp": "29°C",
        "temp_val": 29,
        "humidity": "75%",
        "wind": "12 km/h SE",
        "wind_speed": 12,
        "wind_dir": 135,
        "condition": "Sunny",
        "alert_level": "medium"  # High temperature alert
    },
    {
        "city": "North Cachar Hills",
        "lat": 25.5,
        "lng": 93.0,
        "temp": "25°C",
        "temp_val": 25,
        "humidity": "80%",
        "wind": "8 km/h NE",
        "wind_speed": 8,
        "wind_dir": 45,
        "condition": "Rain Showers",
        "alert_level": "medium"
    },
    {
        "city": "Goalpara Wetlands",
        "lat": 26.1833,
        "lng": 90.6167,
        "temp": "27°C",
        "temp_val": 27,
        "humidity": "76%",
        "wind": "9 km/h W",
        "wind_speed": 9,
        "wind_dir": 270,
        "condition": "Thunderstorm",
        "alert_level": "high"
    },
    {
        "city": "Tinsukia Eco Park",
        "lat": 27.4922,
        "lng": 95.3537,
        "temp": "25°C",
        "temp_val": 25,
        "humidity": "82%",
        "wind": "6 km/h E",
        "wind_speed": 6,
        "wind_dir": 90,
        "condition": "Rain Showers",
        "alert_level": "medium"
    },
    {
        "city": "Bongaigaon Urban Zone",
        "lat": 26.4826,
        "lng": 90.561,
        "temp": "27°C",
        "temp_val": 27,
        "humidity": "77%",
        "wind": "7 km/h S",
        "wind_speed": 7,
        "wind_dir": 180,
        "condition": "Cloudy",
        "alert_level": "low"
    },
    {
        "city": "Dhemaji Riverside",
        "lat": 27.4861,
        "lng": 94.6167,
        "temp": "26°C",
        "temp_val": 26,
        "humidity": "80%",
        "wind": "8 km/h NE",
        "wind_speed": 8,
        "wind_dir": 45,
        "condition": "Rain Showers",
        "alert_level": "medium"
    },
    {
        "city": "Nagaon Heritage Zone",
        "lat": 26.35,
        "lng": 92.6833,
        "temp": "27°C",
        "temp_val": 27,
        "humidity": "77%",
        "wind": "7 km/h S",
        "wind_speed": 7,
        "wind_dir": 180,
        "condition": "Cloudy",
        "alert_level": "low"
    },
]

# Define weather condition colors and priorities
weather_colors = {
    "Sunny": {"color": "#FFD700", "priority": 1},  # Gold
    "Partly Cloudy": {"color": "#87CEEB", "priority": 2},  # Sky Blue
    "Cloudy": {"color": "#B0C4DE", "priority": 3},  # Light Steel Blue
    "Rain Showers": {"color": "#4169E1", "priority": 4},  # Royal Blue
    "Thunderstorm": {"color": "#8B0000", "priority": 5}   # Dark Red
}

# Create temperature heatmap data
temp_heatmap_data = []
for w in weather_data:
    # Create multiple points around each location for smooth gradients
    base_intensity = (w['temp_val'] - 20) / 15  # Normalize temperature to 0-1
    for i in range(5):  # 5 points around each location
        lat_offset = random.uniform(-0.05, 0.05)
        lng_offset = random.uniform(-0.05, 0.05)
        temp_heatmap_data.append([
            w['lat'] + lat_offset, 
            w['lng'] + lng_offset, 
            max(0.1, min(1.0, base_intensity + random.uniform(-0.1, 0.1)))
        ])

# Add temperature heatmap layer
temp_heatmap = HeatMap(
    temp_heatmap_data,
    radius=40,
    blur=30,
    max_zoom=12,
    gradient={
        0.0: "#0000FF",  # Blue (cold)
        0.3: "#00FFFF",  # Cyan
        0.5: "#00FF00",  # Green
        0.7: "#FFFF00",  # Yellow
        0.9: "#FF8000",  # Orange
        1.0: "#FF0000"   # Red (hot)
    },
    name="Temperature Zones"
)
temp_heatmap.add_to(m)

# Create weather condition zones
condition_zones = folium.FeatureGroup(name="Weather Condition Zones")

for w in weather_data:
    condition = w['condition']
    color_info = weather_colors.get(condition, {"color": "#808080", "priority": 0})
    
    # Create circular zones for each weather condition
    folium.Circle(
        location=[w['lat'], w['lng']],
        radius=15000,  # 15km radius
        color=color_info['color'],
        fillColor=color_info['color'],
        fillOpacity=0.3,
        weight=2,
        popup=f"<b>{w['city']}</b><br>Condition: {condition}",
        tooltip=f"{condition} Zone"
    ).add_to(condition_zones)

condition_zones.add_to(m)

# Generate weather alerts
weather_alerts = []
for w in weather_data:
    alerts = []
    
    # Temperature alerts
    if w['temp_val'] >= 29:
        alerts.append("High Temperature Warning")
    elif w['temp_val'] <= 24:
        alerts.append("Cool Weather Advisory")
    
    # Condition-based alerts
    if w['condition'] == "Thunderstorm":
        alerts.append("Severe Thunderstorm Warning")
    elif w['condition'] == "Rain Showers":
        alerts.append("Heavy Rain Advisory")
    
    # Wind alerts
    if w['wind_speed'] >= 12:
        alerts.append("Strong Wind Warning")
    
    # Humidity alerts
    humidity_val = int(w['humidity'].rstrip('%'))
    if humidity_val >= 80:
        alerts.append("High Humidity Alert")
    
    if alerts:
        weather_alerts.append({
            "city": w['city'],
            "lat": w['lat'],
            "lng": w['lng'],
            "alerts": alerts,
            "condition": w['condition'],
            "alert_level": w['alert_level']
        })

# Add weather alert markers
alert_colors = {
    "high": "red",
    "medium": "orange", 
    "low": "yellow"
}

for alert in weather_alerts:
    alert_color = alert_colors.get(alert['alert_level'], 'gray')
    alert_text = "<br>".join([f"⚠️ {alert}" for alert in alert['alerts']])
    
    folium.Marker(
        location=[alert['lat'], alert['lng']],
        popup=folium.Popup(
            f"<b>Weather Alerts - {alert['city']}</b><br><br>{alert_text}",
            max_width=300
        ),
        tooltip=f"⚠️ {len(alert['alerts'])} Weather Alert(s)",
        icon=folium.Icon(
            color=alert_color, 
            icon="warning-sign",
            prefix="fa"
        )
    ).add_to(m)

# Add enhanced weather station markers with detailed info
weather_stations = folium.FeatureGroup(name="Weather Stations")

for w in weather_data:
    # Weather condition icons
    condition_icons = {
        "Sunny": "sun",
        "Partly Cloudy": "cloud-sun", 
        "Cloudy": "cloud",
        "Rain Showers": "cloud-rain",
        "Thunderstorm": "bolt"
    }
    
    icon_name = condition_icons.get(w['condition'], 'cloud')
    
    popup_html = f"""
    <div style="width: 250px;">
        <h4 style="margin: 0 0 10px 0; color: #333;">{w['city']}</h4>
        <table style="width: 100%; font-size: 12px;">
            <tr><td><b>Condition:</b></td><td>{w['condition']}</td></tr>
            <tr><td><b>Temperature:</b></td><td>{w['temp']}</td></tr>
            <tr><td><b>Humidity:</b></td><td>{w['humidity']}</td></tr>
            <tr><td><b>Wind:</b></td><td>{w['wind']}</td></tr>
            <tr><td><b>Coordinates:</b></td><td>{w['lat']:.3f}, {w['lng']:.3f}</td></tr>
        </table>
    </div>
    """
    
    folium.Marker(
        location=[w["lat"], w["lng"]],
        popup=folium.Popup(popup_html, max_width=280),
        tooltip=f"{w['city']}: {w['condition']}, {w['temp']}",
        icon=folium.Icon(
            color="blue", 
            icon=icon_name, 
            prefix="fa"
        )
    ).add_to(weather_stations)

weather_stations.add_to(m)

# Add enhanced wind current arrows
wind_currents = folium.FeatureGroup(name="Wind Currents")

for w in weather_data:
    # Calculate arrow endpoints
    length = 0.12 + (w['wind_speed'] / 100)  # Scale arrow length by wind speed
    angle_rad = math.radians(w.get("wind_dir", 0))
    
    end_lat = w["lat"] + length * math.cos(angle_rad)
    end_lng = w["lng"] + length * math.sin(angle_rad)
    
    # Color code by wind speed
    if w['wind_speed'] >= 12:
        wind_color = "red"
        wind_weight = 5
    elif w['wind_speed'] >= 8:
        wind_color = "orange" 
        wind_weight = 4
    else:
        wind_color = "blue"
        wind_weight = 3
    
    # Main wind arrow
    folium.PolyLine(
        locations=[[w["lat"], w["lng"]], [end_lat, end_lng]],
        color=wind_color,
        weight=wind_weight,
        opacity=0.8,
        tooltip=f"Wind: {w['wind']} | Speed: {w['wind_speed']} km/h"
    ).add_to(wind_currents)
    
    # Arrow head (triangle)
    arrow_size = 0.02
    left_angle = angle_rad + 2.5
    right_angle = angle_rad - 2.5
    
    left_lat = end_lat - arrow_size * math.cos(left_angle)
    left_lng = end_lng - arrow_size * math.sin(left_angle)
    right_lat = end_lat - arrow_size * math.cos(right_angle)
    right_lng = end_lng - arrow_size * math.sin(right_angle)
    
    folium.PolyLine(
        locations=[[end_lat, end_lng], [left_lat, left_lng]],
        color=wind_color,
        weight=wind_weight,
        opacity=0.8
    ).add_to(wind_currents)
    
    folium.PolyLine(
        locations=[[end_lat, end_lng], [right_lat, right_lng]],
        color=wind_color,
        weight=wind_weight,
        opacity=0.8
    ).add_to(wind_currents)

wind_currents.add_to(m)

# Add layer control
folium.LayerControl().add_to(m)

# Print statistics
print("Weather Map Statistics:")
print(f"Total weather stations: {len(weather_data)}")
print(f"Weather alerts generated: {len(weather_alerts)}")
print(f"Temperature range: {min(w['temp_val'] for w in weather_data)}°C - {max(w['temp_val'] for w in weather_data)}°C")

# Alert summary
alert_summary = {}
for alert in weather_alerts:
    level = alert['alert_level']
    alert_summary[level] = alert_summary.get(level, 0) + 1

print("\nAlert Level Summary:")
for level, count in alert_summary.items():
    print(f"  {level.title()} alerts: {count}")

print("\nActive Weather Alerts:")
for alert in weather_alerts:
    print(f"  {alert['city']}: {', '.join(alert['alerts'])}")

# Save to HTML
m.save("d:/YatraBook/Workspace/maps/enhanced_weather_map_assam.html")
print(f"\nEnhanced weather map saved to: d:/YatraBook/Workspace/maps/enhanced_weather_map_assam.html")