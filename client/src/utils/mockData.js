export const mockContacts = [
  {
    id: "1",
    firstName: "Arun",
    lastName: "Kumar",
    email: "arun.kumar@example.com",
    phoneNumber: "9876543210",
    address: "12 Gandhi Street",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "600001",
  },
  {
    id: "2",
    firstName: "Priya",
    lastName: "Ramesh",
    email: "priya.r@example.com",
    phoneNumber: "9123456780",
    address: "45 Anna Nagar",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "641001",
  },
  {
    id: "3",
    firstName: "Sundar",
    lastName: "Raj",
    email: "sundar.raj@example.com",
    phoneNumber: "9988776655",
    address: "10 Meenakshi Street",
    city: "Madurai",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "625001",
  },
  {
    id: "4",
    firstName: "Divya",
    lastName: "Bala",
    email: "divya.bala@example.com",
    phoneNumber: "9876071234",
    address: "88 Cauvery Road",
    city: "Trichy",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "620001",
  },
  {
    id: "5",
    firstName: "Karthik",
    lastName: "Murugan",
    email: "karthik.m@example.com",
    phoneNumber: "9012345678",
    address: "77 Sathy Main Road",
    city: "Erode",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "638001",
  },
];

export const ensureMockDataInStorage = () => {
  const stored = localStorage.getItem("contacts");
  if (!stored || stored === "[]" || stored === "null") {
    localStorage.setItem("contacts", JSON.stringify(mockContacts));
    return mockContacts;
  }
  return JSON.parse(stored);
};
