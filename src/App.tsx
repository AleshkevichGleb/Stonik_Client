import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { routes } from "./constants/links"
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/useReduceer.ts";
import {checkUser} from "./store/slices/user.slice.ts";
import loadImage from "./assets/images/loader-icon.svg"
function App() {
    const dispatch = useAppDispatch();
    const {isLoading} = useAppSelector(state => state.user);
    useEffect(() => {
        dispatch(checkUser());
    }, []);

  return (
    <>
      <Header/>
      <main>
          {
              isLoading
                  ? <div className='loader'>
                      <img width={300} height={300} src={loadImage} alt="loader"/>
                  </div>
                  : <Routes>
                      {routes.map(route =>
                          <Route key={route.path} path = {route.path} element = {<route.element/>}/>
                      )}
                  </Routes>

          }
      </main>
      <Footer/>
    </>
  )
}

export default App
