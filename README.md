# YouTube-like OneDrive Video Player

This app allows users to log in with their OneDrive account, select folders containing videos, and view them in YouTube-style playlists. Playlists are stored in Firebase, and the UI is themed red/black for a YouTube-like look.

## Features
- OneDrive OAuth authentication
- Video folder selection and access
- YouTube-style playlists (stored in Firebase)
- Video length and title display
- Caching (server and client)
- Responsive for mobile and desktop

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure OneDrive and Firebase credentials in `.env.local`.
3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment
Deploy to Vercel for best results.

## Customization
- Theme colors: Red and black (YouTube style)
- Playlist storage: Firebase collection `Onedrive-video-player`, document ID is OneDrive username, string stores video info.

## License
MIT
