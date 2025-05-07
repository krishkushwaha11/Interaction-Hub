
import { createRoot } from 'react-dom/client';
import { setupMockData } from './utils/mockDataGenerator';
import App from './App.tsx';
import './index.css';

// Initialize the mock data
setupMockData();

createRoot(document.getElementById("root")!).render(<App />);
