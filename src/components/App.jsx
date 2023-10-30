import Messenger from './Messenger/Messenger';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <>
      <Messenger />
      <ToastContainer/>
    </>
  );
};
