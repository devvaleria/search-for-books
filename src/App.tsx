import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { getUsersAPIKey } from "./features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ResetAPIKeyBtn from "./components/ResetAPIKeyBtn/ResetAPIKeyBtn";

function App() {
  const APIKey = useAppSelector((state) => state.search.APIKey);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsersAPIKey(APIKey))
  }, []);
  return (
    <div className="App">
      <ResetAPIKeyBtn />
      <Header />
    </div>
  );
}

export default App;
