import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import './index.css';
import { store } from './store/store.ts';
import router from "./router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <RouterProvider router={router}/>
      <ToastContainer
        position='top-center'
        autoClose= {1500}
      />
  </Provider>
)
