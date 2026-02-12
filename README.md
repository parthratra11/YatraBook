# YatraBook

AI-Powered Travel and Safety Platform

---

## Overview

YatraBook is a full-stack travel and safety platform designed to promote secure, transparent, and accessible tourism in remote and rural regions. The system combines AI-driven trip planning, blockchain-based permit verification, IoT-enabled offline safety mechanisms, and real-time administrative dashboards into a unified ecosystem.

The platform focuses on unlocking off-grid destinations while ensuring traveler safety, seamless permit management, and stronger coordination between tourists and authorities.

---

## Problem Statement

Tourism in remote regions faces several challenges:

* Limited connectivity in off-grid areas
* Safety and emergency response delays
* Complex permit and documentation processes
* Lack of verified digital identity systems
* Fragmented planning across multiple platforms

YatraBook addresses these issues through integrated technology solutions.

---

## Key Features

* Digital Tourist ID with secure onboarding
* Blockchain-based permit and document verification using Hyperledger Fabric
* AI-powered trip planning and itinerary recommendations
* Safe route optimization using mapping and weather data
* Real-time safety monitoring and geofencing
* LoRa-based offline SOS alerts and IoT integration
* Automated fall detection and anomaly alerts
* Authority dashboard for monitoring, E-FIR management, and analytics
* Community reporting and safety ratings

---

## System Architecture

YatraBook consists of:

1. Mobile Application (React Native)

   * Tourist onboarding
   * Trip management
   * Emergency alerts
   * Route visualization
   * Offline safety integration

2. Web Dashboard (Next.js)

   * Travel authority admin panel
   * Tourist tracking
   * Weather alerts and reports
   * Safety heatmaps
   * Permit and documentation management

3. Backend & Cloud Services

   * Firebase for authentication and real-time database
   * AWS services for cloud operations
   * Blockchain network via Hyperledger Fabric
   * API integrations for maps, weather, and route planning

4. IoT & Connectivity

   * LoRa mesh network for long-range, low-power communication
   * GPS-based location tracking
   * SOS trigger mechanisms

---

## Tech Stack

Frontend

* React Native
* Next.js

Backend

* Firebase
* AWS

Blockchain

* Hyperledger Fabric

APIs & Integrations

* Google Maps API
* GraphHopper
* OpenWeather API
* OpenStreetMap
* iNaturalist API
* Meta API (alerts and notifications)

IoT

* LoRa Mesh Network
* Accelerometer-based fall detection

---

## Installation

### Mobile App

```bash
cd mobile
npm install
npm start
```

### Web Dashboard

```bash
cd dashboard
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file and configure the following:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret
GOOGLE_MAPS_API_KEY=your_maps_key
OPENWEATHER_API_KEY=your_weather_key
```

---

## Use Case

YatraBook is designed for:

* Tourists traveling to remote and rural destinations
* State travel authorities and tourism departments
* Emergency response teams
* Local businesses and community stakeholders

---

## Impact

* Enhances tourist safety in low-connectivity areas
* Streamlines permit and documentation workflows
* Improves transparency through blockchain verification
* Supports rural economic growth by increasing tourism access
* Provides real-time analytics for authorities
