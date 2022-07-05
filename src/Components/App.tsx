import React, {useEffect} from "react";
import { MainPage } from "./MainPage";
import "./App.css";

function App() {
  useEffect(() => {
    document.title = "Main page";
  },[]);
  return <MainPage />;
}

export default App;
