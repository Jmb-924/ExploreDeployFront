import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { obtenerCarrito } from "../../services/api/IndexedDb/Get/Carrito";
import { GetMethod } from "../../services/api/MongoDb/GetMethod";

export const DataCarritoContext = createContext()

export const CarritoContext = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [productosOfDb, setProductosOfDb] = useState([])

  const pDb = async () => {
    const a = await GetMethod('/productos/obtener')
    if (!a) {
      setProductosOfDb([])
    } else {
      setProductosOfDb(a)
    }
    // console.log(a)
  }

  const a = async () => {
    const b = await obtenerCarrito()
    setCarrito(b)
  }

  useEffect(() => {
    a()
    pDb()
  }, [])

  const addToCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const updateToCarrito = () => {
    a()
  }

  return (
    <DataCarritoContext.Provider value={{ carrito, productosOfDb, pDb, setCarrito, addToCarrito, updateToCarrito, setProductosOfDb }}>
      {children}
    </DataCarritoContext.Provider>
  );
}

CarritoContext.propTypes = {
  // carrito: PropTypes.array,
  children: PropTypes.node.isRequired
}