import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
    
      <Routes>
        <Route path="" element={<App />}>
         {/*   <Route index element={<Home />} />  */}
           <Route path="home" element={<Home />} /> 
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
