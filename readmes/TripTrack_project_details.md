# TripTrack

Travel planning, simplified. TripTrack replaces messy spreadsheets and endless browser tabs with a single unified platform to plan routes, collaborate with friends, and let AI handle the logistical heavy lifting.

**🔗 [Live Deployment](https://tripapp-752853711822.europe-west2.run.app/)**

---

## Why Use TripTrack?

* **AI Trip Generator:** Turn a single sentence into a complete trip plan in seconds. Describe where you want to go and what you enjoy, and the AI builds the itinerary for you.
* **AI Trip Editing:** Change your plan just by asking, whether that's moving a dinner or adding a day. Every AI change is shown for your review before it's applied, so you stay in control.
* **Smart Planning:** Fill empty hours with ideas, fix timing clashes and draft packing lists in one step. Every suggestion waits for your approval, so nothing changes without you.
* **Realtime Collaboration:** Everyone in your group sees changes the moment they happen, on every device. No more chasing the latest version through a group chat.
* **Google Calendar Sync:** Keep each trip in step with Google Calendar, with changes flowing both ways. The whole group always has the right plan in their own calendar.
* **Flight Search:** Search for flights without leaving your trip and keep each one beside your itinerary. Arrival times and plans stay lined up in one place.
* **Map & Calendar View:** See your schedule and your map on one clean screen. You'll know exactly where to be and how to get there without switching apps.
* **Budget & Expenses:** Track what everyone spends, split costs and settle up in a few clicks. No awkward maths and no chasing friends for money.
* **Trip Templates:** Start from a premade destination template and make it yours in seconds. Skip the blank page and get planning straight away.
* **Google Event Search:** Find restaurants, museums and hidden landmarks using Google's database. Add the spots you love to your trip with a single click.
* **Admin & Viewer Roles:** Stay in control of who changes what. Give co-planners full editing rights, or let others follow the plan without altering it.
* **Calendar & Word Export:** Take your plans anywhere with an .ics file for any calendar app, or download the whole trip as a Word document to share.

---

## Technical Architecture

TripTrack is engineered as a decoupled, modern full-stack web application optimised for rapid geodata rendering and real-time client state synchronisation.

### Frontend Client

The presentation layer operates as a highly responsive single-page application built around structured validation and strict type safety.

* **Core Framework:** React with TypeScript
* **State Management:** Redux (Global trip and itinerary syncing)
* **Data Validation:** Yup (Client-side schema validation prior to API transmission)
* **Mapping Integration:** Google Maps API (Spatial visualisations and path planning)

### Backend Services

The backend API handles core business logic, strict relational database mapping, and conversational AI prompt parsing.

* **Language & Framework:** Python with Flask (Application Factory Pattern)
* **Database ORM:** SQLAlchemy (Modern relational schemas)
* **Serialization/Parsing:** Marshmallow (Strict data type marshalling and clean API contracts)
* **AI Engine:** Gemini AI (Powering day planning, itinerary optimization, and travel tips)

---

## Technology Matrix

| Layer | Component | Primary Objective |
| :--- | :--- | :--- |
| **Frontend** | React / TypeScript | Component layout architecture and type safety |
| **State & Validation** | Redux / Yup | Real-time state synchronization and form validation |
| **Backend API** | Python / Flask | Scalable RESTful endpoint orchestration |
| **Database ORM** | SQLAlchemy | Relational state structure and transaction mapping |
| **Serialization** | Marshmallow | API input validation and JSON formatting schemas |
| **Integrations** | Google Maps / Gemini / Google Calendar | Interactive geo-tracking, automated AI intelligence and two-way calendar sync |
