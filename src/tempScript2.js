const axios = require('axios');

// API endpoint
// const API_URL = 'https://stg-api.smarden.tech/societies/v1/admin/project/service';

// Fixed project ID
const PROJECT_ID = 18;

// Optional: Set your token if needed
// const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWRtaW4iLCJvcmdJZCI6NzIsInByb2ZpbGVJZCI6NTM1LCJuYW1lIjoiU2t5bGluZSBWaWxsYXMgQWRtaW4iLCJhZG1pbklkIjoxNSwibGV2ZWwiOjEwLCJpYXQiOjE3NTA4NDg1OTEsImV4cCI6MTc2NjQwMDU5MX0.yWVQ8-NZEiRonWmvew99gk76qAwZY5Qzr38Q__QYGPY'; // Leave as "" if no auth required

// Header configuration
const HEADERS = {
  'Content-Type': 'application/json',
//   'Authorization': `Bearer ${TOKEN}` // Uncomment if required
};

// Master service IDs to be used exactly 2 times each
const masterServiceIds = [3, 1, 2, 4, 5];

// Service descriptions and sample categories
// const serviceDescriptions = [
//   'Electrical repair', 'Housekeeping help', 'Pipe leakage fix', 'Shuttle scheduling', 'WiFi repair',
//   'Lighting issue', 'Daily cleaning', 'Tap replacement', 'Driver service', 'Router configuration'
// ];

const serviceCategories = ['General', 'Urgent', 'Standard', '', 'Optional'];

const getRandomIntInMultiplesOf5 = (min, max) => {
  const minVal = Math.ceil(min / 5);
  const maxVal = Math.floor(max / 5);
  return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal) * 5;
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buildPayloads = () => {
  const allIds = masterServiceIds.flatMap(id => [id, id]); // Use each ID twice
  const shuffledIds = allIds.sort(() => 0.5 - Math.random()); // Shuffle to randomize

  return shuffledIds.map((id, idx) => ({
    masterServiceId: id,
    // description: serviceDescriptions[idx % serviceDescriptions.length],
    isActive: true,
    projectId: PROJECT_ID,
    ratePerHour: getRandomIntInMultiplesOf5(50, 500).toString(),
    serviceCategory: getRandomItem(serviceCategories)
  }));
};

const createServices = async () => {
  const payloads = buildPayloads();

  for (let i = 0; i < 7; i++) {
    try {
      const res = await axios.post(API_URL, payloads[i], { headers: HEADERS });
    //   console.log(payloads[i])
      console.log(`✅ Service ${i + 1} added:`, res.data);
    } catch (err) {
      console.error(`❌ Failed to add service ${i + 1}:`, err.response?.data || err.message);
    }
  }
};

createServices();
