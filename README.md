# 🖼️ React 3D Image Rail Scroll Effect ✨

## 📜 Description

This project demonstrates an interactive 3D image gallery rail built with React, Three.js, and React Three Fiber (`@react-three/fiber`). It showcases a diagonal arrangement of image planes with a framed glass effect, allowing users to navigate along the rail using smooth scrolling. Hovering over an image triggers a subtle animation, and clicking navigates to a specified URL.

The primary goal is to create an engaging and visually appealing way to browse through a collection of images or projects in a 3D space.

## ✨ Features

* **Diagonal 3D Rail:** Images are arranged as planes in 3D space along a configurable diagonal path.
* **Framed Glass Effect:** Each image plane features a border and a semi-transparent glass effect using `MeshPhysicalMaterial`, showcasing reflections from an environment map.
* **Smooth Scroll Navigation:** Utilizes `@react-three/drei`'s `<ScrollControls>` to map page scroll input to smooth movement along the image rail.
* **Hover Animation:** Image planes smoothly animate (slide out slightly) when hovered over, powered by `@react-spring/three`.
* **Click Navigation:** Clicking on an image plane navigates the browser to a predefined target URL.
* **Environment Reflections:** Uses an HDR environment map via `@react-three/drei`'s `<Environment>` for realistic lighting and reflections on the glass surfaces.
* **Long Scroll:** Implemented with a long scroll range via `<ScrollControls>` for an extended browsing feel.

## 💻 Tech Stack

* [React](https://reactjs.org/)
* [Three.js](https://threejs.org/)
* [React Three Fiber (`@react-three/fiber`)](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
* [Drei (`@react-three/drei`)](https://github.com/pmndrs/drei) (Helpers for R3F, including `<ScrollControls>`, `<Environment>`, `useTexture`, `useCursor`)
* [React Spring (`@react-spring/three`)](https://www.react-spring.dev/) (For hover animations)
* [Vite](https://vitejs.dev/) (Recommended Frontend Tooling) or Create React App

## 🚀 Getting Started

### Prerequisites

* Node.js (v16 or later recommended)
* npm or yarn

### Installation

1.  **Clone the repository (replace with your actual repo URL):**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
This will usually start the development server at http://localhost:5173 (Vite default) or http://localhost:3000 (CRA default). Open this URL in your browser.⚙️ Configuration & CustomizationKey areas to modify the appearance and behavior:Image Data (src/App.jsx or data source):Modify the railItems array (or however you load data) to change the images (imageUrl) and their corresponding click destinations (targetUrl). Ensure image files are placed in the /public folder.Rail Layout (src/ImageRail.jsx):Adjust the config object (xOffset, yOffset, zOffset, planeWidth, planeHeight) to change the spacing, angle, and size of the planes in the rail.Modify planeRotation for the fixed rotation applied to each plane.Glass & Frame Appearance (src/FramedGlassPlane.jsx):Tweak the glassMaterialSettings object (opacity, roughness, color, etc.) or direct material props for the desired glass look.Adjust frameMaterialSettings (color, roughness, metalness, opacity) and the frameBorder prop for the frame style.Scroll Behavior (src/App.jsx):Change the pages prop in <ScrollControls> to adjust the total scrollable length.Modify the damping prop in <ScrollControls> for scroll smoothness.Hover Animation (src/FramedGlassPlane.jsx):Modify the useSpring hook's target values (hoverPosition) and config (physics) to change the hover animation.Environment & Lighting (src/App.jsx):Change the <Environment preset="..." /> to alter reflections and ambient light.Adjust the intensity, position, and color of <ambientLight> and <directionalLight> components.✨