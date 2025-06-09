3D Solar System Simulation (HTML Version)
This is a standalone HTML file that creates an interactive 3D solar system simulation using Three.js. No installation or dependencies required - just open the HTML file in your browser!

Features
🌞 Realistic 3D rendering of the Sun with glow effect

🪐 All 8 planets with accurate relative sizes and distances

⏱️ Adjustable speed controls for each planet (0-5x speed)

⏯️ Play/Pause and Reset buttons

🖱️ Interactive camera controls (drag to rotate, scroll to zoom)

✨ Starfield background

🛰️ Visible orbit paths for each planet

📱 Responsive design that works on desktop and mobile

How to Use
Save the file:

Copy the entire HTML code

Paste it into a text editor

Save as solar-system.html

Run the simulation:

Simply open the HTML file in any modern web browser (Chrome, Firefox, Edge recommended)

No internet connection required after saving the file

Controls
Main Controls (Top-left panel)
Pause/Resume: Stop or restart the animation

Reset: Reset all planets to random starting positions and default speeds

Planet Speed Controls
Individual sliders for each planet (Mercury to Neptune)

Adjust speeds from 0x (stopped) to 5x (very fast)

Camera Controls
Left-click + drag: Rotate the view around the solar system

Mouse wheel: Zoom in and out

Touch gestures work on mobile devices

Technical Details
Pure HTML/CSS/JavaScript - no frameworks or build tools needed

Uses Three.js (loaded from CDN) for 3D rendering

WebGL-based with hardware acceleration

Responsive design adapts to screen size

File size: ~12KB (without Three.js CDN)

Customization Options
You can easily modify the simulation by editing these parts of the code:

Planet properties (around line 300):

Change sizes, distances, colors, or speeds

Add new planets by copying the planet object format

Visual effects:

Adjust star density (line 270)

Change sun glow intensity (line 350)

Modify orbit ring appearance (line 410)

Performance:

Reduce star count for better performance on mobile

Disable shadows if needed (line 220)

Browser Support
Works best in modern browsers that support WebGL:

Chrome

Firefox

Edge

Safari

Mobile browsers (with reduced performance)