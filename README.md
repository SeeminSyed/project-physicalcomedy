
# Physical Comedy

## Team Members
- Seemin Syed
- Sakina Gadriwala

## Description of The Web Application
Physical Comedy is a web application that enables people across the world to play online charades. It supports different game modes such as Playing with AI and Playing with Your Pals, that helps users get an engaging experience while playing the game. The rules are the same: act and have fun. We handle the rest. 
 ------------------- OR -------------------
Physical Comedy is a web application that allows users to play full body charades, pictionary and hangman with people around the world, by 'drawing' on their stream by moving their hands in the air in front of their camera. As the player moves their hands in the air, they draw on their screen, allowing either another player or the AI to guess what has been drawn, or written. It supports play with multiple people or AI and the rules are the same as anytime else you've played the game: have fun!

### Key features
Following are the key features that we plan to finish by the beta version of our project
- Usage of the camera on the device (laptop/phone)
- Sharing audio-video-text stream
- Hand and gesture detection to toggle 'draw mode' and 'draw'
- Generating random words by predefined categories
- Providing guess options

### Additional Features
Following are additional features that we plan on finishing by the final version of our project
- Good UI
- Different game modes
    * One that we specifically want to achieve is playing against AI
- A chat area next to the video with the following options
    * Having a points system
    * Muting audio and video stream
    * Timer
    * Text chat
- Generating a link/QR-Code that will direct to the game session

### Technologies That We Plan on Using
Description of Tech:
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
- **Computer Vision and Teachable Machine** for the AI aspect

### Top 5 technical challenges
Following are the top five technical challenges that we have anticipated:
- Enabling camera API on different platforms (mobile, tablet, desktop)
- Overlaying and streaming different video layers efficiently
- Handling serverless audio, video and text streaming between users in realtime
- Creating UI that is responsive to different platforms
- Tracking player scores and metadata
- Tracking hand gestures and movement
- Applying AI to interact with players meaningfully in different game modes