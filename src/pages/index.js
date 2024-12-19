import React from "react";

export const Home = React.lazy(() => import('./Home/HomePage')) //Check - Falta Footer y Recomendado en responsive
export const Catalogo = React.lazy(() => import('./Catalogo/CatalogoPage')) // Check - Falta buscador y validar permisos (Cards)
export const Payment = React.lazy(() => import('./Payment/Payment')) // Falta - Carrito Ampliado
export const Profile = React.lazy(() => import('./Profile/Profile')) // Check1 - Se debe pasar de papel a pc
export const ViewProduct = React.lazy(() => import('./Producto/ViewProductPage')) // Check - Colores
export const NewProduct = React.lazy(() => import('./Producto/NewProductPage')) // Check - Colores y ver su efecto responsive
export const EditProduct = React.lazy(() => import('./Producto/EditProductPage')) // Check1 - Se debe copiar el new Product
export const PanelAdmin = React.lazy(() => import('./4dm1n/P4n3l4dm1n157r471v0')) // Falta