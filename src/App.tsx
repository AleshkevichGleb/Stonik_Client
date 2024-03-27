import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { routes } from "./constants/links"

function App() {

  return (
    <>
      <Header/>
      <main>
        <Routes>
          {routes.map(route =>   
            <Route key={route.path} path = {route.path} element = {<route.element/>}/>
          )}
        </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
