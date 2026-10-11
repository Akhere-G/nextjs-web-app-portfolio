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
    url: "https://app.triptrack.uk",
    img: "/assets/tripTrackPage.png",
    desc: `A collaborative travel and event planning application featuring integrated map and calendar views alongside AI-driven itinerary automation. Users can leverage AI to instantly generate daily plans, optimise routes to reduce travel times, and fetch tailored local travel tips. The platform supports real-time group collaboration with distinct Admin and Viewer roles, Google-powered event and place discovery, and seamless calendar exports for offline access.`,
    pitch:
      "Replace spreadsheets with unified platform for group trip planning and collaboration",
    coreProblem:
      "A collaborative travel and event planning application featuring integrated map and calendar views alongside AI-driven itinerary automation. Users can leverage AI to instantly generate daily plans, optimise routes to reduce travel times, and fetch tailored local travel tips. The platform supports real-time group collaboration with distinct Admin and Viewer roles, Google-powered event and place discovery, and seamless calendar exports for offline access.",
    github: ["https://github.com/Akhere-G/event-planner"],
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit (RTK Query)",
      "Tailwind",
      "Flask",
      "SQLAlchemy",
    ],
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
    desc: `A full-stack document query platform that lets users upload and organise files into project-based knowledge bases, then ask questions using Retrieval-Augmented Generation. The application supports structured document extraction, smart chunking, query rewriting, hybrid semantic and keyword search, vector embeddings, and AI-generated answers grounded in uploaded content.`,
    pitch:
      "Document Q&A platform using RAG to ask questions about your uploaded files",
    coreProblem:
      "A full-stack document query platform that lets users upload and organise files into project-based knowledge bases, then ask questions using Retrieval-Augmented Generation. The application supports structured document extraction, smart chunking, query rewriting, hybrid semantic and keyword search, vector embeddings, and AI-generated answers grounded in uploaded content.",
    github: ["https://github.com/Akhere-G/file-query"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "PostgreSQL",
      "pgvector",
      "LangChain",
      "AWS S3",
      "AWS SQS",
      "AWS Lambda",
      "Amazon Bedrock",
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
    url: "https://exercise-tracker-frontend-752853711822.europe-west1.run.app/",
    img: "/assets/gainsPage.png",
    desc: `The ultimate companion to build custom workout routines, effortlessly log your training sessions, and beautifully visualise your consistency over time.`,
    pitch:
      "Fitness companion for building routines, logging workouts, and tracking progress",
    coreProblem:
      "The ultimate companion to build custom workout routines, effortlessly log your training sessions, and beautifully visualise your consistency over time.",
    github: ["https://github.com/Akhere-G/exercise-tracker"],
    technologies: [
      "React",
      "TypeScript",
      "NextJs",
      "Tailwind",
      "Zustand",
      "FastAPI",
      "SQLAlchemy",
    ],
    databaseSchemaSrc: {
      url: "/assets/gains_schema.svg",
      width: 500,
      height: 400,
    },
  },

  {
    title: "TaskFlow",
    slug: "task-flow",
    url: "https://taskflow-752853711822.europe-west2.run.app",
    img: "/assets/taskFlowPage.png",
    desc: `A comprehensive productivity and task management application featuring flexible list and calendar views alongside AI-powered workflow automation. It includes smart habit tracking with future scheduling, natural language quick-add tools, and an AI coach for daily prioritisation and project decomposition. The platform also integrates focus-boosting features like a Pomodoro timer with automated logging, alongside detailed workload insights, activity maps, and deadline tracking visualisations.`,
    pitch:
      "A smart task management app with a detailed stats dashboard, calendar view and pomodoro tracker",
    coreProblem:
      "A comprehensive productivity and task management application featuring flexible list and calendar views alongside AI-powered workflow automation. It includes smart habit tracking with future scheduling, natural language quick-add tools, and an AI coach for daily prioritisation and project decomposition. The platform also integrates focus-boosting features like a Pomodoro timer with automated logging, alongside detailed workload insights, activity maps, and deadline tracking visualisations.",
    github: ["https://github.com/Akhere-G/task-manager"],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind",
      "Tanstack Query",
      "Flask",
      "SQLAlchemy",
    ],
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
    desc: `An app that tracks expenses and invoices. Users can make an account or sign up with google.
    Once logged in, users can see their transactions, add new transactions, and edit and delete their transactions.
    Express is used for the API, MongoDB is used for the database, Styled Components is used for styling and state
    is managed by redux. The example user account is email: 'example@example.com' and password: '123456'`,
    pitch:
      "Personal finance app for tracking expenses and managing transactions",
    coreProblem:
      "An app that tracks expenses and invoices. Users can make an account or sign up with google. Once logged in, users can see their transactions, add new transactions, and edit and delete their transactions.",
    github: [
      "https://github.com/Akhere-G/expense-tracker-frontend",
      "https://github.com/Akhere-G/expense-tracker-backend",
    ],
    technologies: [
      "MongoDB",
      "Express",
      "React",
      "Node",
      "Redux",
      "TypeScript",
      "Styled Components",
    ],
  },

  {
    title: "Movie Search",
    slug: "movie-search",
    url: "https://ai-search-movie.netlify.app",
    img: "/assets/movieSearchPage.jpeg",
    desc: `This website is built using react for the front end. The API used is
    Themoviedb. A global context is used to manage state and a higher order component
    is used to load images with a fade in animation. A pagination components is used to display
    the movies in the given space.`,
    pitch:
      "React app for searching movies using TheMovieDB API with pagination",
    coreProblem:
      "This website is built using react for the front end. The API used is Themoviedb. A global context is used to manage state and a higher order component is used to load images with a fade in animation. A pagination components is used to display the movies in the given space.",
    github: ["https://github.com/Akhere-G/movie-search-app"],
    technologies: ["React"],
  },
];

export default data;
