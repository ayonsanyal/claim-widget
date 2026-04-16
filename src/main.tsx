import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

type InitOptions = {
  token: string;
  apiUrl: string;
  targetId?: string;
};

(window as any).ClaimWidget = {
  init: ({ token, apiUrl, targetId }: InitOptions) => {
    let container: HTMLElement | null = null;

    
    if (targetId) {
      container = document.getElementById(targetId);
    }

    
    if (!container) {
      container = document.createElement('div');
      container.id = 'claim-widget-root';
      document.body.appendChild(container);
    }

   
    container.innerHTML = '';

    ReactDOM.createRoot(container).render(
      <App token={token} apiUrl={apiUrl} />
    );
    console.log("NEW BUILD LOADED");
  },
  
};