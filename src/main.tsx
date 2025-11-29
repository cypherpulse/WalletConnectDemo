import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Application entry point - imports global styles with updated green/orange/black theme
// Color variables defined in index.css provide consistent theming across all components

createRoot(document.getElementById("root")!).render(<App />);
