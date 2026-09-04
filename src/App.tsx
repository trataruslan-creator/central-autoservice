import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Why from "./pages/Why";
import Contacts from "./pages/Contacts";

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/preimushchestva" element={<Why />} />
          <Route path="/kontakty" element={<Contacts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Analytics />
    </HashRouter>
  );
}
