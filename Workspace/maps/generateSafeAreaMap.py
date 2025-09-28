import folium
from datetime import datetime
import math

# Center Assam
assam_center = [26.2, 92.9]
m = folium.Map(location=assam_center, zoom_start=7, tiles="OpenStreetMap")

# Many safe/unsafe zones with varied radii, marked dates, and detailed reasons
areas = [
    {"name": "Guwahati City Center", "lat": 26.1445, "lng": 91.7362, "status": "Safe", "description": "Low crime rate, high police presence, well-lit streets.", "marked_on": "2025-01-08", "radius": 12000},
    {"name": "Kaziranga National Park", "lat": 26.5775, "lng": 93.1711, "status": "Safe", "description": "Protected wildlife zone, regular patrols, tourist-friendly.", "marked_on": "2025-01-07", "radius": 18000},
    {"name": "Manas National Park", "lat": 26.6593, "lng": 90.9391, "status": "Unsafe", "description": "Recent wildlife incidents, limited emergency access.", "marked_on": "2025-01-06", "radius": 16000},
    {"name": "Sivasagar Heritage Zone", "lat": 26.9821, "lng": 94.6426, "status": "Safe", "description": "Tourist zone, monitored by local authorities.", "marked_on": "2025-01-05", "radius": 11000},
    {"name": "Border Area (Assam-Meghalaya)", "lat": 25.9, "lng": 92.5, "status": "Unsafe", "description": "Reported trespassing and cross-border incidents.", "marked_on": "2025-01-04", "radius": 20000},
    {"name": "Silchar Urban Area", "lat": 24.8333, "lng": 92.7789, "status": "Safe", "description": "Urban center, good medical and police facilities.", "marked_on": "2025-01-03", "radius": 13000},
    {"name": "North Cachar Hills", "lat": 25.5, "lng": 93.0, "status": "Unsafe", "description": "Remote region, limited connectivity, recent landslides.", "marked_on": "2025-01-02", "radius": 17000},
    {"name": "Goalpara Wetlands", "lat": 26.1833, "lng": 90.6167, "status": "Safe", "description": "Eco-tourism zone, regular monitoring, safe for visitors.", "marked_on": "2025-01-01", "radius": 14000},
    {"name": "Jorhat Tea Gardens", "lat": 26.75, "lng": 94.2167, "status": "Safe", "description": "Well-managed tea estates, regular security patrols.", "marked_on": "2025-01-08", "radius": 10000},
    {"name": "Barak Valley", "lat": 24.8333, "lng": 92.8333, "status": "Safe", "description": "Scenic region, moderate population, low incident rate.", "marked_on": "2025-01-07", "radius": 15000},
    {"name": "Diphu Eco Zone", "lat": 25.84, "lng": 93.43, "status": "Safe", "description": "Eco-tourism, active local monitoring, safe for families.", "marked_on": "2025-01-06", "radius": 12000},
    {"name": "Dibrugarh Riverside", "lat": 27.4728, "lng": 94.9120, "status": "Unsafe", "description": "Flood-prone area, recent thefts reported.", "marked_on": "2025-01-05", "radius": 17000},
    {"name": "Tezpur Cultural Zone", "lat": 26.6338, "lng": 92.8000, "status": "Safe", "description": "Cultural hub, frequent events, good emergency response.", "marked_on": "2025-01-04", "radius": 11000},
    {"name": "Haflong Hill Station", "lat": 25.1706, "lng": 93.0176, "status": "Safe", "description": "Hill station, tourist-friendly, regular police patrols.", "marked_on": "2025-01-03", "radius": 13000},
    {"name": "Bongaigaon Urban Zone", "lat": 26.4826, "lng": 90.561, "status": "Safe", "description": "Urban center, moderate crime, active community watch.", "marked_on": "2025-01-02", "radius": 12000},
    {"name": "Dhemaji Riverside", "lat": 27.4861, "lng": 94.6167, "status": "Unsafe", "description": "Flooding risk, limited medical facilities.", "marked_on": "2025-01-01", "radius": 18000},
    {"name": "Tinsukia Eco Park", "lat": 27.4922, "lng": 95.3537, "status": "Safe", "description": "Nature park, regular staff patrols, safe for visitors.", "marked_on": "2025-01-08", "radius": 10000},
    {"name": "Majuli Island", "lat": 26.9546, "lng": 94.203, "status": "Unsafe", "description": "Seasonal flooding, ferry delays, limited emergency access.", "marked_on": "2025-01-07", "radius": 16000},
    {"name": "Nagaon Heritage Zone", "lat": 26.35, "lng": 92.6833, "status": "Safe", "description": "Heritage sites, local authority monitoring.", "marked_on": "2025-01-06", "radius": 11000},
    {"name": "Sonitpur Forest Area", "lat": 26.7, "lng": 92.9, "status": "Unsafe", "description": "Wildlife movement, restricted access, recent incidents.", "marked_on": "2025-01-05", "radius": 20000},
    {"name": "Karimganj Border", "lat": 24.86, "lng": 92.36, "status": "Unsafe", "description": "Border zone, recent trespassing, limited security.", "marked_on": "2025-01-04", "radius": 17000},
    {"name": "Morigaon Town", "lat": 26.25, "lng": 92.34, "status": "Safe", "description": "Town area, active police, low incident rate.", "marked_on": "2025-01-03", "radius": 12000},
    {"name": "Lakhimpur Riverside", "lat": 27.2, "lng": 94.1, "status": "Unsafe", "description": "Flood-prone, recent evacuation, limited access.", "marked_on": "2025-01-02", "radius": 18000},
    {"name": "Dima Hasao Hills", "lat": 25.5, "lng": 93.2, "status": "Safe", "description": "Hill region, eco-tourism, regular monitoring.", "marked_on": "2025-01-01", "radius": 13000},
    {"name": "Nalbari Town", "lat": 26.44, "lng": 91.45, "status": "Safe", "description": "Town area, good civic amenities, low crime.", "marked_on": "2025-01-08", "radius": 11000},
    {"name": "Baksa Forest", "lat": 26.65, "lng": 91.15, "status": "Unsafe", "description": "Dense forest, wildlife movement, restricted entry.", "marked_on": "2025-01-07", "radius": 19000},
    {"name": "Sadiya Border", "lat": 27.83, "lng": 95.6, "status": "Unsafe", "description": "Border zone, recent security incidents.", "marked_on": "2025-01-06", "radius": 17000},
    {"name": "Dhubri Riverside", "lat": 26.02, "lng": 89.97, "status": "Unsafe", "description": "Flood-prone, limited rescue access.", "marked_on": "2025-01-05", "radius": 18000},
    {"name": "Mangaldoi Town", "lat": 26.43, "lng": 92.03, "status": "Safe", "description": "Town area, active police, safe for tourists.", "marked_on": "2025-01-04", "radius": 12000},
    {"name": "Hojai Urban Area", "lat": 26.0, "lng": 92.85, "status": "Safe", "description": "Urban center, good medical facilities.", "marked_on": "2025-01-03", "radius": 11000},
    {"name": "Udalguri Forest", "lat": 26.75, "lng": 92.13, "status": "Unsafe", "description": "Forest zone, recent wildlife incidents.", "marked_on": "2025-01-02", "radius": 20000},
    {"name": "Biswanath Chariali", "lat": 26.73, "lng": 93.13, "status": "Safe", "description": "Town area, regular patrols, safe for families.", "marked_on": "2025-01-01", "radius": 12000},
    {"name": "Moranhat", "lat": 27.1, "lng": 94.9, "status": "Safe", "description": "Small town, low incident rate.", "marked_on": "2025-01-08", "radius": 10000},
    {"name": "Dhekiajuli", "lat": 26.7, "lng": 92.5, "status": "Safe", "description": "Town area, active community watch.", "marked_on": "2025-01-07", "radius": 11000},
    {"name": "Gohpur", "lat": 26.88, "lng": 93.63, "status": "Safe", "description": "Town area, good emergency response.", "marked_on": "2025-01-06", "radius": 12000},
    {"name": "Bilasipara", "lat": 26.23, "lng": 90.23, "status": "Unsafe", "description": "Flood-prone, limited medical facilities.", "marked_on": "2025-01-05", "radius": 17000},
    {"name": "Sibsagar", "lat": 26.98, "lng": 94.63, "status": "Safe", "description": "Heritage town, monitored by authorities.", "marked_on": "2025-01-04", "radius": 11000},
    {"name": "Jorabat", "lat": 25.97, "lng": 91.89, "status": "Safe", "description": "Entry point, high police presence.", "marked_on": "2025-01-03", "radius": 12000},
    {"name": "Duliajan", "lat": 27.36, "lng": 95.32, "status": "Safe", "description": "Oil town, regular security patrols.", "marked_on": "2025-01-02", "radius": 10000},
    {"name": "Tinsukia Town", "lat": 27.49, "lng": 95.36, "status": "Safe", "description": "Urban center, good civic amenities.", "marked_on": "2025-01-01", "radius": 11000},
    # Restricted areas (forests, borders, etc.)
    {"name": "Dampa Tiger Reserve", "lat": 24.25, "lng": 92.45, "status": "Restricted", "description": "Tiger reserve, entry only with permit. Restricted for wildlife protection.", "marked_on": "2025-01-09", "radius": 22000},
    {"name": "Nameri National Park", "lat": 26.94, "lng": 92.85, "status": "Restricted", "description": "Sensitive forest area, restricted for conservation. Entry only for research.", "marked_on": "2025-01-08", "radius": 20000},
    {"name": "Assam-Arunachal Border Forest", "lat": 27.15, "lng": 93.92, "status": "Restricted", "description": "Border forest, restricted due to security and wildlife movement.", "marked_on": "2025-01-07", "radius": 21000},
    {"name": "Burachapori Wildlife Sanctuary", "lat": 26.65, "lng": 92.45, "status": "Restricted", "description": "Wildlife sanctuary, restricted for habitat protection.", "marked_on": "2025-01-06", "radius": 18000},
    {"name": "Chakrashila Wildlife Sanctuary", "lat": 26.25, "lng": 90.25, "status": "Restricted", "description": "Restricted for Golden Langur conservation.", "marked_on": "2025-01-05", "radius": 17000},
    {"name": "Border Area (Assam-Nagaland)", "lat": 26.0, "lng": 94.0, "status": "Restricted", "description": "Border zone, restricted due to cross-border security.", "marked_on": "2025-01-04", "radius": 20000},
]

def haversine(lat1, lng1, lat2, lng2):
    """Returns distance in meters between two lat/lng points"""
    R = 6371000  # Earth's radius in meters
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lng2 - lng1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

# Define status colors
status_colors = {
    "Safe": "green",
    "Unsafe": "red", 
    "Restricted": "purple"
}

# Add all areas to the map without filtering overlaps
# (The original filtering logic was removing too many markers)
for area in areas:
    color = status_colors.get(area["status"], "gray")
    
    # Create detailed popup with date and description
    popup_html = f"""
    <div style="width: 280px; font-family: Arial, sans-serif;">
        <h4 style="margin:0 0 10px 0; color:{color}; border-bottom: 2px solid {color}; padding-bottom: 5px;">
            {area['name']}
        </h4>
        <p style="margin: 5px 0;">
            <b>Status:</b> <span style="color:{color}; font-weight: bold;">{area['status']}</span>
        </p>
        <p style="margin: 5px 0;">
            <b>Reason for Classification:</b><br>
            <em>{area['description']}</em>
        </p>
        <p style="margin: 5px 0;">
            <b>Date Plotted:</b> {area['marked_on']}
        </p>
        <p style="margin: 5px 0; font-size: 11px; color: #666;">
            <b>Coverage Radius:</b> {area.get('radius', 12000)/1000:.1f} km
        </p>
    </div>
    """
    
    # Determine fill opacity based on status
    fill_opacity = {
        "Safe": 0.4,
        "Unsafe": 0.6, 
        "Restricted": 0.5
    }.get(area["status"], 0.4)
    
    # Add circle marker to map
    folium.Circle(
        location=[area["lat"], area["lng"]],
        radius=area.get("radius", 12000),
        color=color,
        fill=True,
        fill_color=color,
        fill_opacity=fill_opacity,
        weight=2,
        popup=folium.Popup(popup_html, max_width=300),
        tooltip=f"{area['name']} ({area['status']}) - Plotted: {area['marked_on']}"
    ).add_to(m)

# Add a legend to the map
# legend_html = '''
# <div style="position: fixed; 
#      bottom: 50px; left: 50px; width: 200px; height: 120px; 
#      background-color: white; border:2px solid grey; z-index:9999; 
#      font-size:14px; padding: 10px">
#      <h4 style="margin-top: 0;">Legend</h4>
#      <p><span style="color:green;">●</span> Safe Areas</p>
#      <p><span style="color:red;">●</span> Unsafe Areas</p> 
#      <p><span style="color:purple;">●</span> Restricted Areas</p>
#      <p style="font-size:12px; margin-top:10px;">Click markers for details</p>
# </div>
# '''
# m.get_root().html.add_child(folium.Element(legend_html))

# # Add title to the map
# title_html = '''
# <div style="position: fixed; 
#      top: 10px; left: 50%; transform: translateX(-50%); 
#      background-color: rgba(255,255,255,0.9); border: 2px solid #333; 
#      z-index:9999; padding: 10px; border-radius: 5px;">
#      <h3 style="margin: 0; text-align: center; color: #333;">
#          Assam Safety & Security Zone Map
#      </h3>
# </div>
# '''
# m.get_root().html.add_child(folium.Element(title_html))

# Save the map
m.save("d:/YatraBook/Workspace/maps/safe_unsafe_area_map_assam.html")
print("Map saved successfully with detailed descriptions and dates!")