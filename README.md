# 3D Planet Visualization

A Three.js-based interactive 3D visualization featuring a rotating planet surrounded by stars. This project demonstrates basic Three.js capabilities including lighting, camera controls, and 3D object rendering.

![Planet Visualization Screenshot](screenshot.png)

## Features

- Rotating 3D planet (blue sphere)
- Thousands of randomly positioned stars
- Interactive orbit controls for camera movement
- Responsive design that adapts to window resizing

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm or yarn package manager

## Dependencies

This project uses:

- [Three.js](https://threejs.org/) (v0.174.0) - 3D library
- [Vite](https://vitejs.dev/) (v6.2.0) - Development server and bundler

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/planet-visualization.git
cd planet-visualization
```

2. Install the dependencies:

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically at http://localhost:5173

## Usage

Once the application is running:

- **Rotate the view**: Click and drag with the mouse
- **Zoom in/out**: Use the mouse wheel
- **Pan the camera**: Right-click and drag (or middle mouse button)

The planet will automatically rotate on its axis.

## Customization

You can modify various aspects of the visualization by editing `main.js`:

- Change the planet's color, size, or material properties
- Adjust camera position and field of view
- Modify the number and appearance of stars
- Change lighting conditions

## Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized files in the `dist` directory, ready for deployment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
