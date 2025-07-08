import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import JoinPDF from "./pages/JoinPdf.tsx";
import Generate from "./pages/Generate.tsx";
import ExtractImages from "./pages/ExtractImages.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
       <ConfigProvider
    
  >

      <Routes>
        <Route path="" element={<App />}>
          {/*   <Route index element={<Home />} />  */}
          <Route index element={<Home />} />
          <Route path="join" element={<JoinPDF />} />
          <Route path="generate" element={<Generate />} />
          <Route path="extract" element={<ExtractImages />} />
        </Route>
      </Routes>
  </ConfigProvider>
    </HashRouter>
  </StrictMode>
);
