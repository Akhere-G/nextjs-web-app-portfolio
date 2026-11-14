export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

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
  features?: ProjectFeature[];
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
    url: "https://app.triptrack.uk/demo",
    img: "/assets/tripTrackPage.png",
    desc: "TripTrack is a collaborative holiday planning app that puts a shared map, calendar and AI itinerary tools in one place. Groups can generate daily schedules with AI, optimise routes to cut travel time, and build a shared wishlist of places to visit, voting on which ones make the final itinerary. Search venues with Google Places and export the finished plan to any calendar app.",
    pitch:
      "Built to replace messy spreadsheets and scattered browser tabs with one shared workspace for planning a trip as a group, complete with route optimisation, group voting and AI generated itineraries.",
    coreProblem:
      "Planning a holiday with friends usually means juggling spreadsheets, pinned map links and endless WhatsApp messages, with no clear way to agree on what actually makes the cut. TripTrack brings the schedule, the map and a shared wishlist into one place, so the group can propose places and vote on them instead of arguing it out over chat.",
    github: ["https://github.com/Akhere-G/event-planner"],
    technologies: [
      "React",
      "TypeScript",
      "Google Maps API",
      "Gemini AI",
      "Redux Toolkit",
      "Yup",
      "Python",
      "Flask",
      "SQLAlchemy",
      "Marshmallow",
    ],
    features: [
      {
        icon: "Sparkles",
        title: "AI Trip Generator",
        description:
          "Describe where you want to go and what you enjoy in one sentence, and the AI builds a complete itinerary in seconds.",
      },
      {
        icon: "Wand2",
        title: "AI Trip Editing",
        description:
          "Change the plan just by asking, whether that's moving a dinner or adding a day. Every AI change is shown for review before it's applied.",
      },
      {
        icon: "Lightbulb",
        title: "Smart Planning",
        description:
          "Fills empty hours with ideas, fixes timing clashes and drafts packing lists in one step, with every suggestion waiting on approval.",
      },
      {
        icon: "Users",
        title: "Realtime Collaboration",
        description:
          "Everyone in the group sees changes the moment they happen, on every device, so there's no more chasing the latest version through a group chat.",
      },
      {
        icon: "CalendarSync",
        title: "Google Calendar Sync",
        description:
          "Keeps each trip in step with Google Calendar, with changes flowing both ways so the whole group always has the right plan.",
      },
      {
        icon: "Plane",
        title: "Flight Search",
        description:
          "Search for flights without leaving the trip and keep each one beside the itinerary, so arrival times and plans stay lined up.",
      },
      {
        icon: "Map",
        title: "Map and Calendar View",
        description:
          "Shows the schedule and the map on one clean screen, so you always know exactly where to be and how to get there.",
      },
      {
        icon: "Wallet",
        title: "Budget and Expenses",
        description:
          "Tracks what everyone spends, splits costs and settles up in a few clicks, with no awkward maths and no chasing friends for money.",
      },
      {
        icon: "LayoutTemplate",
        title: "Trip Templates",
        description:
          "Start from a premade destination template and make it your own in seconds, skipping the blank page entirely.",
      },
      {
        icon: "Search",
        title: "Google Event Search",
        description:
          "Find restaurants, museums and hidden landmarks using Google's database and add the spots you love with a single click.",
      },
      {
        icon: "ShieldCheck",
        title: "Admin and Viewer Roles",
        description:
          "Give co-planners full editing rights, or let others follow the plan without altering it, so you stay in control of who changes what.",
      },
      {
        icon: "Download",
        title: "Calendar and Word Export",
        description:
          "Export the finished itinerary as an .ics file for any calendar app, or download the whole trip as a Word document to share.",
      },
    ],
    architecture: `Frontend:
• Built with React and TypeScript as a single page application.
• Redux Toolkit manages trip data globally so the map and calendar views stay in sync and update together.
• Yup validates forms before anything is sent to the API.
• Google Maps API renders the interactive map, routes and place details.

Backend:
• Python and Flask, structured with the Application Factory pattern for clean modularity.
• SQLAlchemy ORM manages the relational data models, foreign keys and transactions.
• Marshmallow validates incoming requests and formats the JSON responses.
• Gemini AI powers the itinerary suggestions, route ordering and travel tips.
• Socket.IO rooms, keyed by trip id, broadcast entity changes to everyone viewing that trip, driven by hooks into the database commit and rollback lifecycle.
• Google Cloud Tasks runs calendar sync and AI generation as background jobs that call back into an internal endpoint, so a slow external call never holds up the user's request.`,
    challenges: [
      "Migrating to timezone aware datetimes: Event start and end times were originally saved as naive datetimes with no timezone attached. When I added reminder notifications, this meant a trip to Tokyo booked from London would trigger at the wrong local time. I derived a timezone for each trip from its map coordinates, backfilled every existing trip and event, and converted stored times to UTC, interpreting the original values as local to the trip rather than to the user. I built and tested this migration on a separate branch with custom backfill scripts before merging, so active users were never left with incorrect data.",
      "Keeping the map and calendar in sync: The map, the schedule and the list of locations all needed to reflect the same state at once, so adding, moving or deleting an activity in one view had to update the others instantly without re-rendering everything on screen. This took careful state design in Redux rather than letting each view hold its own copy of the data.",
      "Building realtime collaboration without rewriting every route: every create, update and delete anywhere in the app needed to notify everyone else looking at the same trip, without scattering socket code through dozens of endpoints. I hooked into the database layer instead: whenever a row is created, updated or deleted, its entity name is added to a small change set for that request; a rollback clears the set, so a failed save never announces a change that didn't happen. On a successful commit, the collected entity names are emitted as one event to a Socket.IO room keyed by the trip's id, which everyone viewing that trip has already joined. The frontend maps the entity names in that event to the relevant Redux Toolkit Query cache tags and refetches just the data that changed, rather than the whole page. Google Calendar sync was then built directly on top of this: the same hook also records the ids of the changed entities, and on commit those ids are handed to Google Cloud Tasks, which later calls an internal endpoint that pushes the change out to everyone's synced calendar.",
      "Moving AI generation out of the request cycle: the first version of the AI itinerary and day-planning features ran inside the HTTP request and saved their output directly, so a slow model call held the request open and the user had no chance to review a change before it landed. I redesigned this around a task object: triggering an AI feature creates a task row and dispatches it to Google Cloud Tasks, which calls an internal endpoint once it's ready to run. That endpoint picks the right handler for the task type, runs it, and updates the task's status as it progresses. The user is notified over the existing Socket.IO connection when it finishes, or by a push notification if they're not currently connected, and the AI's output sits as a proposal the user explicitly approves or discards rather than something applied automatically.",
    ],
    tradeoffs:
      "I chose Redux Toolkit for state management to avoid prop drilling and make trip data easy to share between the map and calendar components. It added more setup and boilerplate than a lighter library would have, but it made complex state updates predictable and gave the app simple client side caching for free. For background work such as calendar pushes and AI tasks, I used Google Cloud Tasks rather than a self-hosted queue like Celery and Redis: Cloud Run throttles a container's CPU once it has replied to a request, so a background thread started after the response would stall, while Cloud Tasks makes a fresh HTTP call back into the app that runs at full speed and comes with retries built in. The tradeoff is that local development needs its own simpler stand-in (a background thread) so the job code behaves the same way behind either.",
    impact:
      "Friends and early users have planned several real holidays with it, with no spreadsheets involved. Building it also gave me hands on experience with the wider Google Maps suite, including Places, Directions, Geocoding and Timezone, and with handling geospatial and datetime data correctly.",
    whyBuilt:
      "I built TripTrack because planning a trip with a group was genuinely frustrating with the tools I had. I wanted one place that handled the mapping, the scheduling and the group coordination properly, rather than stitching them together by hand.",
    databaseSchemaSrc: {
      url: "/assets/triptrack_schema.svg",
      width: 1200,
      height: 600,
    },
  },
  {
    title: "FileQuery",
    slug: "file-query",
    url: "https://file-query-frontend-752853711822.europe-west1.run.app/demo",
    img: "/assets/fileQueryPage.png",
    desc: "FileQuery is a full-stack document search and question answering platform built around Retrieval-Augmented Generation (RAG). Users upload documents into project folders and ask questions that are answered strictly from their own files, with the system extracting text, chunking it intelligently and combining keyword and semantic search to find the right passage before generating an answer with citations.",
    pitch:
      "A document question-answering tool that uses a production style RAG pipeline to give accurate answers grounded strictly in your own files, with no hallucinated content.",
    coreProblem:
      "General models like ChatGPT will answer confidently from training data, or simply make something up, and they cannot read private files at all. FileQuery solves this by letting users upload their own documents, indexing them with vector search, and constraining the model to answer only from the retrieved content.",
    github: ["https://github.com/Akhere-G/file-query"],
    technologies: [
      "FastAPI",
      "pgvector",
      "LangChain",
      "AWS Lambda",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python 3.14",
      "SQLAlchemy 2.0",
      "PostgreSQL",
      "AWS S3",
      "AWS SQS",
      "Amazon Titan Text Embeddings V2",
      "Amazon Nova Micro",
      "Google Cloud Run",
    ],
    features: [
      {
        icon: "FolderOpen",
        title: "Project Knowledge Bases",
        description:
          "Groups documents into separate project workspaces, so a query only searches the files relevant to it.",
      },
      {
        icon: "FileText",
        title: "Multi-Format Ingestion",
        description:
          "Extracts content from PDF, DOC, DOCX, CSV, Markdown and TXT files on upload.",
      },
      {
        icon: "Scissors",
        title: "Smart Document Chunking",
        description:
          "Uses LangChain's recursive splitter to break text up naturally, keeping headings and tables intact rather than cutting across them.",
      },
      {
        icon: "SearchCode",
        title: "Hybrid Semantic and Keyword Search",
        description:
          "Combines keyword matching with pgvector embeddings to find the document sections most likely to answer the question.",
      },
      {
        icon: "MessageSquareText",
        title: "Query Rewriting",
        description:
          "Turns a follow-up question such as 'what about the second option' into a clear, standalone search query before retrieval.",
      },
      {
        icon: "ShieldCheck",
        title: "Grounded AI Answers",
        description:
          "Amazon Nova Micro is prompted to answer only from the retrieved text, which keeps hallucinations out of the response.",
      },
      {
        icon: "Zap",
        title: "Background File Processing",
        description:
          "Uploaded files are processed asynchronously through AWS SQS and Lambda, so the app stays responsive while a document is indexed.",
      },
      {
        icon: "Link2",
        title: "Source Citations",
        description:
          "Every answer links back to the exact snippets it was drawn from, so the user can check the source in seconds.",
      },
    ],
    architecture: `Frontend:
• Next.js with TypeScript and Tailwind CSS for the interface.
• Server Actions and secure HTTP only cookies handle authenticated calls to the API.

Backend and vector search:
• Python 3.14 with FastAPI providing documented RESTful endpoints.
• PostgreSQL with the pgvector extension for fast semantic similarity search.
• SQLAlchemy 2.0 for querying the relational data.

Cloud and async pipeline:
• Files upload directly to Amazon S3.
• An SQS queue triggers a Lambda worker that extracts text, chunks it with LangChain and generates embeddings with Amazon Titan Text Embeddings V2.
• When a user asks a question, FastAPI rewrites the prompt, retrieves the best matching chunks from pgvector and calls Amazon Nova Micro to generate the answer. The whole backend runs on Google Cloud Run.`,
    challenges: [
      "Finding the right chunking strategy: Chunks that are too small lose surrounding context, and chunks that are too large dilute search accuracy. I tested different chunk sizes and overlaps using LangChain's recursive markdown splitter, which preserves document headings and table structure rather than splitting across them.",
      "Tuning retrieval quality: Plain vector search occasionally missed specific terms or returned weak matches. I improved this by adding conversational query rewriting, hybrid search that combines exact keyword matching with vector similarity, and a reranking step over the candidates, then validated the change by running a set of test questions through the pipeline and checking which chunks were retrieved and their similarity scores.",
    ],
    tradeoffs:
      "I chose Amazon Titan Embeddings and Amazon Nova Micro over OpenAI mainly to stay inside the AWS ecosystem I was already using for S3 and SQS, and to keep running costs down. I also used fully managed AWS SQS and Lambda for background processing instead of running a self-hosted Celery and Redis cluster, so I never had to maintain that infrastructure myself. The downside is that cost can grow faster than with a self-hosted queue at high volume, which I accepted because this is a portfolio project rather than a production system running at scale.",
    impact:
      "FileQuery gives fast, accurate answers across multi-page technical manuals and reports, with no hallucinated content in my testing. I use it regularly myself to search through dense developer documentation.",
    whyBuilt:
      "I built FileQuery to work through a real, cloud-native RAG pipeline end to end, covering asynchronous file ingestion, vector search in PostgreSQL and dependable, grounded answer generation, rather than just calling an AI API directly.",
    databaseSchemaSrc: {
      url: "/assets/filequery_schema.png",
      width: 500,
      height: 400,
    },
  },
  {
    title: "Gains",
    slug: "gains",
    url: "https://exercise-tracker-frontend-752853711822.europe-west1.run.app/demo",
    img: "/assets/gainsPage.png",
    desc: "Gains is a streamlined workout tracker and routine builder made for the gym floor rather than the sofa. You can build custom training routines, log working sets in real time with no lag, and track progress through clear charts and achievements for streaks and personal bests.",
    pitch:
      "A fast, distraction-free training companion for building routines, logging workouts live, and tracking progress through strength charts, streaks and personal bests.",
    coreProblem:
      "Most fitness apps are cluttered with social feeds and slow animations, which makes it tedious to log a set quickly during a short rest period, and gyms often have poor signal to begin with. Gains is built to be instant and distraction-free, and to keep working even when the connection does not.",
    github: ["https://github.com/Akhere-G/exercise-tracker"],
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Zustand",
      "React",
      "Tailwind CSS",
      "Lucide React",
      "Python",
      "SQLAlchemy",
    ],
    features: [
      {
        icon: "TrendingUp",
        title: "Smart Progression Suggestions",
        description:
          "After each set, suggests the next weight and rep target based on how the last session went, so progress happens one sensible step at a time.",
      },
      {
        icon: "HeartPulse",
        title: "Burnout Checker",
        description:
          "Spots the warning signs when lifts stall or effort stays high for weeks, and suggests an easier week before it turns into burnout.",
      },
      {
        icon: "BarChart",
        title: "Performance Stats",
        description:
          "Charts show how many hard sets each muscle group gets every week, how recovered it is, and how strength compares to where it was.",
      },
      {
        icon: "Target",
        title: "Goal-Centred Training",
        description:
          "Set a weekly training target, a body weight goal or a lift to chase, and watch progress build from a one-minute onboarding.",
      },
      {
        icon: "Trophy",
        title: "Achievements and Milestones",
        description:
          "Fourteen achievements reward consistency, new personal bests and variety in training, each earned the moment it's unlocked.",
      },
      {
        icon: "Dumbbell",
        title: "Built for the Gym Floor",
        description:
          "Warm-ups, drop sets, supersets and rest timers, all in one live workout that survives a page refresh.",
      },
      {
        icon: "Scale",
        title: "Your Numbers, Your Units",
        description:
          "Switch between kilograms and pounds at any time, with history always kept accurate behind the scenes.",
      },
      {
        icon: "LayoutTemplate",
        title: "Powerful Workout Templates",
        description:
          "Pick a ready-made programme, or describe the training you want and let Gains build a routine to review before saving.",
      },
    ],
    architecture: `Frontend:
• Next.js App Router with TypeScript for quick page transitions and a responsive layout.
• Zustand provides lightweight global state for the active workout session without triggering unnecessary re-renders.
• Tailwind CSS handles styling, designed with clear contrast for dark mode.
• Lucide React supplies the icon set.

Backend:
• Python and FastAPI for clean, lightweight REST endpoints.
• SQLAlchemy manages user data, the exercise library, historical workout logs and per-exercise achievement records (streaks and personal bests).`,
    challenges: [
      "Designing for unreliable gym connectivity: Gyms often have dead zones and poor signal. I solved this by saving the active workout to the browser's local storage on every change, and only syncing the completed workout to the backend once it is finished, so a dropped connection or a crashed browser never costs the user their data.",
      "Learning the App Router while designing properly: Balancing server and client components in the Next.js App Router took some care, so I designed the wireframes and user flows in Figma first, including empty states and loading states, to validate the layout before writing any code.",
    ],
    tradeoffs:
      "I chose Zustand over Redux Toolkit here to keep the client state simple and free of boilerplate, so the interactive workout buttons could subscribe directly to state updates without any extra setup slowing the page down.",
    impact:
      "I have used Gains consistently over several months as my own workout companion, tracking lifts, adjusting my programme and measuring strength improvements against real data rather than guesswork.",
    whyBuilt:
      "I built Gains because I wanted a fast, simple tracker for my own training that focused on quick data entry and clear progress charts, without the clutter most fitness apps carry.",
    databaseSchemaSrc: {
      url: "/assets/gains_schema.svg",
      width: 500,
      height: 400,
    },
  },
  {
    title: "TaskFlow",
    slug: "task-flow",
    url: "https://taskflow-752853711822.europe-west2.run.app/demo",
    img: "/assets/taskFlowPage.png",
    desc: "TaskFlow is a task management app that turns a daily list into something closer to a productivity dashboard. It combines flexible list and calendar views with repeating habits, an AI planning coach that breaks down large projects, and a built-in Pomodoro timer that logs focus time automatically.",
    pitch:
      "A proactive task manager with calendar scheduling, an AI project coach, and visual workload insights, built to help you act on a list rather than just read it.",
    coreProblem:
      "A standard to-do list turns into an overwhelming backlog fairly quickly. It will not help you decide what to do first, it will not break a large project down into manageable steps, and it will not show you where your time actually went.",
    github: ["https://github.com/Akhere-G/task-manager"],
    technologies: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Flask",
      "Tailwind CSS",
      "Axios",
      "Recharts",
      "Python",
      "SQLAlchemy 2.0",
      "JWT",
    ],
    features: [
      {
        icon: "CalendarDays",
        title: "Calendar View",
        description:
          "See the week at a glance and drag tasks onto new days in seconds, so the schedule always matches the plan.",
      },
      {
        icon: "Kanban",
        title: "Kanban Board",
        description:
          "Move work from idea to done on a visual board, dragging each task across columns as projects move forward.",
      },
      {
        icon: "Sparkles",
        title: "Smart Prioritise",
        description:
          "Sorts tasks into four priority quadrants with the Eisenhower Matrix, then lets AI suggest changes with a clear reason for each.",
      },
      {
        icon: "Repeat",
        title: "Seamless Habits",
        description:
          "Set tasks to repeat and see what's coming up on the calendar, so recurring commitments are never lost track of.",
      },
      {
        icon: "Bell",
        title: "Reminders",
        description:
          "Get timely push notifications, from half an hour ahead or at a time of your choice, so deadlines are never missed.",
      },
      {
        icon: "Tag",
        title: "Projects and Labels",
        description:
          "Group tasks into projects and tag them with labels, so work, home and everything in between stay in order.",
      },
      {
        icon: "AlarmClock",
        title: "Snooze",
        description:
          "Push a task to tomorrow, the weekend or a chosen date, keeping its time of day for when life gets busy.",
      },
      {
        icon: "FileSpreadsheet",
        title: "Import and Export",
        description:
          "Bring in tasks from a spreadsheet in one go, or export everything to CSV whenever a copy is needed.",
      },
      {
        icon: "ListChecks",
        title: "Break It Down",
        description:
          "Splits a large task into a checklist by hand or with AI, then ticks off progress one step at a time.",
      },
      {
        icon: "MessageSquareText",
        title: "Quick Add",
        description:
          "Capture an idea in seconds by typing it naturally; the AI fills in the details so nothing slips away.",
      },
      {
        icon: "Timer",
        title: "Pomodoro Timer",
        description:
          "Works in focused sprints and marks a task complete the moment a session ends, for getting more done in less time.",
      },
      {
        icon: "BarChart",
        title: "Stats and Planning",
        description:
          "The Stats page shows progress over time, from yearly activity to backlog health and where time goes, for planning ahead with confidence.",
      },
    ],
    architecture: `Frontend:
• React and TypeScript single page application designed for fast interaction.
• TanStack Query manages data fetching, optimistic updates and caching against the API.
• Axios, configured with interceptors, handles JWT authentication seamlessly in the background.
• Recharts renders the weekly workload and time log charts.

Backend:
• Python and Flask, structured with the Application Factory pattern.
• SQLAlchemy 2.0 models the task schema, habit frequencies and session logs.
• JWT sessions managed through secure HTTP only cookies.`,
    challenges: [
      "Ghost tasks versus batch generation: I had to decide how to project a repeating task onto future calendar days without flooding the database with hundreds of near-identical rows. I went with a ghost task approach, where a single master record exists and future occurrences are calculated on demand rather than generated in advance. This keeps the database small and makes editing the underlying schedule straightforward, though it took more care to get the calendar's rendering logic right than batch generation would have.",
    ],
    tradeoffs:
      "I chose TanStack Query with Axios over Redux Toolkit here because it gives server state caching, automatic refetching and error handling out of the box, with far less boilerplate than Redux would need. Axios interceptors also made handling JWT token refresh simple to wire up.",
    impact:
      "I use TaskFlow to see where my time is actually going each week, break down the tasks I kept putting off with the AI decomposition tool, and keep my focus consistent day to day.",
    whyBuilt:
      "I built TaskFlow to bring task scheduling, time tracking and AI assistance into one dashboard that actively helps you get through your work, rather than a list that just sits there.",
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
    desc: "Expense Tracker is a full-stack personal finance app for monitoring day-to-day spending and managing invoices. Users can sign up securely or sign in with Google, record income and expenses, categorise transactions, and review spending in real time.",
    pitch:
      "A full-stack personal finance app for tracking daily expenses, invoices and spending habits behind a secure user account.",
    coreProblem:
      "Keeping track of receipts and spending across several personal accounts gets disorganised fast. This app gives you one simple, centralised ledger for recording transactions, viewing categorised totals and managing client invoices.",
    github: [
      "https://github.com/Akhere-G/expense-tracker-frontend",
      "https://github.com/Akhere-G/expense-tracker-backend",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Redux",
      "Express",
      "Styled Components",
    ],
    features: [
      {
        icon: "KeyRound",
        title: "User Authentication",
        description:
          "Sign up securely with email and password, or sign in with Google OAuth.",
      },
      {
        icon: "Receipt",
        title: "Transaction Management",
        description:
          "Full create, read, update and delete functionality for income and expense records.",
      },
      {
        icon: "ClipboardList",
        title: "Invoice Tracking",
        description:
          "Track client invoices alongside everyday expenses in the same place.",
      },
      {
        icon: "Layers",
        title: "Centralised State",
        description:
          "A Redux store keeps transaction lists and balances consistent across every view.",
      },
    ],
    architecture: `Frontend:
• React single page application written in TypeScript.
• Styled Components for modular, component scoped CSS.
• A Redux store manages the user's session data and transaction history.

Backend:
• Node.js and Express RESTful API.
• MongoDB as a document database for the transaction and user records.`,
    challenges: [
      "Learning core backend principles: I built this early on specifically to get hands on with RESTful API design, data modelling in MongoDB, and secure authentication flows, rather than to solve a problem I did not already have a simpler answer for.",
    ],
    tradeoffs:
      "I picked MongoDB with Express, the MERN stack, to get practical experience with document-oriented storage and rapid schema prototyping for financial records, which I had not worked with before.",
    impact:
      "This was an early milestone project for me, building a full authenticated, persisted application end to end with React, Node.js and MongoDB, which gave me the backend fundamentals I built on in later projects.",
    whyBuilt:
      "I built this to get solid, hands on experience with secure authentication and full CRUD functionality using React, Node.js and MongoDB, early in my development as an engineer.",
  },
  {
    title: "Movie Search",
    slug: "movie-search",
    url: "https://ai-search-movie.netlify.app",
    img: "/assets/movieSearchPage.jpeg",
    desc: "Movie Search is a responsive film discovery app built on TheMovieDB API. It lets you search across thousands of titles, view posters and plot summaries, and move through paginated results with a smooth fade-in animation.",
    pitch:
      "A snappy movie search app with debounced queries, clean pagination and smooth image loading.",
    coreProblem:
      "Browsing a large media database feels clunky when every keystroke fires a new request, or when images pop onto the screen with no loading state. Movie Search debounces input and fades posters in as they load, so browsing stays smooth.",
    github: ["https://github.com/Akhere-G/movie-search-app"],
    technologies: ["React", "JavaScript", "TheMovieDB API", "CSS"],
    features: [
      {
        icon: "Search",
        title: "Live Movie Search",
        description: "Fast title search against TheMovieDB's REST API.",
      },
      {
        icon: "Layers",
        title: "Clean Pagination",
        description:
          "Move through multi-page results without losing your place.",
      },
      {
        icon: "ImagePlay",
        title: "Animated Poster Loading",
        description:
          "A custom higher-order component fades each poster in smoothly as it downloads, rather than letting it pop in.",
      },
      {
        icon: "Share2",
        title: "Global Context",
        description:
          "A lightweight React Context manages the current search query and page number across the app.",
      },
    ],
    architecture: `Frontend:
• React single page application consuming TheMovieDB's REST API directly.
• React Context provides global state without pulling in an external library.
• A higher-order component pattern manages image loading state and the fade-in transition.`,
    challenges: [
      "Debouncing search and loading images smoothly: I learned why debouncing input matters here, since typing quickly without it would have hit the API's rate limit, and I wrapped the poster images in a higher-order component so each one fades in once downloaded instead of flickering onto the page.",
    ],
    tradeoffs:
      "I used the React Context API rather than Redux here to keep the project light and avoid pulling in a dependency the app did not really need.",
    impact:
      "This project sharpened my front-end fundamentals around pagination, asynchronous image loading and consuming a third-party REST API cleanly, and it is still a genuinely useful little search tool.",
    whyBuilt:
      "I built this to practise clean integration with a third-party REST API, asynchronous data fetching, and polished UI transitions in React.",
  },
];

export default data;
