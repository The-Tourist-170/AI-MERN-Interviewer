# **AI Interviewer - MERN Stack Frontend**

Welcome to the frontend repository for the AI Interviewer application. This project provides a sleek, responsive, and interactive user interface for conducting AI-driven interviews, built with a modern React technology stack. It leverages AI to extract candidate information, generate questions, and provide detailed post-interview analysis.

**Live Application:** [**https://ai-mern-interviewer.web.app/**](https://ai-mern-interviewer.web.app/)


## **✨ Key Features**

- **AI-Powered Resume Parsing:** Automatically extracts candidate's name, email, and phone number from a PDF resume to pre-fill forms.

- **Dynamic Interview Flow:** Engages candidates with a real-time chat interface where an AI asks questions sequentially.

- **Comprehensive Candidate Dashboard:** View a list of all candidates, their overall scores, and a concise AI-generated summary of their performance.

- **Detailed Interview Reports:** Dive deep into a specific candidate's results, including a full transcript, detailed resume analysis, and final score.

- **Pause & Resume Functionality:** Users can leave and return to an in-progress interview. A "Welcome Back" modal allows them to resume where they left off.

- **Synchronized Dual-Tab View:**

* **Interviewee Tab:** A clean, focused chat interface for the candidate.

* **Interviewer Tab:** A live, read-only dashboard transcript that syncs in real-time as the candidate answers questions.

- **Responsive & Aesthetic UI:** A beautiful dark theme with golden and purple accents, glassmorphism effects, and fluid animations.

- **Robust Error Handling:** User-friendly toast notifications for handling invalid file types, network errors, or missing form fields.


## **🚀 Tech Stack & Libraries**

This project is built with a modern, efficient, and scalable frontend stack:

\| Technology | Description |

\| React JS | A JavaScript library for building user interfaces. |

\| Vite | A next-generation frontend tooling for fast development and build times. |

\| Redux Toolkit | The official, opinionated, batteries-included toolset for Redux. |

\| Tailwind CSS | A utility-first CSS framework for rapid UI development. |

\| Framer Motion | A production-ready motion library for React. |

\| React Router | The standard library for routing in React. |

\| Headless UI | Unstyled, fully accessible UI components for React. |

\| Lucide React | A beautiful and consistent icon toolkit. |

\| React Hot Toast | Smoking hot toast notifications for React. |


## **📂 Project Structure**

A brief overview of the key directories and files in this project:

/src\
├── /api          # API service functions for backend communication\
├── /components   # Reusable React components (Logo, Spinner, Modals)\
├── /hooks        # Custom React hooks (e.g., useTabSync)\
├── /pages        # Top-level page components for each route\
├── /redux        # Redux Toolkit store, slices, and actions\
├── App.jsx       # Main application component with routing setup\
└── main.jsx      # The entry point of the React application


## **🛠️ Project Setup & Installation**

To get a local copy up and running, follow these simple steps.


### **Prerequisites**

- Node.js (v18 or later recommended)

- npm or yarn package manager

- A running instance of the backend API server.


### **Installation**

1. **Clone the repository:**\
   git clone [https://github.com/your-username/ai-interviewer-frontend.git](https://github.com/your-username/ai-interviewer-frontend.git)

   cd ai-interviewer-frontend

3. **Install NPM packages:**\
   npm install

4. Configure the API Proxy:\
   For local development, you need to proxy API requests to your backend server to avoid CORS issues. Open the vite.config.js file and set the target to the address of your running backend server (e.g., http\://localhost:8080).\
   // vite.config.js\
   import { defineConfig } from 'vite'\
   import react from '@vitejs/plugin-react'\
   \
   export default defineConfig({\
     plugins: \[react()],\
     server: {\
       proxy: {\
         '/api': {\
           target: 'http\://localhost:8080', // <-- CHANGE THIS TO YOUR BACKEND URL\
           changeOrigin: true,\
         }\
       }\
     }\
   })

5. **Run the Development Server:**\
   npm run dev\
   \
   \
   The application will be available at http\://localhost:5173 (or another port if 5173 is in use).


### **Building for Production**

To create a production-ready build of the application:

npm run build

This will generate a dist directory with optimized static assets that can be deployed to any web server or hosting service.


## **🌐 Deployment**

The live version of this application is deployed on **Firebase Hosting**.

The deployment workflow is automated. Pushing to the main branch can be configured to trigger a GitHub Action that builds the project and deploys the dist folder to Firebase.

\*_This README was generated with assistance from an AI to ensure clarity and completeness._

__
