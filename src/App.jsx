import { Route, Routes } from "react-router-dom"
import { useRoutesContext } from "./utils/contexts/useContext"
import React from "react"
import RenderView from "./routes/layout/RenderViews"
import { PrivateRoute } from "./components/AuthValidate/PrivateRoute"

function App() {
  const pages = useRoutesContext()

  return (
    <React.Suspense fallback={<>Cargando...</>}>
      <Routes>
        {pages.map((page, index) => {
          const routeElement = (
            <RenderView titlePage={page.title} currentPage={page.navigationBar ? page.navigationBar.navTitle : page.title} bg={page.headerStyle && page.headerStyle.changeBg} h={page.headerStyle && page.headerStyle.changeHeight} foot={page.foot}>
              <page.component />
              {/* <ComponentWrapper component={page.component} /> */}
            </RenderView>
          )
          return (
            <Route
              key={index}
              path={page.path}
              element={
                page.auth ? <PrivateRoute>{routeElement}</PrivateRoute> : routeElement
              }
            />
          )
        })}
        <Route path="*" element={"No funciona"} />
      </Routes>
    </React.Suspense>
  )
}





export default App


