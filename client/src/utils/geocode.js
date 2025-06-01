const cityCoordinates = {
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Coimbatore: { lat: 11.0168, lng: 76.9558 },
  Madurai: { lat: 9.9252, lng: 78.1198 },
  Tiruchirappalli: { lat: 10.7905, lng: 78.7047 },
  Salem: { lat: 11.6643, lng: 78.146 },
  Tirunelveli: { lat: 8.7139, lng: 77.7567 },
  Erode: { lat: 11.341, lng: 77.7172 },
  Vellore: { lat: 12.9165, lng: 79.1325 },
  Thoothukudi: { lat: 8.7642, lng: 78.1348 },
  Thanjavur: { lat: 10.7867, lng: 79.1378 },
};

const stateCoordinates = {
  "Tamil Nadu": { lat: 13.067439, lng: 80.237617 },          
  Kerala: { lat: 8.524139, lng: 76.936638 },                 
  Karnataka: { lat: 12.971599, lng: 77.594566 },             
  "Andhra Pradesh": { lat: 16.506174, lng: 80.648015 },      
  Telangana: { lat: 17.385044, lng: 78.486671 },             
  Maharashtra: { lat: 19.07609, lng: 72.877426 },            
  Gujarat: { lat: 23.022505, lng: 72.571365 },               
  Rajasthan: { lat: 26.912434, lng: 75.78727 },              
  Punjab: { lat: 30.733315, lng: 76.779419 },                
  Haryana: { lat: 30.733315, lng: 76.779419 },               
  "Uttar Pradesh": { lat: 26.846695, lng: 80.946167 },       
  Bihar: { lat: 25.594095, lng: 85.137566 },                 
  "West Bengal": { lat: 22.572645, lng: 88.363892 },         
  "Madhya Pradesh": { lat: 23.259933, lng: 77.412613 },      
  Odisha: { lat: 20.296059, lng: 85.824539 },                
  Assam: { lat: 26.144518, lng: 91.736237 },                 
  Goa: { lat: 15.49093, lng: 73.827849 },                    
  Delhi: { lat: 28.613939, lng: 77.209023 },                 
  "Jammu and Kashmir": { lat: 34.083656, lng: 74.797371 },   
  Chhattisgarh: { lat: 21.251384, lng: 81.629639 },          
  Jharkhand: { lat: 23.61018, lng: 85.279938 },              
  Uttarakhand: { lat: 30.325564, lng: 78.043685 },           
  "Himachal Pradesh": { lat: 31.104814, lng: 77.173403 },    
  Tripura: { lat: 23.831457, lng: 91.286777 },               
  Meghalaya: { lat: 25.578772, lng: 91.893254 },             
  Manipur: { lat: 24.817011, lng: 93.93684 },                
  Sikkim: { lat: 27.3314, lng: 88.6138 },                    
  Nagaland: { lat: 25.6751, lng: 94.1086 },                  
  Mizoram: { lat: 23.7271, lng: 92.7176 },                   
  "Arunachal Pradesh": { lat: 27.0869, lng: 93.6087 },       
  Ladakh: { lat: 34.1526, lng: 77.5771 },                    
  Puducherry: { lat: 11.9416, lng: 79.8083 },                
  Chandigarh: { lat: 30.733315, lng: 76.779419 },
  "Andaman and Nicobar Islands": { lat: 11.623377, lng: 92.726483 },
  "Dadra and Nagar Haveli and Daman and Diu": { lat: 20.3974, lng: 72.8328 },
  Lakshadweep: { lat: 10.5667, lng: 72.6417 },
};

export const geocodeAddress = (contact) => {
  let coordinates =
    cityCoordinates[contact.city] ||
    stateCoordinates[contact.state] || { lat: 11.1271, lng: 78.6569 };

  const randomLat = (Math.random() - 0.5) * 0.5;
  const randomLng = (Math.random() - 0.5) * 0.5;

  return {
    lat: coordinates.lat + randomLat,
    lng: coordinates.lng + randomLng,
  };
};

export const geocodeContacts = (contacts) =>
  contacts.map((contact) => ({
    ...contact,
    coordinates: geocodeAddress(contact),
  }));
