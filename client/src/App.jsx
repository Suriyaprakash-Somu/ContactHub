import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Layout from "./components/Layout";
import ContactListPage from "./pages/ContactListPage";
import ContactFormPage from "./pages/ContactFormPage";
import MapViewPage from "./pages/MapViewPage";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <ContactProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<ContactListPage />} />
          <Route path="/contacts/new" element={<ContactFormPage />} />
          <Route path="/contacts/edit/:id" element={<ContactFormPage />} />
          <Route path="/map" element={<MapViewPage />} />
        </Routes>
      </Layout>
    </ContactProvider>
  );
}

export default App;
