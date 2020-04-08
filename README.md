# Physical Comedy

## Deployed link:
https://physicalcomedy.heroku.com 

## Team Members
- Sakina Gadriwala
- Seemin Syed

## Description of The Web Application
Physical Comedy is a web application that allows users to play full body charades and pictionary with people around the world, by 'drawing' on their stream by moving their hands in the air in front of their camera. As the player moves their hands in the air, they draw on their screen, allowing other players to guess what has been drawn, or written. It supports play with multiple players and the rules are the same as anytime else you've played the game: have fun!

### Key features
Following are the key features that we plan to finish by the beta version of our project
- Usage of the camera on the device (mobile, laptop, desktop)
- Sharing audio-video-text stream
- Hand and gesture detection to toggle draw mode
- Generating random words by predefined categories

### Additional Features
Following are additional features that we plan on finishing by the final version of our project
- Responsive User Interface for different platforms 
- Different games
    * Kinetic Pictionary
    * Charades
- A real-time chat area next to the video
- Point tracking system
- Timer
- Game menu
- Generating a link/QR-Code that will direct to the game session

### Technologies That We Plan on Using
Description of Technologies:
- **React.js** for front-end user interface development
- **WebRTC and WebSockets** for peer to peer communication in video, speech and text
- **STUN and TURN servers** to allow communication behind NAT
- **Node.js** for the backend
- **Express** to build the backend APIs
- **Nedb** for backend storage of player and game stats
- **GitHub** as version control
- **Postman and Chrome** for testing front-end and back-end
- **handtrack.js** to track hand movement and gestures
- **Canvas API** to manipulate screen draw onto video streams
- **Random Word Generator APIs** to get words for the game modes 

### Top 5 technical challenges
Following are the top five technical challenges that we have anticipated:
- Enabling camera API on different platforms (mobile, tablet, desktop)
- Overlaying and streaming different video layers efficiently
- Handling serverless audio, video and text streaming between users in realtime
- Creating UI that is responsive to different platforms
- Tracking player scores and metadata
- Tracking hand gestures and movement
