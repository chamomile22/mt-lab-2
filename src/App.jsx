import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import GamePage from "./pages/GamePage/GamePage";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/game'>
          <Route path=':gameId' element={<GamePage/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
};
