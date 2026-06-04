import React from 'react'
import MainRoutes from './routes/MainRoutes'
import { authContext } from './context/contextApi'


const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(
    localStorage.getItem('loggedIn') === 'true'
  );

  const [name, setName] = React.useState(
    localStorage.getItem('name') || ''
  );

  return (
    <authContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        name,
        setName
      }}
    >
      <MainRoutes />
    </authContext.Provider>
  );
};

export default App;// redeploy
