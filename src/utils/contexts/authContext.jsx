import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { jwtDecode } from "jwt-decode";
import { deleteAuthorization } from "../../services/api/IndexedDb/Delete/Auth";
import { obtenerAuthorization } from "../../services/api/IndexedDb/Get/Auth";
import { createAuthorization } from "../../services/api/IndexedDb/Create/Auth";
import { Navigate, useLocation } from "react-router-dom";

export const DataAuthContext = createContext()

export const AuthContext = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [user, setUser] = useState(null)
  const location = useLocation()
  const [timeLeft, setTimeLeft] = useState(null);

  const a = useCallback(async () => {
    const b = await obtenerAuthorization()
    if (b.length >= 1) {
      setUserAuth(b[0])
      const decodeUser = jwtDecode(b[0].userInfo)
      setUser(decodeUser.usuario)
    } else {
      setUserAuth(null)
      setUser(null)
    }
    // console.log(b)
    // console.log(userAuth)
  }, [])

  const createAuth = async (user) => {
    await createAuthorization(user)
    a()
  }

  const updateAuth = async (user) => {
    await deleteAuth()
    await createAuth(user)
  };

  const deleteAuth = useCallback(async () => {
    await deleteAuthorization(userAuth.id)
    // setUserAuth(null)
    a()
  }, [userAuth, a])


  const expireTimeToken = useCallback((token) => {
    const parseJwt = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    };

    // Obtener la información del token y establecerla en el estado
    const payload = parseJwt(token);

    // Obtener el tiempo de expiración del token
    const expirationTime = payload.exp * 1000; // Convertir a milisegundos
    const currentTime = Date.now();
    const initialTimeLeft = expirationTime - currentTime;
    setTimeLeft(initialTimeLeft);

    //TODO: Async es para...
    const onTokenExpire = async () => {
      //TODO: Evitar multiples alertas
      await alert('El token ha expirado.');
      deleteAuth()
      return <Navigate to={location.pathname} />
      // Aquí puedes añadir más lógica, como redirigir al usuario o solicitar un nuevo token
    };

    // Configurar el temporizador
    const timerId = setTimeout(onTokenExpire, initialTimeLeft);

    // Actualizar el tiempo restante cada segundo
    const intervalId = setInterval(() => {
      const newTimeLeft = expirationTime - Date.now();
      setTimeLeft(newTimeLeft);
    }, 1000);

    // Limpiar el temporizador y el intervalo cuando el componente se desmonte
    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId);
    };

  }, [deleteAuth, location])

  useEffect(() => {
    if (userAuth !== null) {
      // Función para decodificar el token y obtener el payload
      expireTimeToken(userAuth?.userInfo)
    } else {
      a()
    }
  }, [a, userAuth, deleteAuth, location, expireTimeToken])
  // createAuthorization({ userId: { id: id, r: rol }, userInfo: token, expiredTime: venceToken })

  return (
    <DataAuthContext.Provider value={{ userAuth, user, createAuth, updateAuth, deleteAuth }}>
      {children}
    </DataAuthContext.Provider>
  );
}

AuthContext.propTypes = {
  // carrito: PropTypes.array,
  children: PropTypes.node.isRequired
}