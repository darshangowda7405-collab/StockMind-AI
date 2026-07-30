import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import QueryProvider from "@/providers/QueryProvider";

import "@/styles/global.css";
import { Toaster } from "sonner";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);

<React.StrictMode>
  <QueryProvider>
    <App />
    <Toaster
      position="top-right"
      richColors
      closeButton
    />
  </QueryProvider>
</React.StrictMode>