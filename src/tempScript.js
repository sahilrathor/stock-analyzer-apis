const axios = require('axios');

const API_URL = 'https://stg-api.smarden.tech/societies/v1/admin/amenity';
const PROJECT_ID = 18; // Fixed project ID
const NUM_AMENITIES_TO_ADD = 10; // Change this as needed

// List of allowed master amenity IDs
const masterAmenityIds = [11, 4, 3, 6, 2, 10, 14, 15, 5, 12, 7];

// Optional: Add bearer token if required
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJvcmdJZCI6NzIsInByb2ZpbGVJZCI6NTM1LCJuYW1lIjoiU2t5bGluZSBWaWxsYXMgQWRtaW4iLCJhZG1pbklkIjoxNSwibGV2ZWwiOjEwLCJpYXQiOjE3NTA4NDg1OTEsImV4cCI6MTc2NjQwMDU5MX0.yWVQ8-NZEiRonWmvew99gk76qAwZY5Qzr38Q__QYGPY'; // Leave as "" if no auth required

// Location samples
const locations = ['Ground Floor', '1st Floor', '2nd Floor', 'Basement', 'Terrace', 'Club House'];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => {
  const minVal = Math.ceil(min / 5);
  const maxVal = Math.floor(max / 5);
  const randomMultiplier = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
  return randomMultiplier * 5;
};


const createAmenity = async () => {
  for (let i = 0; i < NUM_AMENITIES_TO_ADD; i++) {
    const payload = {
      masterAmenityId: getRandomItem(masterAmenityIds),
      location: getRandomItem(locations),
      capacity: getRandomInt(10, 100),
      pricePerHour: getRandomInt(50, 500).toString(),
      isActive: true,
      projectId: PROJECT_ID
    };

    try {
      console.log(payload)
      const res = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          // Uncomment below if auth is required
          'Authorization': `Bearer ${TOKEN}`
        }
      });
      console.log(`✅ Amenity ${i + 1} added successfully`, res.data);
    } catch (err) {
      console.error(`❌ Error adding amenity ${i + 1}:`, err.response?.data || err.message);
    }
  }
};

// createAmenity();
