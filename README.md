# RA2211003010864

![WhatsApp Image 2025-03-20 at 20 30 26_44e0c35b](https://github.com/user-attachments/assets/96a16f65-6020-40dc-a406-9dbef15c570e)

A responsive React frontend web application that delivers real-time social media analytical insights.

Features
Top Users Page: Displays the top five users with the highest number of posts
Trending Posts Page: Shows posts with the maximum number of comments
Feed Page: Displays the posts in real-time, with the newest posts appearing at the top
Dark Mode: Toggle between light and dark themes for better user experience
Responsive Design: Optimized for both desktop and mobile devices
Error Handling: Robust error boundary to gracefully handle unexpected errors
Technologies Used
React 18 with TypeScript
React Router for navigation
Material UI for responsive and modern UI components
Axios for API requests (simulated in this demo)
Getting Started
Prerequisites
Node.js (v14 or later)
npm (v6 or later)
Installation
Clone the repository
Navigate to the project directory
Install dependencies:
npm install
Running the Application
Start the development server:

npm start
The application will be available at http://localhost:3000.

Project Structure
/src/api: API service and mock data
/src/components: Reusable UI components
/src/pages: Page components for each route
/src/types: TypeScript interfaces
Features in Detail
Top Users
Displays the top 5 users with the highest post counts
Each user card shows profile picture, username, and a progress bar indicating post count
Visual indicators for user ranking
Trending Posts
Shows all posts that have the maximum number of comments
Enhanced post cards with hashtag extraction and interactive elements
Feed
Auto-refreshes every 30 seconds to display the latest posts
Manual refresh button for on-demand updates
Posts are displayed with the newest at the top
UI Components
PostCard: Enhanced with hashtag extraction, like/share buttons, and improved image display
UserCard: Features progress bar for post count and visual indicators for ranking
Navbar: Responsive design with mobile menu and dark mode toggle
ErrorBoundary: Gracefully handles unexpected errors
Requirements
The React application runs exclusively on http://localhost:3000
The application consists of three pages:
Top Users: Displays the top five users with the highest number of posts
Trending Posts: Shows posts with the maximum number of comments
Feed: Displays the posts in real-time, with the newest posts appearing at the top
Uses Material UI for a responsive and modern UI
