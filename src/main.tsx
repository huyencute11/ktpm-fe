import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from "react-redux";
import { store } from "./store/store";

// const rootElement = document.getElementById('root');
// if (rootElement) {
//     ReactDOM.createRoot(rootElement).render(<App />);
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <App />
    </Provider>
);