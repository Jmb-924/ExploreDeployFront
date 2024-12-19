import { useContext } from "react";
import { DataRouterContext } from "./routesContext";
import { DataCarritoContext } from "./carritoContext";
import { DataAuthContext } from "./authContext";
import { DataAlertContext } from "./alertsContext";

export const useRoutesContext = () => useContext(DataRouterContext)
export const useCarritoContext = () => useContext(DataCarritoContext)
export const useAuthContext = () => useContext(DataAuthContext)
export const useAlertContext = () => useContext(DataAlertContext)