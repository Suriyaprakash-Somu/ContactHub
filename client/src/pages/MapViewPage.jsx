import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map as MapIcon } from "lucide-react";
import { useContacts } from "../context/ContactContext";
import { geocodeContacts } from "../utils/geocode";

const MapViewPage = () => {
  const { contacts } = useContacts();
  const [contactsWithCoordinates, setContactsWithCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState([11.1271, 78.6569]);
  const [mapZoom, setMapZoom] = useState(6);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (contacts.length > 0) {
      const geoContacts = geocodeContacts(contacts);
      setContactsWithCoordinates(geoContacts);
      if (geoContacts.length === 1) {
        const { coordinates } = geoContacts[0];
        setMapCenter([coordinates.lat, coordinates.lng]);
        setMapZoom(10);
      }
    }

    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [contacts]);

  return (
    <div className="container">
      <div className="mb-4">
        <h1 className="h4">Contact Map View</h1>
        <p className="text-muted">
          View the geographical distribution of your contacts
        </p>
      </div>

      <div className="card shadow-sm">
        <div
          className="card-body p-0 position-relative"
          style={{ height: "500px" }}
        >
          {!isMapLoaded && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light"
              style={{ zIndex: 10 }}
            >
              <div className="spinner-border text-primary" role="status" />
            </div>
          )}

          {contacts.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center text-center w-100 h-100 p-4">
              <MapIcon size={48} className="text-muted mb-3" />
              <h5>No contacts to display</h5>
              <p className="text-muted">
                Add some contacts to see them on the map
              </p>
            </div>
          ) : (
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
              whenCreated={() => setIsMapLoaded(true)}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {contactsWithCoordinates.map((contact) => (
                <Marker
                  key={contact.id}
                  position={[contact.coordinates.lat, contact.coordinates.lng]}
                >
                  <Popup>
                    <div className="small">
                      <strong>
                        {contact.firstName} {contact.lastName}
                      </strong>
                      <br />
                      {contact.address}
                      <br />
                      {contact.city}, {contact.state} {contact.postalCode}
                      <br />
                      {contact.country}
                      <br />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-primary d-block mt-2"
                      >
                        {contact.email}
                      </a>
                      <a
                        href={`tel:${contact.phoneNumber}`}
                        className="text-primary"
                      >
                        {contact.phoneNumber}
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;
