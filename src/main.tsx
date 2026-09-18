import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker to cache application assets for offline access
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('New version of Ethiopian Curriculum Lesson Planner available.');
  },
  onOfflineReady() {
    console.log('Ethiopian Curriculum Lesson Planner is cached and ready for offline use.');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
