export interface Project {
  title: string;
  slug: string;
  url: string;
  img: string;
  desc: string;
  pitch: string;
  coreProblem: string;
  github: string[];
  technologies: string[];
  features?: string[];
  architecture?: string;
  databaseSchemaSrc?: { url: string; width: number; height: number };
  challenges?: string[];
  tradeoffs?: string;
  impact?: string;
  whyBuilt?: string;
}

const data: Project[] = [
  {
    title: "TripTrack",
    slug: "trip-track",
    url: "https://tripapp-752853711822.europe-west2.run.app/",
    img: "/assets/tripTrackPage.png",
    desc: "A collaborative holiday and event planning web app that combines interactive maps and daily calendar views with AI itinerary tools. Users can generate daily schedules with AI, optimise routes to cut travel time, and discover local places. Groups can plan together in real time with Admin and Viewer permissions, search venues with Google, and export their plans to their favourite calendar app.",
    pitch:
      "Replaces messy spreadsheets and scattered browser tabs with a single shared workspace for group trip planning, route optimisation, and AI itineraries.",
    coreProblem:
      "Planning holidays with friends usually means juggling messy spreadsheets, pinned map links, and endless WhatsApp messages. TripTrack brings schedules, maps, and real-time group collaboration into one clear place so everyone stays on the same page.",
    github: ["https://github.com/Akhere-G/event-planner"],
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "Yup",
      "Google Maps API",
      "Python",
      "Flask",
      "SQLAlchemy",
      "Marshmallow",
      "Gemini AI",
    ],
    features: [
      "Map & Calendar View: View your schedule and route side by side so you never have to jump between separate apps.",
      "AI Day Planner: Create custom day itineraries in seconds using Gemini AI recommendations.",
      "AI Route Optimiser: Automatically reorders stops to cut down travel time and avoid scheduling conflicts.",
      "Real-Time Group Planning: Invite friends to plan together with live updates across all devices.",
      "Admin & Viewer Roles: Give organisers full editing rights while keeping itineraries read-only for other guests.",
      "Google Places Search: Search restaurants, attractions, and landmarks directly and add them to your day in one click.",
      "AI Travel Tips: Get helpful local advice tailored to your destination, including the best times to visit and local food recommendations.",
      "Calendar Export: Download itineraries directly to your personal calendar (Google, Apple, Outlook) for offline access.",
    ],
    architecture: `Frontend:
• Built with React and TypeScript as a fast, responsive Single-Page Application (SPA).
• Redux Toolkit manages global trip data and keeps map and calendar views in sync.
• Yup handles form validation before requests are sent to the API.
• Google Maps API renders interactive maps, routes, and place details.

Backend:
• Python and Flask API structured with the Application Factory pattern for clean modularity.
• SQLAlchemy ORM manages relational data models, foreign keys, and transactions.
• Marshmallow validates incoming requests and formats JSON responses cleanly.
• Gemini AI powers itinerary suggestions, route organisation, and travel tips.`,
    challenges: [
      "Handling Timezones & Zero-Downtime Data Migration: Start and end times were initially saved as timezone-naive dates. When adding reminder notifications, every trip needed a proper timezone derived from its map coordinates. All existing event times had to be converted from local trip time into UTC in the database, and the frontend updated to display them in the holiday's local timezone. To avoid breaking things for active users, this migration was tested on a dedicated branch with custom backfill scripts before deploying seamlessly to production.",
      "Synchronising Calendar & Map State: Keeping a live map view, an event schedule, and a list of locations completely in sync required careful state design so adding, moving, or deleting an activity updated both views instantly without unnecessary re-renders.",
    ],
    tradeoffs:
      "Chose Redux Toolkit for central state management to prevent prop drilling and make it easy to share trip data between the map and calendar components. While Redux introduced some setup boilerplate compared to lighter libraries, it made complex state updates predictable and added straightforward client caching.",
    impact:
      "Helped friends and early users plan several real-world holidays with zero spreadsheet headaches. It also deepened practical experience with the Google Maps suite (Places, Directions, Geocoding, and Timezone APIs) and handling real-world geospatial and datetime data.",
    whyBuilt:
      "Created to solve the real-world frustration of group travel coordination by combining interactive mapping, clean data synchronisation, and helpful AI automation.",
    databaseSchemaSrc: {
      url: "/assets/triptrack_schema.svg",
      width: 1200,
      height: 600,
    },
  },
  {
    title: "FileQuery",
    slug: "file-query",
    url: "https://file-query-frontend-752853711822.europe-west1.run.app/",
    img: "/assets/fileQueryPage.png",
    desc: "A full-stack document search and Q&A platform that lets users upload documents into project folders and ask questions answered strictly from their files using Retrieval-Augmented Generation (RAG). It extracts text, breaks documents into smart sections, uses hybrid keyword and semantic search, and produces accurate AI answers with source citations.",
    pitch:
      "A document question-answering tool using production-ready RAG to give accurate, hallucination-free answers grounded strictly in your uploaded files.",
    coreProblem:
      "General AI models like ChatGPT often make up answers or cannot read private business files. FileQuery solves this by letting users upload private documents, indexing them with vector search, and forcing the AI to answer solely based on the uploaded content.",
    github: ["https://github.com/Akhere-G/file-query"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python 3.14",
      "SQLAlchemy 2.0",
      "PostgreSQL",
      "pgvector",
      "LangChain",
      "AWS S3",
      "AWS SQS",
      "AWS Lambda",
      "Amazon Titan Text Embeddings V2",
      "Amazon Nova Micro",
      "Google Cloud Run",
    ],
    features: [
      "Project Knowledge Bases: Group documents into distinct project workspaces so queries only search the relevant files.",
      "Multi-Format Ingestion: Upload and extract content from PDF, DOC, DOCX, CSV, Markdown, and TXT files.",
      "Smart Document Chunking: Uses LangChain to split text naturally while keeping headings and tables intact.",
      "Hybrid Semantic & Keyword Search: Combines keyword search with pgvector embeddings to find the most relevant document sections.",
      "Query Rewriting: Automatically turns follow-up questions (such as 'What about the second option?') into clear search queries.",
      "Grounded AI Answers: Powered by Amazon Nova Micro, trained to only answer using retrieved text and avoid hallucinations.",
      "Background File Processing: Uploaded files are processed asynchronously using AWS SQS and Lambda so the web app never freezes.",
      "Source Citations: Each answer highlights the exact document snippets used, allowing users to verify facts quickly.",
    ],
    architecture: `Frontend:
• Next.js with TypeScript and Tailwind CSS for a fast, modern user experience.
• Server Actions and secure HTTP-only cookies for authenticated API communication.

Backend & Vector Search:
• Python 3.14 with FastAPI providing fast, documented RESTful endpoints.
• PostgreSQL database with the pgvector extension for high-speed semantic similarity searches.
• SQLAlchemy 2.0 ORM for robust database querying.

Cloud & Async Pipeline:
• Files are uploaded securely to Amazon S3.
• An Amazon SQS queue triggers an AWS Lambda worker to extract text, create chunks via LangChain, and generate vector embeddings with Amazon Titan Text Embeddings V2.
• When a user asks a question, FastAPI rewrites the prompt, retrieves the best matching chunks with pgvector, and calls Amazon Nova Micro to generate the answer. Hosted on Google Cloud Run.`,
    challenges: [
      "Finding the Optimal Chunking Strategy: Splitting text into pieces that are too small loses context, while chunks that are too large dilute search accuracy. Evaluated different chunk sizes and overlaps using LangChain's recursive markdown splitter to preserve document headers and table structures.",
      "Tuning RAG Retrieval Quality: Basic vector search sometimes missed specific terms or returned weak matches. Improved accuracy by adding conversational query rewriting, hybrid search (combining exact keyword matching with vector similarity), and similarity score filtering across diverse test question sets.",
    ],
    tradeoffs:
      "Chose Amazon Titan Embeddings and Amazon Nova Micro over OpenAI to keep running costs minimal while remaining inside the AWS ecosystem alongside S3 and SQS. Used fully managed AWS SQS and Lambda for background processing instead of running a self-hosted Celery/Redis cluster; this added minor cold-start latency but removed all server maintenance and operational overhead.",
    impact:
      "Successfully delivers fast, accurate document Q&A across multi-page technical manuals and reports with zero hallucinations. I regularly uses it as a personal tool to search complex developer documentation.",
    whyBuilt:
      "Engineered to demonstrate a real-world, cloud-native RAG pipeline that handles asynchronous file ingestion, vector search in PostgreSQL, and dependable AI answer generation.",
    databaseSchemaSrc: {
      url: "/assets/filequery_schema.png",
      width: 500,
      height: 400,
    },
  },
  {
    title: "Gains",
    slug: "gains",
    url: "https://exercise-tracker-frontend-752853711822.europe-west1.run.app/exercises/2330",
    img: "/assets/gainsPage.png",
    desc: "A streamlined workout tracker and routine builder designed for the gym floor. Athletes can create custom training routines, log working sets in real time without lag, and view clear charts tracking strength gains and consistency over time.",
    pitch:
      "A fast, distraction-free fitness companion for building custom training routines, logging live workouts, and tracking strength progression.",
    coreProblem:
      "Most fitness apps are cluttered with social feeds and slow animations, making it tedious to log sets quickly during short rest intervals. On top of that, gyms often have poor mobile signal. Gains offers an instant, distraction-free interface that works reliably even with spotty connectivity.",
    github: ["https://github.com/Akhere-G/exercise-tracker"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Lucide React",
      "FastAPI",
      "Python",
      "SQLAlchemy",
    ],
    features: [
      "Custom Routine Builder: Build personalised workout programmes, organise exercise sequences, and pre-set targets for weights and reps.",
      "Fast Live Logging: A clean, one-tap interface to log sets, weights, and rest times between exercises without friction.",
      "Offline-Resilient Local Storage: Active sessions save to your device as you type so you never lose progress if the browser closes.",
      "Strength Analytics: Automatically calculates your estimated 1-Rep Max (1RM) progression and training volume trends.",
      "Exercise Library: Searchable catalogue of movements with personal records and historical performance stats.",
    ],
    architecture: `Frontend:
• Next.js App Router with TypeScript for swift page transitions and responsive layouts.
• Zustand provides lightweight global state management for active workout sessions without unnecessary re-renders.
• Tailwind CSS for responsive styling, designed with clean dark-mode friendly contrast.
• Lucide React icons for clear visual cues.

Backend:
• Python and FastAPI providing clean, lightweight REST endpoints.
• SQLAlchemy handles user data, exercise libraries, and historical workout logs.`,
    challenges: [
      "Designing for Unreliable Gym Connectivity: Gyms frequently have dead zones and poor mobile reception. Solved this by saving active workout data to browser localStorage on every input change. The workout is only synced to the backend API once completed, ensuring users never lose data if the browser crashes or signal drops.",
      "Refining the User Experience with Figma: Learning the Next.js App Router while balancing Server vs Client components required careful planning. Designed wireframes and user flows in Figma first to validate layouts, empty states, and loading indicators before writing code.",
    ],
    tradeoffs:
      "Chose Zustand instead of Redux Toolkit to keep client state management lightweight and free from boilerplate, making it easy for interactive workout buttons to subscribe directly to state updates without slowing down the page.",
    impact:
      "Used consistently over several months as a daily personal workout companion to track lifts, refine workout programmes, and reliably measure strength improvements.",
    whyBuilt:
      "Built out of personal need for a fast, simple workout tracker that focuses on quick data entry and clear progress charts without distracting clutter.",
    databaseSchemaSrc: {
      url: "/assets/gains_schema.svg",
      width: 500,
      height: 400,
    },
  },
  {
    title: "TaskFlow",
    slug: "task-flow",
    url: "https://taskflow-752853711822.europe-west2.run.app/addtask",
    img: "/assets/taskFlowPage.png",
    desc: "A smart task management web app designed to turn daily task lists into clear productivity insights. Features include flexible list and calendar views, automated repeating habits, an AI planning coach to decompose large projects, and an integrated Pomodoro focus timer with automated time logs.",
    pitch:
      "A proactive task and productivity manager with calendar scheduling, an AI project coach, and visual workload insights.",
    coreProblem:
      "Standard to-do lists quickly turn into overwhelming backlogs. They do not help you decide what to do first, they do not break down complex projects into easy steps, and they do not show you where your time actually went.",
    github: ["https://github.com/Akhere-G/task-manager"],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Axios",
      "Recharts",
      "Python",
      "Flask",
      "SQLAlchemy 2.0",
      "JWT",
    ],
    features: [
      "Dual List & Calendar Views: Switch between a straightforward to-do list and a detailed monthly calendar view.",
      "Repeating Habits: Build consistent routines with tasks that repeat daily, weekly, or monthly. Skip or reschedule individual occurrences to keep your habits flexible and your schedule under control.",
      "AI Morning Brief: An AI assistant reviews pending and overdue items each morning to recommend a sensible, prioritised schedule.",
      "AI Task Decomposition: Break down daunting tasks into smaller, manageable step-by-step checklists at the click of a button.",
      "Natural Language Quick-Add: Type tasks naturally (e.g. 'Review proposal tomorrow at 3pm') to populate dates and priorities instantly.",
      "Integrated Pomodoro Timer: Run focused work intervals and have time automatically recorded against your active tasks.",
      "Workload Insights & Activity Map: Interactive Recharts graphs show weekly category breakdowns (Work, Study, Personal) and long-term habits.",
    ],
    architecture: `Frontend:
• React and TypeScript Single-Page Application (SPA) designed for rapid interaction.
• TanStack Query manages API data fetching, optimistic UI updates, and intelligent caching.
• Axios network client configured with interceptors for seamless JWT authentication.
• Recharts for animated, responsive charts of weekly workload and time logs.

Backend:
• Python and Flask API structured with the Application Factory pattern.
• SQLAlchemy 2.0 for relational task schemas, habit frequencies, and session logs.
• Secure JWT session management via HTTP-only cookies.`,
    challenges: [
      "Implementing Ghost Tasks vs Batch Generation: Needed a way to show recurring tasks on future calendar days without flooding the database with hundreds of redundant rows. Implemented a dynamic 'ghost task' algorithm that computes projected occurrences on the fly. This kept the database clean and made editing the master schedule straightforward, while requiring thoughtful rendering logic on the calendar.",
    ],
    tradeoffs:
      "Chose TanStack Query with Axios over Redux Toolkit because it delivers server-state caching, automatic refetching, and error handling out of the box with far less boilerplate code. Axios interceptors also made token refresh handling straightforward for JWT authentication.",
    impact:
      "Actively used to identify recurring bottlenecks, eliminate procrastinated items by breaking them down with the AI decomposition tool, and maintain consistent daily focus.",
    whyBuilt:
      "Created to combine practical task scheduling, time tracking, and AI assistance into a single dashboard that actively helps you complete work rather than just listing it.",
    databaseSchemaSrc: {
      url: "/assets/taskflow_schema.svg",
      width: 500,
      height: 400,
    },
  },
  {
    title: "Expense Tracker",
    slug: "expense-tracker",
    url: "https://ai-expense-tracker.netlify.app/",
    img: "/assets/expenseTrackerPage.png",
    desc: "A full-stack personal finance web application that helps users monitor day-to-day spending and manage invoices. Users can sign up securely or log in with Google, record new income and expenses, categorise transactions, and review spending breakdowns in real time.",
    pitch:
      "A full-stack personal finance web app for tracking daily expenses, invoices, and spending habits with secure user accounts.",
    coreProblem:
      "Keeping track of receipts and spending across multiple personal accounts is often disorganised. This app provides a simple, centralised ledger to record transactions, view categorised totals, and manage client invoices.",
    github: [
      "https://github.com/Akhere-G/expense-tracker-frontend",
      "https://github.com/Akhere-G/expense-tracker-backend",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Redux",
      "Styled Components",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    features: [
      "User Authentication: Sign up securely via email and password or Google OAuth.",
      "Transaction Management: Full CRUD functionality to create, view, edit, and delete expense and income records.",
      "Invoice Tracking: Track client invoices alongside everyday expenses.",
      "Centralised State: Redux store maintains transaction lists and balances across views.",
    ],
    architecture: `Frontend:
• React Single-Page Application written in TypeScript.
• Styled Components for modular, component-scoped CSS styling.
• Redux store managing user session data and transaction histories.

Backend:
• Node.js and Express RESTful API.
• MongoDB document database for storing flexible transaction and user records.`,
    challenges: [
      "Mastering Core Backend Principles: Built as a foundational project to gain practical mastery of essential backend concepts, including RESTful API design, database modelling with MongoDB, and secure authentication flows.",
    ],
    tradeoffs:
      "Selected MongoDB with Express (MERN stack) to explore document-oriented data storage and rapid schema prototyping for personal financial records.",
    impact:
      "Served as a practical milestone for building end-to-end full-stack applications with user authentication and database persistence.",
    whyBuilt:
      "Developed to gain solid hands-on experience in building secure, authenticated CRUD applications with React, Node.js, and MongoDB.",
  },
  {
    title: "Movie Search",
    slug: "movie-search",
    url: "https://ai-search-movie.netlify.app",
    img: "/assets/movieSearchPage.jpeg",
    desc: "A responsive movie discovery web app that connects to TheMovieDB API. It allows users to search across thousands of films, view posters and plot summaries, and navigate through paginated results with smooth fade-in animations.",
    pitch:
      "A snappy movie search app featuring debounced API queries, paginated browsing, and smooth image animations.",
    coreProblem:
      "Browsing large media databases can feel clunky if searches trigger excessive API requests or images pop onto the screen without smooth loading states.",
    github: ["https://github.com/Akhere-G/movie-search-app"],
    technologies: ["React", "JavaScript", "TheMovieDB API", "CSS"],
    features: [
      "Live Movie Search: Fast title search powered by TheMovieDB REST API.",
      "Clean Pagination: Browse through multi-page film lists without losing your place.",
      "Animated Poster Loading: Custom Higher-Order Component (HOC) that fades images in smoothly as they download.",
      "Global Context: Lightweight React Context managing search queries and page numbers.",
    ],
    architecture: `Frontend:
• React SPA consuming external REST endpoints from TheMovieDB.
• React Context API providing global state management without external library overhead.
• Higher-Order Component pattern to manage image loading states and fade-in transitions.`,
    challenges: [
      "Debounced Search & Image Loading: Learned the importance of input debouncing to prevent rate limiting from rapid keystrokes, and implemented higher-order component wrappers to ensure image posters fade in smoothly once downloaded rather than flickering.",
    ],
    tradeoffs:
      "Used React Context API rather than Redux to keep the project lightweight and avoid unnecessary dependencies for a focused front-end application.",
    impact:
      "Delivered an intuitive, responsive media search tool while reinforcing front-end fundamentals in pagination, asynchronous image handling, and API integration.",
    whyBuilt:
      "Built to demonstrate clean third-party REST API integration, asynchronous data fetching, and polished UI transitions in React.",
  },
];

export default data;
