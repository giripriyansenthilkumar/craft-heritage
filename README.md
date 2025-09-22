Craft Heritage
A modern web application for exploring, learning, and sharing traditional crafts and cultural heritage.

Project Structure

craft-heritage/
├── public/                # Static assets (favicon, robots.txt, images)
├── src/                   # Source code
│   ├── assets/            # Images and media
│   ├── components/        # Reusable UI components
│   │   └── ui/            # UI primitives (accordion, button, dialog, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Main app pages (Landing, Dashboard, Explore, etc.)
│   ├── App.tsx            # Main app component
│   ├── App.css            # Global styles
│   └── main.tsx           # App entry point
├── package.json           # Project metadata and dependencies
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS config
├── tsconfig*.json         # TypeScript configs
└── README.md              # Project documentation

Getting Started

1. Clone the repository

git clone https://github.com/giripriyansenthilkumar/craft-heritage.git
cd craft-heritage

2. Install dependencies

npm install

3. Start the development server

npm run dev

The app will be available at http://localhost:8080.

Technologies Used
1. Vite
2. React
3. TypeScript
4. shadcn-ui
5. Tailwind CSS

Folder Highlights

ui — UI primitives for building consistent interfaces
pages — Main pages like Landing, Dashboard, Explore, Community, Lessons, Trends, NotFound
hooks — Custom hooks for mobile detection, toast notifications, etc.
lib — Utility functions

Contributing
Feel free to open issues or submit pull requests to improve the project.

License
MIT