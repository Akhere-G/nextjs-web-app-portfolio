# Missing Information Questions

This document lists information that was not present in the project detail markdown files (`filequery-details.md`, `triptrack-details.md`, `gains-details.md`, `taskflow-details.md`) or previous codebase data, but is supported by the `Project` type in [`lib/data.ts`](file:///Users/Akhere/Documents/React%20projects/nextjs-web-app-portfolio/lib/data.ts) and displayed on the project detail page [`app/projects/[slug]/page.tsx`](file:///Users/Akhere/Documents/React%20projects/nextjs-web-app-portfolio/app/projects/[slug]/page.tsx).

You can review these questions whenever convenient and provide answers to further enrich your portfolio.

---

## 1. TripTrack (`/projects/trip-track`)
- **Challenges (`challenges?: string[]`)**:
  - What were 2–3 key technical challenges you overcame when building TripTrack? (e.g. handling real-time synchronization conflicts, managing Google Maps rate limits or complex spatial coordinate calculations, state syncing between calendar and map views) I had used naive datetimes for event start and end times. When I added notifications later, I had to backfill previous by trips by  adding a timezone (obtained using trip coordinates), convert all event startat times (by considering the events as written in the trip timezone and then convertings and saving it to utc). Then on the frontend, I had to convert dates received from the backend to the trip timezone and intrpret dates users write when creating events as in the trip timezone before converting to utc. I had to consider how to backfill data during a migration without distupting current users. I made changes in a branch and only pushed to main when the migration was complete, data was backfilled and the frontend fixed.
- **Tradeoffs & Decisions (`tradeoffs?: string`)**:
  - What architectural tradeoffs did you make? (e.g., choosing Redux Toolkit with RTK Query vs. Zustand/TanStack Query; using Flask vs. FastAPI or Node for the backend) I used redux for state management to reduce propdrilling and to share state easier, add simple caching though that leadto complex set up and a lot of boiler plate. 
- **Measurable Impact (`impact?: string`)**:
  - What was the impact, user reception, or performance improvement achieved? (e.g., benchmark latency reduction for route optimization, user engagement metrics, or personal milestone). As a result of this app, users were able to save time planning trips and several trips have been plannned with the app. I also learnt how to use the google maps api for places, maps, directions, geoencoding and their timezone api and represent coordindate data better.

---

## 2. FileQuery (`/projects/file-query`)
- **Challenges (`challenges?: string[]`)**:
  - What specific challenges arose during RAG pipeline implementation? (e.g. chunk boundary preservation for tables/markdown, handling cold starts with AWS Lambda workers, tuning pgvector cosine distance thresholds to minimize hallucination). The main issues was figuring out the best chunking strategy and making the actualy RAG more effective. I decided to go with langchain as it was an already tested and effective solution for recursive text splitting and markdown structural chunking. When it came to testing the RAG, I ended up using query rewriting, hybrid search (seamantic and keyword), and reranking. I tested the search with a range of questions and saw which chunks were obtained as well as the similarity score.
- **Tradeoffs & Decisions (`tradeoffs?: string`)**:
  - Why did you choose Amazon Titan Text Embeddings V2 & Amazon Nova Micro over OpenAI / Anthropic models? I chose Amazon as I was already using s3 and sqs and wanted to keep costs down.
  - What were the tradeoffs of using AWS SQS + Lambda for async processing instead of Celery/Redis or FastAPI background tasks? Using aws means that the queue is fully managed. I do not have to worry about infrastructure or maintaince. The cons is the cost can become high but for a small portfolio project this is fine.  
- **Measurable Impact (`impact?: string`)**:
  - What throughput, latency, or retrieval accuracy numbers did you observe? (e.g., average response time under 1.5s, support for documents up to 50MB, zero hallucinations on reference tests). I was able to search through a range of documents effectively with zero hallucinations. I occasionaly use the app to search through large development docs.

---

## 3. Gains (`/projects/gains`)
- **Challenges (`challenges?: string[]`)**:
  - What challenges did you face when designing the live session logging state machine or real-time 1RM calculations? The main issues was learning nextjs and figuring out when to use server or client components, as well as ensuring the UX was clear and intuitive. I made many of the app screens in figma before implementing them to get a better feel of the UI and planned ahead for many important screens such as error, loading and empty states.****
  - Any difficulties in ensuring low-latency inputs during an active workout session on mobile devices? Data is saved lcoally while the user edits the workout to local storage and then only sent to the backend to be saved when the workout is complete. This ensures that data presists if the app is accidentlally closed or crashed as data is stored in local storage. It also ensures that the user doesn't have to wait for connection to add/save a set , which is important as gyms usually have bad wifi.
- **Tradeoffs & Decisions (`tradeoffs?: string`)**:
  - Why did you select Zustand over Redux Toolkit for this project? I wanted a simply state management system with little boilerplate that is easy for client components components to subscribe to.
  - How did you decide between calculating telemetry on the client vs. server-side aggregation in FastAPI/PostgreSQL?
- **Measurable Impact (`impact?: string`)**:
  - Are there specific performance benchmarks (e.g. bundle size reduction, instantaneous offline capability, speed of logging sets)? I was able to track my fitness and progress over the a few months and make improvements to my routine using my routine maker page.

---

## 4. TaskFlow (`/projects/task-flow`)
- **Challenges (`challenges?: string[]`)**:
  - What technical hurdles did you encounter when implementing future-projected "ghost tasks" on the calendar? I had to choose between batch generation or ghost tasks. Ghost tasks are when there is one instance of a repeating task and future instances are calculated when needed. Batch generation is when future instances are continously generated at set points. Ghost tasks allow for fewwer records in the database but have complex set up and display logic. Hoever, they are easier to edit than batch generated repeating tasks and do not require any scheduling to generate.
  - How did you handle edge cases in natural language quick-add parsing and Pomodoro session interruption recovery? n/a
- **Tradeoffs & Decisions (`tradeoffs?: string`)**:
  - What tradeoffs led to choosing TanStack Query + Axios over RTK Query or Next.js Server Actions? Tanstack query + axios provides a simple state management and http client with less boiler plate, interceptors to handle jwt tokens expiring, and more. For a small app such as this, redux would be bloated and excessive. 
  - Why choose Recharts over Chart.js or D3 for workload telemetry?
- **Measurable Impact (`impact?: string`)**:
  - Did the AI coach or Pomodoro integration yield quantifiable productivity gains or user feedback? I was able to track my productivity and analysis where I spent most of my time. This project helped me otice tasks that I kept procrastinating and helped me to break down those tasks using the decompose feature

---

## 5. Expense Tracker (`/projects/expense-tracker`)
- **Database Schema (`databaseSchemaSrc`)**:
  - Do you have an architectural or database schema diagram image (SVG/PNG) for the MongoDB models (Users, Transactions, Invoices)? No
- **Challenges, Tradeoffs & Impact**:
  - Would you like to add specific challenges (e.g. MongoDB aggregation pipelines for expense categorization), tradeoffs (MERN vs SQL), and impact metrics? This app helped me learn MongoDB and familiarise myself with important backend concepts such as (list 3) earlier in my develeopment career.

---

## 6. Movie Search (`/projects/movie-search`)
- **Database Schema / Architecture Diagram (`databaseSchemaSrc`)**:
  - Is there a component hierarchy or architecture diagram image for the HOC fade-in animation system? Nope
- **Challenges, Tradeoffs & Impact**:
  - Would you like to include challenges (e.g. debounce handling, image preloading, pagination boundary handling) and tradeoffs (Context API vs Redux for smaller projects)? Learning about debouncing and pagination early in my development career and the important of clear UX for users.
