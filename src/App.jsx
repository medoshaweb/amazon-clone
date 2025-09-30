import React, { useContext ,useEffect } from "react";

import AppRouter from "./Router";
import { StateContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  const { state, dispatch } = useContext(StateContext);
  const { user, basket } = state; // now `user` exists

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return <AppRouter />;
}

export default App;
