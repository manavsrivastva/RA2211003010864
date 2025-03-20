# Social Media Analytics 


A responsive React frontend web application that delivers real-time social media analytical insights.

## Features

- **Top Users Page**: Displays the top five users with the highest number of posts
- **Trending Posts Page**: Shows posts with the maximum number of comments
- **Feed Page**: Displays the posts in real-time, with the newest posts appearing at the top
- **Dark Mode**: Toggle between light and dark themes for better user experience
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Error Handling**: Robust error boundary to gracefully handle unexpected errors

## Technologies Used

- React 18 with TypeScript
- React Router for navigation
- Material UI for responsive and modern UI components
- Axios for API requests (simulated in this demo)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `/src/api`: API service and mock data
- `/src/components`: Reusable UI components
- `/src/pages`: Page components for each route
- `/src/types`: TypeScript interfaces

## Features in Detail

### Top Users
- Displays the top 5 users with the highest post counts
- Each user card shows profile picture, username, and a progress bar indicating post count
- Visual indicators for user ranking

### Trending Posts
- Shows all posts that have the maximum number of comments
- Enhanced post cards with hashtag extraction and interactive elements

### Feed
- Auto-refreshes every 30 seconds to display the latest posts
- Manual refresh button for on-demand updates
- Posts are displayed with the newest at the top

### UI Components
- **PostCard**: Enhanced with hashtag extraction, like/share buttons, and improved image display
- **UserCard**: Features progress bar for post count and visual indicators for ranking
- **Navbar**: Responsive design with mobile menu and dark mode toggle
- **ErrorBoundary**: Gracefully handles unexpected errors

## Requirements

- The React application runs exclusively on http://localhost:3000
- The application consists of three pages:
  - Top Users: Displays the top five users with the highest number of posts
  - Trending Posts: Shows posts with the maximum number of comments
  - Feed: Displays the posts in real-time, with the newest posts appearing at the top
- Uses Material UI for a responsive and modern UI

## Screnshots
![image](https://github.com/user-attachments/assets/9db8a0dc-0d37-4b6f-98a9-23225ce15784)

![image](https://github.com/user-attachments/assets/554e2efc-fcd6-4f5b-9edb-be83fbb389dd)

![image](https://github.com/user-attachments/assets/7c1a42d2-7cf1-4591-802f-789363a56917)

![image](https://github.com/user-attachments/assets/c7d2483c-f2bd-4a40-8d05-4eb4954bc01c)







