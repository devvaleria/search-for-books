import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {
  getSearchResult,
  getSelectedBook,
  setSelectedBook,
} from "./features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

function App() {

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
