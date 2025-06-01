import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ensureMockDataInStorage } from "../utils/mockData";

const ContactContext = createContext();

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [highlightedContactId, setHighlightedContactId] = useState(null);
  const didMount = useRef(false); 

  useEffect(() => {
    const initialContacts = ensureMockDataInStorage();
    setContacts(initialContacts);
  }, []);

  useEffect(() => {
    if (didMount.current) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } else {
      didMount.current = true;
    }
  }, [contacts]);

  const addContact = (contact) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };
    setContacts((prev) => [newContact, ...prev]);
    setHighlightedContactId(newContact.id);
    setTimeout(() => setHighlightedContactId(null), 3000);
    return newContact;
  };

  const updateContact = (id, updatedContact) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...updatedContact, id } : c))
    );
    setHighlightedContactId(id);
    setTimeout(() => setHighlightedContactId(null), 3000);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const getContact = (id) => contacts.find((c) => c.id === id);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        getContact,
        highlightedContactId,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
