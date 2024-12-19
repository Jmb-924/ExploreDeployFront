import { Catalogo, EditProduct, Home, NewProduct, PanelAdmin, Payment, Profile, ViewProduct } from "../pages"
import { faHouseFlag, faStore } from '@fortawesome/free-solid-svg-icons'

export const allRoutes = [
   {
      title: "Coffee Life",
      path: "/",
      navigationBar: {
         navTitle: "Inicio",
         icon: faHouseFlag
      },
      headerStyle: {
         changeBg: true,
      },
      foot: true,
      component: Home,
   },
   {
      title: "Coffees",
      path: "/Coffee/List",
      navigationBar: {
         navTitle: "Vitrina",
         icon: faStore
      },
      headerStyle: {
         changeBg: true,
         changeHeight: true,
      },
      foot: true,
      component: Catalogo,
   },
   {
      title: "Coffee View",
      path: "/Coffee/View-Coffee/:marca/:id",
      headerStyle: {
         changeBg: true,
         changeHeight: true,
      },
      foot: true,
      component: ViewProduct,
   },
   {
      title: "New Coffee",
      path: "/Coffee/New-Coffee",
      headerStyle: {
         changeHeight: true,
      },
      auth: true,
      component: NewProduct,
   },
   {
      title: "Edit Coffee",
      path: "/Coffee/Edit-Coffee/:id",
      auth: true,
      component: EditProduct,
   },
   {
      title: "Panel Administrativo",
      path: "/P4n3l-4dm1n157r471v0",
      auth: true,
      component: PanelAdmin,
   },
   // {
   //    title: "Coffee Recolector",
   //    path: "/CoffeeCart",
   //    navigationBar: {
   //       navTitle: "Mis Productos",
   //    },
   //    auth: false,
   //    component: null,
   // },
   {
      title: "Pay Coffee",
      path: "/payment",
      navigationBar: {
         navTitle: "Recolector",
         icon: faStore
      },
      component: Payment,
   },
   {
      title: "Mi Perfil de Café",
      path: "/Profile/:id",
      auth: true,
      component: Profile
   }
]