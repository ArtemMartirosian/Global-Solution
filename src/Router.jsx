import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import App from "./components/App";
import NotFound from "./pages/NotFound/NotFound";

const queryClient = new QueryClient();

export default function Routing() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" exact element={<Invoice />} />
          <Route path="/en/*" element={<Invoice />} />
          <Route path="/uz/*" element={<Invoice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function Invoice() {
  const location = useLocation();
  const [locale, setLocale] = useState(
    location.pathname.match(/\/uz|\/en/)
      ? location.pathname.match(/\/uz|\/en/)[0].replace("/", "")
      : "ru"
  );

  useEffect(() => {
    setLocale("ru");
  }, []);

  return (
    <App
      {...location}
      locale={locale}
      setLocale={(locale) => setLocale(locale)}
    />
  );
}
