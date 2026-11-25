export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface CodeLink {
  label: string;
  href: string;
}

export interface ProofItem {
  value: string;
  label: string;
}

export interface Decision {
  title: string;
  why: string;
  tradeoff: string;
  detail?: string;
  code?: CodeLink[];
}

export interface Challenge {
  title: string;
  problem: string;
  approach: string;
  result: string;
  code?: CodeLink[];
}

export interface ArchitectureLayer {
  name: string;
  points: string[];
}

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface ArchitectureDiagram {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  title: string;
  slug: string;
  tier: "featured" | "earlier";
  url: string;
  img: string;
  pitch: string;
  problem: string;
  github: string[];
  technologies: string[];
  proof?: ProofItem[];
  features: ProjectFeature[];
  screenshots?: Screenshot[];
  architecture?: { diagram?: ArchitectureDiagram; layers: ArchitectureLayer[] };
  decisions?: Decision[];
  challenges?: Challenge[];
  quality?: { tests: string; ci: string; other: string[] };
  limitations?: string[];
  impact?: string;
  docs?: CodeLink[];
  databaseSchemaSrc?: { url: string; width: number; height: number };
}

const GITHUB = "https://github.com/Akhere-G";

const link = (repo: string, path: string, label?: string): CodeLink => ({
  label: label ?? path.split("/").slice(-1)[0],
  href: `${GITHUB}/${repo}/blob/main/${path}`,
});

const TRIP = "event-planner";
const TRIP_BE = "event-planner-app-backend";
const TASK = "task-manager";
const TASK_BE = "task-manager-backend";
const FILE = "file-query";
const GAINS = "exercise-tracker";
const FOOD = "food-tracker";

const data: Project[] = [
  {
    title: "TripTrack",
    slug: "trip-track",
    tier: "featured",
    url: "https://app.triptrack.uk/demo",
    img: "/assets/tripTrackPage.png",
    pitch:
      "A shared trip planner where a group builds one itinerary on a map and calendar, with AI suggestions that never change the plan until someone approves them.",
    problem:
      "Planning a holiday with friends usually means spreadsheets, pinned map links and endless group chats, with no clear way to agree on what makes the cut. TripTrack puts the schedule, the map, the budget and the group in one place, updates everyone's screen as soon as a change is saved, and lets AI draft or change plans without ever applying anything until a person approves it.",
    github: [`${GITHUB}/${TRIP}`],
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "Google Maps API",
      "Python",
      "Flask",
      "SQLAlchemy",
      "PostgreSQL",
      "Socket.IO",
      "Redis",
      "Google Cloud Tasks",
      "Gemini AI",
      "Marshmallow",
    ],
    proof: [
      { value: "1,200+", label: "automated backend tests" },
      { value: "40", label: "database migrations" },
      { value: "3", label: "AI providers with automatic fallback" },
      {
        value: "CI",
        label: "backend, frontend and browser tests on every push",
      },
    ],
    features: [
      {
        icon: "Sparkles",
        title: "AI Trips With Approval",
        description:
          "Describe a trip in one sentence, or ask for a change such as moving a dinner. Every AI result is shown as a suggestion to review before anything is saved.",
      },
      {
        icon: "Users",
        title: "Realtime Collaboration",
        description:
          "Everyone viewing a trip sees changes the moment they are saved, on every device, so nobody is chasing the latest version through a group chat.",
      },
      {
        icon: "CalendarSync",
        title: "Google Calendar Sync",
        description:
          "Keeps each trip in step with Google Calendar, with changes flowing both ways, so the whole group has the right plan in their own calendar.",
      },
      {
        icon: "Map",
        title: "Map and Calendar View",
        description:
          "Shows the schedule and the map on one screen, with routes and place details from Google Maps.",
      },
      {
        icon: "Wallet",
        title: "Budget and Expenses",
        description:
          "Tracks what everyone spends and splits costs between the group. Flights, templates and Word or calendar export sit alongside it.",
      },
      {
        icon: "ShieldCheck",
        title: "Admin and Viewer Roles",
        description:
          "Give co-planners full editing rights, or let others follow the plan without being able to change it.",
      },
    ],
    screenshots: [
      {
        src: "/assets/triptrack-calendar.png",
        alt: "A month calendar of a Lisbon trip beside a map of the planned places.",
        caption:
          "The trip schedule as a calendar, next to its places on the map.",
      },
      {
        src: "/assets/triptrack-ai-proposals.png",
        alt: "A dialog titled Review proposed changes listing four suggested events, each with a checkbox, and buttons to reject all or apply the selected changes.",
        caption:
          "AI suggestions are reviewed first and only apply once you approve them.",
      },
      {
        src: "/assets/triptrack-day-optimiser.png",
        alt: "A dialog titled Optimise your days where the user picks which days to improve and priorities such as minimising travel.",
        caption:
          "The day optimiser asks what to improve, then proposes changes to review.",
      },
      {
        src: "/assets/triptrack-expenses.png",
        alt: "A budget with spending by category, the group's balances, and suggested payments to settle up.",
        caption:
          "Spending against a budget, with suggested payments to settle up.",
      },
      {
        src: "/assets/triptrack-flights.png",
        alt: "A saved flight showing departure and arrival airports and times, price and a book button.",
        caption:
          "Saved flights sit in the trip, with times, price and a link to book.",
      },
      {
        src: "/assets/triptrack-routes.png",
        alt: "A day's events with a walking route drawn on the map between two of them and step-by-step directions below.",
        caption:
          "Routes between events are drawn on the map, with walking or transit directions.",
      },
    ],
    architecture: {
      diagram: {
        src: "/assets/triptrack-architecture.svg",
        alt: "How TripTrack fits together: the browser talks to a Flask API, a change tracker on the database triggers realtime notices and background jobs, and jobs call Google Calendar and AI providers.",
        width: 1000,
        height: 440,
      },
      layers: [
        {
          name: "Frontend",
          points: [
            "React and TypeScript single page app built with Vite.",
            "Server data lives in one RTK Query cache. When the server announces a change, only the affected cached data is refreshed, so the map, calendar and list always agree.",
            "Redux slices hold only interface and sign-in state.",
            "Google Maps renders the map, routes and place details.",
          ],
        },
        {
          name: "Backend",
          points: [
            "Python and Flask using the application factory pattern: about 100 routes across 20 blueprints.",
            "Marshmallow validates every request. SQLAlchemy and Alembic manage 24 tables on PostgreSQL.",
            "Socket.IO rooms (one per trip and per user) deliver live updates, with Redis shared between server instances.",
          ],
        },
        {
          name: "Background work and AI",
          points: [
            "Google Cloud Tasks runs calendar syncing and AI generation outside the request, calling back into the app with signed requests that are verified.",
            "Gemini, Groq and AWS Bedrock sit behind adapters, and the app falls back to the next provider if one fails.",
            "Web push notifications tell users when a background job has finished.",
          ],
        },
        {
          name: "Delivery",
          points: [
            "Docker images for each service, a GitHub Actions pipeline, deployed on Google Cloud Run.",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "One save hook powers live updates and calendar sync",
        why: "Instead of writing sync code for every feature, one listener watches the database save step, notes what changed, and announces it only once the save has definitely gone through. A failed save announces nothing.",
        tradeoff:
          "Behaviour that happens automatically is harder for a newcomer to trace, and every new table has to be registered with a rule for who should be told about it.",
        detail:
          "A SQLAlchemy listener collects changes after each flush, emits them only after the commit succeeds, and discards them on rollback. Thirteen models are registered, each with a resolver that finds the trip and users to notify. Calendar sync is a second listener on the same tracker that queues a push job for the changed items.",
        code: [
          link(TRIP, `${TRIP_BE}/src/realtime/change_tracker.py`),
          link(TRIP, `${TRIP_BE}/src/calendar_sync/change_listener.py`),
        ],
      },
      {
        title: "Use a managed task queue for slow work",
        why: "Calendar updates and AI calls take seconds. The hosting platform slows a server right down once it has replied to a request, so a job started in a thread would stall. Google's managed queue makes a fresh request back into the app, which runs at full speed and is retried automatically if it fails.",
        tradeoff:
          "Local development needs a stand-in for the queue, so the same job code runs either way, and the app depends on a Google service rather than software I run myself.",
        detail:
          "A dispatcher factory picks Cloud Tasks, a thread or an inline call. Task names are deterministic so a duplicate is ignored, callbacks are verified by checking Google's signed token, and each run is claimed atomically with an attempt limit.",
        code: [
          link(TRIP, `${TRIP_BE}/src/ai_tasks/dispatchers`, "dispatchers"),
          link(TRIP, `${TRIP_BE}/src/middleware/cloud_tasks_auth.py`),
          link(TRIP, `${TRIP_BE}/src/ai_tasks/runner.py`),
        ],
      },
      {
        title: "AI proposes, people approve, and stale proposals are flagged",
        why: "An AI reply can take a while, and the plan may change in the meantime. So the result is a suggestion, not a saved change, and anything edited or deleted since the request started is flagged before the user applies it.",
        tradeoff:
          "Every AI feature needs an extra review step and a stored snapshot, which is more work than saving the result straight away.",
        detail:
          "A snapshot is taken before the slow call. Each entity type has a validator that checks the model's output, and registered appliers apply an approved change set. Anything that has changed or disappeared is marked CHANGED or DELETED in the preview.",
        code: [
          link(TRIP, `${TRIP_BE}/src/ai_tasks/snapshots.py`),
          link(TRIP, `${TRIP_BE}/src/services/change_set_appliers.py`),
        ],
      },
      {
        title: "Do not depend on a single AI provider",
        why: "A rate limit or outage at one provider should not switch off trip planning.",
        tradeoff:
          "Prompts have to work across different models, and each provider adds an adapter to maintain and test.",
        detail:
          "Gemini, Groq and AWS Bedrock adapters share one interface, and a request falls through to the next provider in order. AI endpoints have per-user rate limits by task type.",
        code: [
          link(TRIP, `${TRIP_BE}/src/services/ai_providers`, "ai_providers"),
        ],
      },
      {
        title: "One cache for server data, refreshed by the server",
        why: "The map, the calendar and the location list all show the same trips and events. Keeping one cached copy and refreshing it when the server says something changed means they cannot drift apart.",
        tradeoff:
          "Redux Toolkit adds more setup and boilerplate than a lighter library would, in return for predictable updates and caching without extra code.",
        detail:
          "RTK Query defines about 86 endpoints with cache tags. A socket notice invalidates the tags for the changed trip, and only the affected queries refetch.",
        code: [
          link(TRIP, "event-planner-app-frontend/src/features/api/apiSlice.ts"),
        ],
      },
    ],
    challenges: [
      {
        title: "Fixing time zones after launch",
        problem:
          "Event times were first saved with no time zone attached. When I added reminder notifications, a trip to Tokyo booked from London would have fired at the wrong local time.",
        approach:
          "I worked out a time zone for each trip from its map coordinates, backfilled every existing trip and event, and converted stored times to UTC by reading the old values as local to the trip, not to the user. The frontend converts in both directions using the trip's zone. I built and tested the migration on a separate branch with custom backfill scripts and only merged once the data and the frontend were both ready.",
        result:
          "Reminders fire at the right local time, and users with existing trips never saw incorrect data.",
        code: [
          link(TRIP, `${TRIP_BE}/scripts/backfill_trip_timezones.py`),
          link(TRIP, `${TRIP_BE}/scripts/convert_to_timezone_aware.py`),
        ],
      },
      {
        title: "Taking AI out of the user's wait",
        problem:
          "The first version ran AI planning while the user waited for the request to finish, and saved the result straight away with no chance to check it.",
        approach:
          "Starting an AI feature now creates a background job that is picked up a moment later. Its progress is tracked and the user is told when it is done, instantly if they are still on the page or by push notification if they have moved on.",
        result:
          "Slow AI calls no longer block a request, and the result arrives as a suggestion to approve instead of something already saved.",
        code: [link(TRIP, `${TRIP_BE}/src/ai_tasks/runner.py`)],
      },
    ],
    quality: {
      tests:
        "About 1,230 backend tests across 96 files, about 250 frontend unit tests and 24 Playwright browser tests.",
      ci: "GitHub Actions runs the backend tests, then frontend lint, build and unit tests, then the browser tests on every push and pull request.",
      other: [
        "40 Alembic migrations, including backfill scripts with their own tests.",
        "Google refresh tokens are encrypted at rest.",
        "Rate limits on AI and flight-search endpoints.",
      ],
    },
    limitations: [
      "Some leftover MySQL-era code remains from before the database moved to PostgreSQL and is waiting to be removed.",
      "Approving an AI proposal can overwrite newer edits to the fields it changes. A warning is shown, but it does not block acceptance and there is no automatic conflict resolution.",
      "If an AI provider replies with something that fails validation, the request does not automatically retry with the next provider. Fallback only covers a provider that fails or returns nothing.",
      "Repayment suggestions use a simple greedy match, so they are not guaranteed to need the fewest transfers, and group balances are held in a single currency (GBP).",
      "Reminders run from a standalone script rather than inside the web process, so they need a scheduler.",
      "Tests use fakes for Google, flights and AI, so they cannot show that the live integrations are configured correctly.",
    ],
    impact:
      "Friends and early users have planned several real trips with it. Building it also taught me the wider Google Maps suite (Places, Directions, Geocoding and Time Zone) and how to handle geospatial and datetime data correctly.",
    docs: [link(TRIP, ".github/workflows/ci.yml", "CI workflow")],
    databaseSchemaSrc: {
      url: "/assets/triptrack_schema.svg",
      width: 1200,
      height: 600,
    },
  },
  {
    title: "FileQuery",
    slug: "file-query",
    tier: "featured",
    url: "https://file-query-frontend-752853711822.europe-west1.run.app/demo",
    img: "/assets/fileQueryPage.png",
    pitch:
      "Ask questions about your own documents and get answers drawn only from them, with the sources shown.",
    problem:
      "General chatbots answer confidently from their training data, or make something up, and they cannot read private files at all. FileQuery lets people upload their own documents into project folders, finds the passages most likely to answer a question, and tells the model to answer only from those passages. I built it to work through a real cloud RAG pipeline end to end, rather than just calling an AI API.",
    github: [`${GITHUB}/${FILE}`],
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
      "Amazon Titan Embeddings V2",
      "Cohere Rerank 3.5",
      "Amazon Nova Micro",
      "Google Cloud Run",
    ],
    proof: [
      { value: "320+", label: "automated backend tests" },
      { value: "4", label: "retrieval stages: vector, keyword, fuse, rerank" },
      {
        value: "14",
        label: "question evaluation set for the retrieval pipeline",
      },
      { value: "13", label: "database migrations" },
    ],
    features: [
      {
        icon: "FolderOpen",
        title: "Project Knowledge Bases",
        description:
          "Groups documents into separate project workspaces, so a question only searches the files that belong to it.",
      },
      {
        icon: "FileText",
        title: "Multi-Format Ingestion",
        description:
          "Extracts text from PDF, DOC, DOCX, CSV, Markdown and TXT files as they are uploaded.",
      },
      {
        icon: "SearchCode",
        title: "Hybrid Search With Reranking",
        description:
          "Combines meaning-based and keyword search, then reranks the best candidates, so both paraphrases and exact terms are found.",
      },
      {
        icon: "MessageSquareText",
        title: "Follow-Up Questions",
        description:
          "Turns a follow-up such as 'what about the second option' into a standalone search before retrieval.",
      },
      {
        icon: "ShieldCheck",
        title: "Answers From Your Files",
        description:
          "The model is instructed to answer only from the retrieved passages, and answers show the sources they were drawn from.",
      },
      {
        icon: "Zap",
        title: "Background Processing",
        description:
          "Uploaded files are processed through a queue and a worker, so the app stays responsive while a document is indexed.",
      },
    ],
    screenshots: [
      {
        src: "/assets/filequery-files.png",
        alt: "A project's files tab listing four uploaded Markdown files above an upload area.",
        caption:
          "Files are grouped into projects, and each project searches only its own files.",
      },
      {
        src: "/assets/filequery-chat.png",
        alt: "A chat where an answer is followed by chips for each source passage it used.",
        caption: "Answers list the passages they were based on.",
      },
      {
        src: "/assets/filequery-source.png",
        alt: "A dialog showing the source file name and the exact cited text.",
        caption: "Open a source to see the file and the exact passage.",
      },
    ],
    architecture: {
      diagram: {
        src: "/assets/filequery-architecture.svg",
        alt: "How FileQuery fits together: files go from the browser straight to S3, a queue and Lambda worker embed them into PostgreSQL, and questions are answered through search, reranking and Bedrock models.",
        width: 1000,
        height: 520,
      },
      layers: [
        {
          name: "Frontend",
          points: [
            "Next.js with TypeScript and Tailwind CSS.",
            "Server Actions call the API with the sign-in token held in an HTTP-only cookie.",
          ],
        },
        {
          name: "API and database",
          points: [
            "FastAPI with 17 documented endpoints, SQLAlchemy 2.0 and 13 Alembic migrations.",
            "PostgreSQL with pgvector for meaning-based search and built-in full-text search for keywords.",
            "Rate limits keyed per user on Redis, monthly message caps, and a read-only public demo mode.",
          ],
        },
        {
          name: "Ingestion pipeline",
          points: [
            "The browser uploads straight to S3, then the API confirms the upload and puts a job on an SQS queue.",
            "A Lambda worker extracts text, splits it into chunks with LangChain and creates embeddings with Amazon Titan Text Embeddings V2.",
          ],
        },
        {
          name: "Answering a question",
          points: [
            "The question is rewritten into a standalone search, then run against pgvector and full-text search.",
            "The two result lists are merged with reciprocal rank fusion, reranked by Cohere Rerank 3.5, and the top five passages go to Amazon Nova Micro to write the answer.",
            "The services run on Google Cloud Run and the worker image is built and pushed to AWS from GitHub Actions.",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Combine keyword and meaning-based search, then rerank",
        why: "Searching by meaning misses exact terms such as part numbers, and keyword search misses paraphrases. Running both, merging the results and reranking the best candidates finds the right passage more often than either alone.",
        tradeoff:
          "Every question makes an extra model call for reranking, which adds latency and cost, and there are more settings to tune.",
        detail:
          "pgvector cosine search with a 0.14 similarity threshold returns 20 candidates, Postgres full-text search (with a GIN index) returns its own list, reciprocal rank fusion merges them with k=60, and Cohere Rerank 3.5 on Bedrock keeps the top 5.",
        code: [
          link(FILE, "backend/src/features/chat/chat_service.py"),
          link(FILE, "backend/src/features/files/embedding_service.py"),
        ],
      },
      {
        title: "Process uploads with managed queues and workers",
        why: "Extracting and embedding a long document takes a while. A managed queue and a worker keep that out of the web request, and I never have to run or patch the queue myself.",
        tradeoff:
          "Cost can grow faster than a self-run queue at high volume, which I accepted because this is a portfolio project, not a production system at scale.",
        detail:
          "SQS triggers a Lambda container image. The image is built in stages and compiles antiword from source so old .doc files can be read.",
        code: [link(FILE, "backend/embedding_worker.Dockerfile")],
      },
      {
        title: "Lock down uploads before they reach the server",
        why: "Files go straight from the browser to S3, so the server never handles the file itself, but the upload link has to limit what can be sent.",
        tradeoff:
          "The client must declare the file type and size up front, and the extra confirm step adds one more request.",
        detail:
          "The presigned upload is pinned to the declared content type and an exact size range, the API checks the stored object with head_object before queuing it, and per-user storage quotas apply.",
        code: [link(FILE, "backend/src/features/files/file_service.py")],
      },
      {
        title: "Stay inside AWS for models",
        why: "I already used S3 and SQS, so Titan embeddings and Nova Micro kept the services, billing and sign-in in one place and kept running costs down.",
        tradeoff:
          "Less choice of model than a provider-agnostic setup, and the app is split across two clouds, with the frontend and API on Google Cloud Run and storage and models on AWS.",
      },
      {
        title: "Test the pipeline without the cloud",
        why: "Deterministic fakes for Bedrock, S3 and SQS let the whole upload, chunk, embed and retrieve flow run in ordinary tests, quickly and for free.",
        tradeoff:
          "The fakes prove the pipeline is wired correctly, but they do not measure how good a real model's answers are.",
        detail:
          "A 14-case evaluation set (10 answerable and 4 unanswerable questions) runs through the real upload, extract, chunk and embed code and checks the expected source, evidence and refusal. Known bugs are recorded as strict expected failures so they cannot be forgotten.",
        code: [link(FILE, "backend/tests/test_rag_eval.py")],
      },
    ],
    challenges: [
      {
        title: "Making retrieval good enough to trust",
        problem:
          "Plain vector search sometimes missed specific terms or returned weak matches.",
        approach:
          "I added query rewriting for follow-up questions, hybrid keyword and vector search, and a reranking step. I checked each change by running a set of test questions and looking at which chunks came back and their similarity scores, then turned that set into the evaluation tests.",
        result:
          "Questions about specific terms now find the right passage, and the evaluation set guards against regressions.",
        code: [link(FILE, "backend/tests/test_rag_eval.py")],
      },
      {
        title: "Choosing chunk sizes",
        problem:
          "Chunks that are too small lose surrounding context, and chunks that are too large dilute the match.",
        approach:
          "I tested different sizes and overlaps with LangChain's recursive splitter and settled on 1,500 characters with a 200-character overlap.",
        result:
          "A reasonable default for mixed documents. A header-aware Markdown splitter is written and tested but not yet switched on.",
      },
    ],
    quality: {
      tests:
        "About 325 backend tests across 26 files, about 190 frontend tests and 13 Playwright browser tests.",
      ci: "GitHub Actions runs backend tests against a real pgvector database, ruff, pip-audit, ESLint, type checks, Vitest, npm audit, a build and the Playwright tests. A second workflow pushes the worker image to AWS.",
      other: [
        "13 Alembic migrations, including a full-text index and foreign key indexes.",
        "Passwords hashed with bcrypt, with matching timing for unknown accounts.",
        "Analytics use salted IDs and never record document content.",
      ],
    },
    limitations: [
      "Vector search is an exact scan with no approximate-nearest-neighbour index yet. That is fine at this size but would not scale.",
      "Answers currently cite every reranked passage, including some that were not used. A test marks this known gap.",
      "The evaluation runs on fakes, so I have no measured accuracy for a real model yet.",
    ],
    impact:
      "I use it myself to search dense developer documentation. In my testing it answered from the uploaded files and declined to answer when the files did not contain the information, though I have not measured accuracy against a real model.",
    docs: [
      link(FILE, "docs/specs/public-demo-mode.md", "Public demo mode design"),
      link(FILE, ".github/workflows/ci.yml", "CI workflow"),
    ],
    databaseSchemaSrc: {
      url: "/assets/filequery_schema.png",
      width: 500,
      height: 400,
    },
  },
  {
    title: "Gains",
    slug: "gains",
    tier: "featured",
    url: "https://exercise-tracker-frontend-752853711822.europe-west1.run.app/demo",
    img: "/assets/gainsPage.png",
    pitch:
      "A fast workout tracker for the gym floor that coaches with clear, explainable rules and shows its reasoning.",
    problem:
      "Most fitness apps are cluttered, and logging a set during a short rest is slow, in gyms that often have poor signal. Gains is built to be quick and distraction-free, keeps the live workout safe on the device until it is finished, and explains every piece of coaching with the numbers behind it. I built it for my own training and have used it for several months.",
    github: [`${GITHUB}/${GAINS}`],
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Zustand",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Alembic",
      "Vitest",
      "Playwright",
    ],
    proof: [
      { value: "210+", label: "automated backend tests" },
      { value: "300+", label: "frontend tests" },
      { value: "21", label: "browser tests run against a real backend" },
      { value: "18", label: "database migrations" },
    ],
    features: [
      {
        icon: "TrendingUp",
        title: "Progression Suggestions",
        description:
          "Suggests the next weight and rep target for each exercise from how the last session went, so progress comes one sensible step at a time.",
      },
      {
        icon: "HeartPulse",
        title: "Burnout Checker",
        description:
          "Spots several lifts stalling, or effort staying very high, and suggests an easier week with the exact numbers shown as the reason.",
      },
      {
        icon: "BarChart",
        title: "Performance Stats",
        description:
          "Charts show hard sets per muscle group each week, how recovered each one is, and how strength compares to where it was.",
      },
      {
        icon: "Trophy",
        title: "Milestones and Records",
        description:
          "Fourteen milestones, plus a history of personal bests and weekly streaks, each awarded the moment it is earned.",
      },
      {
        icon: "Dumbbell",
        title: "Built for the Gym Floor",
        description:
          "Warm-ups, drop sets, supersets and rest timers in one live workout that survives a page refresh or a dropped signal.",
      },
      {
        icon: "LayoutTemplate",
        title: "Templates and an AI Routine Builder",
        description:
          "Pick a ready-made programme, or describe the training you want and review the AI's routine before saving it.",
      },
    ],
    screenshots: [
      {
        src: "/assets/gains-workout.png",
        alt: "A live workout showing four sets of lever chest press with a suggested next weight and reps.",
        caption:
          "The live workout suggests the next weight and reps for each exercise.",
      },
      {
        src: "/assets/gains-routines.png",
        alt: "A list of routines: push day, pull day, legs and core, and cardio and core.",
        caption: "Routines start a workout in one tap.",
      },
      {
        src: "/assets/gains-stats.png",
        alt: "A stats overview with workouts, volume, time trained, sets and a weekly trend chart.",
        caption: "Stats compare each period with the one before it.",
      },
      {
        src: "/assets/gains-achievements.png",
        alt: "A grid of achievements, including personal records and milestones.",
        caption:
          "Personal records and milestones are awarded when a workout is saved.",
      },
    ],
    architecture: {
      diagram: {
        src: "/assets/gains-architecture.svg",
        alt: "How Gains fits together: a Next.js front end with local storage for the live workout, Next.js server code, and a FastAPI service layer over PostgreSQL, with an AI provider used only for the routine builder.",
        width: 1000,
        height: 430,
      },
      layers: [
        {
          name: "Frontend",
          points: [
            "Next.js App Router with TypeScript. Server components fetch the data for pages, and server actions handle every write.",
            "Zustand holds the live workout, which is also saved to local storage on every change.",
            "Features are organised in folders, each with its own actions, validation schema and types.",
          ],
        },
        {
          name: "Backend",
          points: [
            "FastAPI with thin routers (about 54 endpoints) over a services layer where the business rules live as plain, testable functions.",
            "SQLAlchemy 2.0 and 18 Alembic migrations over 15 tables, on PostgreSQL in production and SQLite in development.",
            "Progression, burnout, analytics and achievements are calculated on the server and sent to the browser ready to display.",
          ],
        },
        {
          name: "AI and security",
          points: [
            "Only the routine builder calls an AI model, Gemini first with Groq as a fallback.",
            "JWT in an HTTP-only cookie, bcrypt password hashing, and rate limits on sign-in and registration.",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Coaching runs on rules, not an AI model",
        why: "Progression, burnout and milestone logic are plain rules. They cost nothing to run, give the same answer every time, and each one reports the numbers behind it. Only the routine builder uses an AI model.",
        tradeoff:
          "The coaching is only as smart as the thresholds I wrote, and it cannot adapt to an individual the way a learned model could.",
        detail:
          "Progression is double progression, with increments by unit, body region and equipment, gated on how manageable the last session's RPE or reps in reserve were.",
        code: [
          link(GAINS, "backend/app/services/progression.py"),
          link(GAINS, "backend/app/services/deload.py"),
        ],
      },
      {
        title: "Keep every personal best as its own record",
        why: "Each time a set beats a previous best, or a streak gets longer, it is saved as a new entry instead of overwriting one record. The current best is worked out from that history, so a workout page can show exactly which records it broke.",
        tradeoff:
          "Looking up the current bests is a slightly heavier query than reading one stored value.",
        detail:
          "The current best per lift comes from a window query (ROW_NUMBER over a partition). Because the history is append-only, a backfill can replay it through the same award functions the live app uses.",
        code: [link(GAINS, "backend/app/services/achievement.py")],
      },
      {
        title: "Store kilograms, convert in one place",
        why: "The database holds kilograms only, and conversion to pounds lives in one module. That avoids rounding drift from converting back and forth, and history stays consistent when someone switches units.",
        tradeoff:
          "Every screen and every input has to go through the converter, so a missed call shows the wrong unit.",
        code: [link(GAINS, "frontend/src/lib/units.ts")],
      },
      {
        title: "Save the live workout on the device first",
        why: "Gyms often have poor signal. The active workout is saved to local storage on every change and only sent to the server when it is finished, so a refresh, a crash or a dropped connection never loses a set.",
        tradeoff:
          "The workout lives on one device until it is finished, and the rest of the app still needs a connection, so this is not a full offline mode.",
      },
      {
        title: "Check AI output, then save it all or not at all",
        why: "The routine builder's reply is untrusted text. It is validated and shown as a preview, and the saved routines go in as one batch, so a model error can never leave a half-written plan.",
        tradeoff:
          "Invalid parts are dropped rather than repaired, so a routine can arrive thinner than the model intended. Without any AI key the feature returns an error and the app points to the ready-made programmes instead.",
        detail:
          "The model only sees a restricted exercise catalogue. Its JSON is validated with Pydantic, values are clamped, unknown exercise IDs are dropped, and the batch endpoint saves everything in one transaction.",
        code: [link(GAINS, "backend/app/services/ai_builder.py")],
      },
    ],
    challenges: [
      {
        title: "Turning one vague warning into two measurable ones",
        problem:
          "The first burnout checker mixed 'your lifts have stopped improving' with 'you have been training hard for weeks' into one fuzzy suggestion with no clear number behind it.",
        approach:
          "I split it into two independent checks. Strength is each lift's estimated one-rep max over its last four sessions: a lift counts as stalled if that estimate has not grown, or has dropped by 5% or more, and the warning needs at least two tracked lifts with 40% or more stalled. Effort is the average RPE (a 1 to 10 score the user logs for how hard a set felt), and an average of 9 or more over two weeks across at least three workouts counts as the second warning. A two-week cooldown stops it nagging.",
        result:
          "Either check can suggest an easier week on its own, and the exact numbers behind it are shown, so the user sees why they are being told to ease off.",
        code: [link(GAINS, "backend/app/services/deload.py")],
      },
      {
        title: "Giving existing users their achievements retroactively",
        problem:
          "When the achievement system launched, existing users had months of history and nothing to show for it.",
        approach:
          "I wrote a tool that replays a user's whole history, workout by workout, through the same functions that award achievements live, rather than separate one-off catch-up logic.",
        result:
          "Past achievements come out as they would have live. The one compromise is that they are stamped with the day of the catch-up, not the original workout date.",
        code: [link(GAINS, "backend/app/services/achievement.py")],
      },
      {
        title: "Designing every state before writing code",
        problem:
          "I was learning the Next.js App Router, including when to use server or client components, while also needing the interface to be clear under pressure at the gym.",
        approach:
          "I designed the main screens in Figma first, including empty, loading and error states, to settle the layout and flows before building them.",
        result:
          "The empty, loading and error states are part of every screen from the start, not added afterwards.",
      },
    ],
    quality: {
      tests:
        "About 215 backend tests, about 300 Vitest tests and 21 Playwright tests.",
      ci: "GitHub Actions runs pytest, lint, Vitest and a build, then the Playwright tests against an isolated real backend, plus an advisory dependency audit.",
      other: [
        "18 Alembic migrations.",
        "Sign-in and registration rate limits that read the client address safely behind a proxy.",
        "CSV export is sanitised against spreadsheet formula injection.",
      ],
    },
    limitations: [
      "It is not a full offline mode. The live workout survives a dropped signal, but the rest of the app needs a connection.",
      "Achievements awarded by the catch-up tool carry the catch-up date, not the original workout date.",
      "Lift goals and routine weight targets are unfinished.",
      "I have no performance benchmarks or other users' metrics, only my own months of use.",
    ],
    impact:
      "I have used Gains consistently for several months as my own workout companion, tracking lifts, adjusting my programme and measuring strength against real data.",
    docs: [link(GAINS, ".github/workflows/ci.yml", "CI workflow")],
    databaseSchemaSrc: {
      url: "/assets/gains_schema.svg",
      width: 500,
      height: 400,
    },
  },
  {
    title: "TaskFlow",
    slug: "task-flow",
    tier: "featured",
    url: "https://taskflow-752853711822.europe-west2.run.app/demo",
    img: "/assets/taskFlowPage.png",
    pitch:
      "A task manager with calendar, board and repeating tasks, plus an assistant interface that lets AI tools like Claude manage your tasks with scoped, revocable access.",
    problem:
      "A plain to-do list turns into an overwhelming backlog. It will not help you decide what to do first, break a large project into steps, or show where your time went. TaskFlow adds calendar and board views, repeating tasks, AI that suggests changes you can accept or ignore, and statistics on your workload, and exposes the same actions to AI assistants through a secure API.",
    github: [`${GITHUB}/${TASK}`],
    technologies: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS",
      "Recharts",
      "Python",
      "Flask",
      "SQLAlchemy 2.0",
      "PostgreSQL",
      "Redis",
      "Alembic",
      "JWT",
      "MCP",
    ],
    proof: [
      { value: "600+", label: "automated backend tests, some property-based" },
      { value: "36", label: "tools exposed to AI assistants over MCP" },
      {
        value: "3",
        label: "CI jobs, including browser tests on a real backend",
      },
      {
        value: "Hashed",
        label:
          "refresh and MCP tokens, with Redis rate limits and security headers",
      },
    ],
    features: [
      {
        icon: "CalendarDays",
        title: "Calendar View",
        description:
          "See the week at a glance and drag tasks onto new days, so the schedule always matches the plan.",
      },
      {
        icon: "Kanban",
        title: "Kanban Board",
        description:
          "Move work across columns for each project, where each column can complete, reopen or trash a card dropped into it.",
      },
      {
        icon: "Sparkles",
        title: "Smart Prioritise",
        description:
          "Sorts tasks into four quadrants with the Eisenhower Matrix, then lets AI suggest changes with a reason for each that you accept or ignore.",
      },
      {
        icon: "Repeat",
        title: "Repeating Tasks",
        description:
          "Daily, weekly, monthly or yearly repeats, with chosen days, that show up ahead of time on the calendar.",
      },
      {
        icon: "Bell",
        title: "Reminders",
        description:
          "Several push reminders per task, from half an hour ahead or at a time you choose.",
      },
      {
        icon: "BarChart",
        title: "Stats and Planning",
        description:
          "Shows progress over time, backlog health, upcoming deadlines and where your time goes, across about fourteen charts.",
      },
    ],
    screenshots: [
      {
        src: "/assets/taskflow-list.png",
        alt: "The task list grouped into overdue, today and upcoming, with a project sidebar.",
        caption: "List view: overdue, today and upcoming, grouped by project.",
      },
      {
        src: "/assets/taskflow-board.png",
        alt: "A kanban board with To Do, In Progress and Done columns, each card tagged with its project.",
        caption: "Board view: each project gets its own columns.",
      },
      {
        src: "/assets/taskflow-matrix.png",
        alt: "Tasks sorted into the four Eisenhower matrix quadrants.",
        caption:
          "Eisenhower matrix: drag a task between quadrants to change its priority.",
      },
      {
        src: "/assets/taskflow-week.png",
        alt: "A week calendar with tasks coloured by project across seven days.",
        caption: "Week view on a busy week, with tasks coloured by project.",
      },
      {
        src: "/assets/taskflow-day.png",
        alt: "A day calendar with six tasks in different project colours.",
        caption: "Day view on a busy day.",
      },
      {
        src: "/assets/taskflow-brief.png",
        alt: "A daily brief summarising today's priorities and overdue work.",
        caption: "The AI daily brief, written from your own tasks.",
      },
      {
        src: "/assets/taskflow-stats-1.png",
        alt: "A statistics dashboard with completion rate, streak, an activity heatmap and deadline charts.",
        caption:
          "Statistics: completion rate, streak, a year of activity and upcoming deadlines.",
      },
      {
        src: "/assets/taskflow-stats-2.png",
        alt: "Statistics charts for project breakdown, weekly flow, turnaround time and estimation accuracy.",
        caption: "Statistics: where time goes and how accurate estimates are.",
      },
      {
        src: "/assets/taskflow-add-task.png",
        alt: "The add task form with title, project, priority, schedule, reminders and repeat settings.",
        caption: "Adding a task, with schedule, reminders and repeats.",
      },
    ],
    architecture: {
      diagram: {
        src: "/assets/taskflow-architecture.svg",
        alt: "How TaskFlow fits together: a React front end, a Flask API with services and a 36-tool MCP endpoint, PostgreSQL, Redis for rate limits, AI providers and an external reminder job.",
        width: 1000,
        height: 410,
      },
      layers: [
        {
          name: "Frontend",
          points: [
            "React and TypeScript single page app with Tailwind CSS.",
            "TanStack Query handles fetching and caching. Moving tasks and cards update the screen instantly, and other changes refetch.",
            "Axios refreshes the sign-in token in the background, and concurrent requests share one refresh.",
            "Recharts draws the statistics.",
          ],
        },
        {
          name: "Backend",
          points: [
            "Python and Flask with the application factory pattern: about 59 routes, with routes calling services that call models.",
            "SQLAlchemy 2.0 over 13 tables and 14 Alembic migrations on PostgreSQL, Marshmallow for validation.",
            "JWT sessions in HTTP-only cookies with rotating, hashed refresh tokens.",
          ],
        },
        {
          name: "AI and integrations",
          points: [
            "Gemini with Groq as a fallback, behind timeouts and a daily per-user quota.",
            "A hand-written MCP server (a stateless JSON-RPC endpoint) exposes 36 tools to AI assistants, with read or write token scopes.",
            "Web push for reminders, sent by a scheduled job, and PostHog analytics behind cookie consent.",
          ],
        },
        {
          name: "Delivery",
          points: [
            "Docker Compose for local use, GitHub Actions, and Google Cloud Run in production.",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Repeating tasks are calculated, not stored",
        why: "A repeating task has one master record. Its future occurrences are worked out when the calendar needs them, so the database stays small and changing the schedule is a single edit.",
        tradeoff:
          "The calendar logic is harder to get right than generating rows in advance would have been, because every view has to project the repeats itself.",
        detail:
          "The recurrence module handles periods, slots and time-zone-aware next and previous occurrences, and the listing service projects them into the visible window. The recurrence rules are covered by property-based tests.",
        code: [
          link(TASK, `${TASK_BE}/app/utils/recurrence.py`),
          link(TASK, `${TASK_BE}/app/services/task_listing.py`),
          link(TASK, `${TASK_BE}/tests/utils/test_recurrence_properties.py`),
        ],
      },
      {
        title: "Store order as numbers with gaps",
        why: "Dragging a task to a new spot updates one row instead of renumbering the whole list.",
        tradeoff:
          "When two neighbours run out of room, the list is renumbered once. That is rare, and it is done under a lock.",
        detail:
          "Positions are integers spaced 1,024 apart. A move puts the item between its two neighbours, looking up the real neighbour when the list is only partly loaded, and renumbers only when no whole number fits. Rows are locked during a move.",
        code: [
          link(TASK, `${TASK_BE}/app/services/order_service.py`),
          link(TASK, `${TASK_BE}/app/utils/ordering.py`),
        ],
      },
      {
        title: "The board reuses the list's rules",
        why: "Dropping a card in a Done column completes it exactly as if it had been ticked off, because the board calls the same code. There is no second path to keep in step.",
        tradeoff:
          "The board can only do what the task services allow. A column's drop action is limited to nothing, complete, reopen or trash.",
        code: [link(TASK, `${TASK_BE}/app/services/board_service.py`)],
      },
      {
        title: "Each reminder stores the time it should fire",
        why: "The background job only has to ask which reminders are due, instead of working out the schedule for every task each time it runs.",
        tradeoff:
          "The fire time is recalculated whenever a task's date changes, anything more than an hour late is skipped instead of sent late, and the job needs an external scheduler because nothing inside the app starts it.",
        detail:
          "A precomputed, indexed fire_at column drives the query, and a fired-for marker prevents sending the same reminder twice.",
        code: [link(TASK, `${TASK_BE}/app/run_reminders.py`)],
      },
      {
        title: "Let AI assistants use the app through MCP",
        why: "People can ask an assistant such as Claude to add, move or review tasks, using the same actions as the app, instead of the app copying its features into a chat window.",
        tradeoff:
          "It adds a second public surface to secure, so tokens are scoped to read or write, stored hashed, rate limited per token at 120 requests a minute, and covered by cross-user isolation tests.",
        detail:
          "The protocol layer is a hand-written, stateless JSON-RPC dispatcher with a tool registry that marks each tool read-only or destructive.",
        code: [
          link(TASK, `${TASK_BE}/app/mcp/protocol.py`),
          link(TASK, `${TASK_BE}/app/mcp/registry.py`),
        ],
      },
    ],
    challenges: [
      {
        title: "Letting a calendar drag edit the repeat pattern",
        problem:
          "A repeating task can run on several days at once, for example every Tuesday and Friday. Dragging one occurrence to a new day has to change only that day in the pattern, not restart the whole thing.",
        approach:
          "One function removes the day being dragged from and adds the new one, avoiding duplicates. Dragging Tuesday onto Monday turns 'Tuesday and Friday' into 'Monday and Friday', and dragging Tuesday onto Friday leaves just 'Friday'. A simple 'every few days' repeat shifts as a whole. The change runs under a database row lock so two simultaneous edits cannot overlap.",
        result:
          "Moving a single occurrence on the calendar edits the real schedule, with the rules covered by property-based tests.",
        code: [link(TASK, `${TASK_BE}/app/utils/recurrence.py`)],
      },
      {
        title: "Not trusting AI priority suggestions",
        problem:
          "The AI looks at up to 50 open tasks and suggests a better priority for each, but its reply is just text that could be malformed or invent tasks.",
        approach:
          "Every suggestion is checked against the real task list before it is shown. Badly formed suggestions, suggestions for tasks that do not exist, and suggestions that match the current priority are all thrown away.",
        result:
          "What remains is a short list the user can accept or ignore one at a time. Nothing changes by itself.",
        code: [link(TASK, `${TASK_BE}/app/services/ai_service.py`)],
      },
      {
        title: "Keeping users signed in when requests race",
        problem:
          "When a login expires, several requests can fail at once and each try to refresh it. With rotating refresh tokens, the second refresh would use a token the first had already replaced and could sign the user out.",
        approach:
          "The frontend shares a single in-flight refresh between concurrent requests. On the server, refresh tokens are stored as SHA-256 hashes, each rotation records when it replaced the old token, and the old token is still accepted for a 10-second grace window.",
        result:
          "Simultaneous requests and tabs no longer invalidate each other, and a leaked database would not expose usable tokens.",
        code: [
          link(TASK, `${TASK_BE}/app/services/auth_service.py`),
          link(TASK, "task-manager-frontend/src/services/api.ts"),
        ],
      },
    ],
    quality: {
      tests:
        "About 630 backend tests across 73 files (five use property-based testing with Hypothesis), about 390 frontend tests and 35 Playwright browser tests.",
      ci: "GitHub Actions runs three jobs: frontend lint, type check, Vitest and build; backend tests against PostgreSQL 18; and Playwright against a real backend.",
      other: [
        "14 Alembic migrations with round-trip tests.",
        "Cross-user isolation tests for the API and the MCP server.",
        "Refresh tokens are stored hashed and rotate with a short grace window, so two tabs refreshing at once do not sign the user out.",
        "About 15 rate limits on Redis plus a daily AI quota per user, and security headers including a report-only content security policy.",
        "MCP tokens are scoped to read or write, stored hashed and rate limited per token.",
      ],
    },
    limitations: [
      "Cross-site request protection relies on SameSite cookies instead of CSRF tokens.",
      "The Pomodoro timer keeps its state in the browser only and does not record focus time.",
      "Reminders need an external scheduler such as cron or Cloud Scheduler.",
      "Only moves, reorders and board actions update the screen optimistically. Other changes refetch.",
    ],
    impact:
      "I use TaskFlow to see where my time goes each week, and the Break It Down feature helped me start the tasks I kept putting off.",
    docs: [
      link(TASK, "docs/specs/public-demo-mode.md", "Public demo mode design"),
      link(TASK, ".github/workflows/ci.yml", "CI workflow"),
    ],
    databaseSchemaSrc: {
      url: "/assets/taskflow_schema.svg",
      width: 500,
      height: 400,
    },
  },
  {
    title: "FoodTracker",
    slug: "food-tracker",
    tier: "featured",
    url: "https://food-tracker-752853711822.europe-west1.run.app",
    img: "/assets/foodTrackerPage.png",
    pitch:
      "A food diary that builds a personal daily target from a few questions, then shows how your meals measure up across calories, macros, vitamins and minerals.",
    problem:
      "Most food trackers ask you to log everything before they give you anything back, and they feel like a test you can fail. FoodTracker starts with a short guided plan, lets you try it as a guest, and then turns the meals you log into weekly, monthly and yearly views against your own targets.",
    github: [`${GITHUB}/${FOOD}`],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "Drizzle ORM",
      "PostgreSQL",
      "Better Auth",
      "Docker",
      "Google Cloud Run",
      "Playwright",
    ],
    proof: [
      { value: "11", label: "browser tests, run in CI against a real database" },
      { value: "13", label: "unit test files covering plans, meals and reports" },
      { value: "5", label: "database migrations, run before each deploy" },
    ],
    features: [
      {
        icon: "Target",
        title: "A Plan Built Around You",
        description:
          "Six short steps turn your goal, weight and activity into daily calorie, protein, carbohydrate and fat targets, with an estimated target date.",
      },
      {
        icon: "Save",
        title: "Detailed Onboarding",
        description:
          "A guided setup covers your body basics, goal and pace, how the journey has felt, and the nutrients you want to focus on. You can do it as a guest and register afterwards.",
      },
      {
        icon: "ClipboardList",
        title: "Meal Logging",
        description:
          "Search for foods, pick a serving or enter grams, build a meal from several foods, and edit or delete it later.",
      },
      {
        icon: "BarChart",
        title: "Nutrition Reports",
        description:
          "See fibre, fats, vitamins and minerals for a week, month or year against targets, with a trend and the foods that contributed most.",
      },
      {
        icon: "TrendingUp",
        title: "Progress Dashboard",
        description:
          "Daily averages, period totals and your direction towards your target weight, without streaks or scores.",
      },
      {
        icon: "KeyRound",
        title: "Accounts and Settings",
        description:
          "Choose kg or lb, kcal or kJ and a colour theme, change your password, or schedule your account for deletion.",
      },
    ],
    screenshots: [
      {
        src: "/assets/foodtracker-dashboard.png",
        alt: "FoodTracker's weekly overview showing a daily calorie average against a 1,200 kcal target, period totals, protein, carbohydrate and fat progress bars, and a weight direction line towards a goal weight.",
        caption:
          "The weekly overview: calories, macros and progress towards your goal weight.",
      },
      {
        src: "/assets/foodtracker-nutrition.png",
        alt: "The nutrition detail page with a list of fats, a selected fibre nutrient showing a daily bar chart across the week against a 30 g goal, and top food sources.",
        caption:
          "Nutrition detail: every nutrient against its target, with a daily chart for the one you pick.",
      },
      {
        src: "/assets/foodtracker-food-search.png",
        alt: "An Add food dialog with the search term chicken breast and a list of matching foods.",
        caption: "Searching for a food to add to a meal.",
      },
      {
        src: "/assets/foodtracker-add-meal.png",
        alt: "The Add meal page with three foods (oats, banana and soy yogurt) with gram amounts, and a summary of the meal's calories, protein, carbohydrate and fat that has not been saved yet.",
        caption:
          "Building a meal: amounts in grams, with the meal's totals updating before you save.",
      },
      {
        src: "/assets/foodtracker-goal.png",
        alt: "The goal step of FoodTracker's guided setup, with options to lose, maintain or gain weight, a dream weight field and a choice of weekly pace.",
        caption: "Setup asks about your goal and how fast you want to go.",
      },
      {
        src: "/assets/foodtracker-plan.png",
        alt: "FoodTracker's plan summary showing daily calories, protein, carbohydrate and fat, an estimated target date and a note that this is an estimate.",
        caption:
          "The plan summary shows daily targets and says plainly that they are an estimate.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Frontend",
          points: [
            "Next.js App Router and React, with Tailwind CSS and accessible component primitives.",
            "react-hook-form with shared Zod schemas, so the browser and the server check input the same way.",
            "Every page has a loading skeleton, and slow food lookups keep what you typed on screen.",
          ],
        },
        {
          name: "Backend",
          points: [
            "Server actions call services, which call repositories. A shared wrapper turns thrown errors into typed results the forms can show.",
            "Better Auth handles email and password sign-in, and every service call starts by requiring the signed-in user.",
            "Meal queries are filtered by the signed-in user's id.",
          ],
        },
        {
          name: "Data",
          points: [
            "PostgreSQL with Drizzle ORM and 5 migrations.",
            "Nutrient amounts are stored per 100 g, so any serving size can be worked out from them.",
            "Food search and details come from third-party food databases, including Open Food Facts for packaged products.",
          ],
        },
        {
          name: "Delivery",
          points: [
            "A multi-stage Docker image that runs as a non-root user.",
            "Cloud Build runs the database migrations as a Cloud Run job, and only then deploys the app to Cloud Run with Cloud SQL.",
          ],
        },
      ],
    },
    decisions: [
      {
        title: "The server works out the nutrition, not the browser",
        why: "The browser only says which food and how much. The server looks up the nutrition itself and checks the chosen serving exists, so a changed request cannot invent calories.",
        tradeoff:
          "Saving a meal needs the food service to answer, so if it is down the save fails with an error instead of working offline.",
        detail:
          "The meal service loads details for each food from the provider and resolves every entry to grams before writing anything. Failures from the provider are turned into one friendly error.",
        code: [
          link(FOOD, "app/features/meals/service.ts"),
          link(FOOD, "app/features/food/service.ts"),
        ],
      },
      {
        title: "Keep a copy of each food the first time it is logged",
        why: "Reports are worked out from FoodTracker's own database, so they stay fast and do not depend on an outside service being up.",
        tradeoff:
          "The saved copy is never refreshed. If the source later corrects a food's nutrition, existing logs keep the old numbers.",
        detail:
          "A food is inserted once for each source and external id, with its nutrients stored per 100 g and its servings alongside. Later inserts of the same food do nothing.",
        code: [
          link(FOOD, "app/features/food/repository.ts"),
          link(FOOD, "app/features/nutrition/report.ts"),
        ],
      },
      {
        title: "Editing a meal replaces its foods in one step",
        why: "Saving an edited meal swaps the old list of foods for the new one together, so a meal is never left half-updated.",
        tradeoff:
          "Individual entries are not tracked over time, so there is no history of what a meal used to contain.",
        detail:
          "The update, the delete of old entries and the insert of new ones run in one database transaction, and the meal is matched on both its id and the signed-in user.",
        code: [link(FOOD, "app/features/meals/repository.ts")],
      },
      {
        title: "Let people try the app before signing up",
        why: "Asking for an account before showing any value loses people. Guests answer the setup questions first and see their plan before they register.",
        tradeoff:
          "Guest answers live only in that browser, so clearing site data or switching device loses them.",
        detail:
          "The draft is kept in local storage, validated with the same schema when it is read back, and carried into registration.",
        code: [link(FOOD, "app/features/onboarding/draft.ts")],
      },
    ],
    challenges: [
      {
        title: "Turning a few answers into a sensible target",
        problem:
          "People need a daily target, but asking for a lot of detail puts them off, and an aggressive target can be unhealthy.",
        approach:
          "The plan uses a standard formula for resting energy, scaled by activity level, then adjusts for the chosen weekly pace. Calories never drop below 1,200, protein is set from body weight, and a fast pace triggers a warning.",
        result:
          "A plan that is clearly labelled as an estimate, with the formula and its limits covered by unit tests.",
        code: [link(FOOD, "app/features/onboarding/nutrition-plan.ts")],
      },
      {
        title: "Browser tests that do not depend on the internet",
        problem:
          "Food search relies on outside services, which would make end-to-end tests slow and flaky.",
        approach:
          "A switch replaces the real food provider with a fixed set of fixture foods. CI turns it on and runs the browser tests against a real Postgres database.",
        result:
          "The add, replace and delete meal flows are tested end to end, including validation of gram amounts.",
        code: [
          link(FOOD, "app/features/food/providers/FixtureFoodProvider.ts"),
          link(FOOD, "e2e/meal-crud.spec.ts"),
        ],
      },
    ],
    quality: {
      tests:
        "13 unit test files (about 35 cases) and 11 Playwright browser tests across 5 files, covering sign-in screens, guest setup, meals, and nutrition reports.",
      ci: "GitHub Actions runs two jobs on each pull request: lint, type check, unit tests and a production build; and Chromium browser tests against PostgreSQL with seeded data.",
      other: [
        "5 database migrations, run as a separate Cloud Run job before each deploy.",
        "Input is checked with Zod on the server, and meal changes are limited to the signed-in user's own meals.",
        "The container image is multi-stage and runs as a non-root user.",
      ],
    },
    limitations: [
      "Barcode scanning is not built yet. The barcode tab is a placeholder.",
      "Foods can only be added from search. There are no custom foods, favourites or saved meals yet.",
      "Food search and details depend on one outside service, with no fallback if it is down.",
      "Deleting a meal is permanent, and there is no undo.",
    ],
    docs: [
      link(FOOD, ".github/workflows/tests.yml", "CI workflow"),
      link(FOOD, "deploy/gcp/README.md", "Cloud Run deployment guide"),
    ],
  },
  {
    title: "Expense Tracker",
    slug: "expense-tracker",
    tier: "earlier",
    url: "https://ai-expense-tracker.netlify.app/",
    img: "/assets/expenseTrackerPage.png",
    pitch:
      "An early full-stack project: a personal finance app with secure sign-in, Google sign-in and a categorised ledger of income, expenses and invoices.",
    problem:
      "Keeping track of receipts and spending across several accounts gets disorganised fast. This app gives one place to record transactions, view categorised totals and manage client invoices. I built it early on to learn backend fundamentals.",
    github: [
      `${GITHUB}/expense-tracker-frontend`,
      `${GITHUB}/expense-tracker-backend`,
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux",
      "Styled Components",
    ],
    features: [
      {
        icon: "KeyRound",
        title: "User Authentication",
        description:
          "Sign up with email and password, or sign in with Google OAuth.",
      },
      {
        icon: "Receipt",
        title: "Transaction Management",
        description:
          "Create, read, update and delete income and expense records.",
      },
      {
        icon: "ClipboardList",
        title: "Invoice Tracking",
        description: "Track client invoices alongside everyday expenses.",
      },
      {
        icon: "Layers",
        title: "Centralised State",
        description:
          "A Redux store keeps transaction lists and balances consistent across views.",
      },
    ],
    decisions: [
      {
        title: "A document database to learn it",
        why: "I picked MongoDB with Express (the MERN stack) to get hands-on experience with document storage and quick schema changes for financial records.",
        tradeoff:
          "Financial data is relational by nature, so a SQL database would have been the safer choice for a real product.",
      },
    ],
    challenges: [
      {
        title: "Learning backend fundamentals",
        problem:
          "I had mostly built frontends and wanted to understand the other half.",
        approach:
          "I built a REST API with Express, modelled the data in MongoDB and implemented sign-in with Google OAuth.",
        result:
          "A complete authenticated, persisted app, and the backend basics I built on in later projects.",
      },
    ],
  },
  {
    title: "Movie Search",
    slug: "movie-search",
    tier: "earlier",
    url: "https://ai-search-movie.netlify.app",
    img: "/assets/movieSearchPage.jpeg",
    pitch:
      "An early project: a movie search app with debounced queries, clean pagination and smooth image loading.",
    problem:
      "Browsing a large media database feels clunky when every keystroke fires a request, or when images pop onto the screen with no loading state. Movie Search debounces input and fades posters in as they load.",
    github: [`${GITHUB}/movie-search-app`],
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
          "A higher-order component fades each poster in as it downloads.",
      },
      {
        icon: "Share2",
        title: "Global Context",
        description:
          "React Context holds the current search query and page number.",
      },
    ],
    decisions: [
      {
        title: "Context instead of Redux",
        why: "React Context was enough for a query and a page number, and avoided a dependency the app did not need.",
        tradeoff:
          "It would not scale well to a larger app with a lot of shared state.",
      },
    ],
    challenges: [
      {
        title: "Debouncing and image loading",
        problem:
          "Typing quickly without debouncing would have hit the API's rate limit, and posters flickered onto the page.",
        approach:
          "I debounced the search input and wrapped each poster in a higher-order component that fades it in once downloaded.",
        result:
          "Fewer requests, and smoother browsing. It taught me early how much clear UX matters.",
      },
    ],
  },
];

export default data;
