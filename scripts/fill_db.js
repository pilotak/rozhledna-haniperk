const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// Function to insert data
const insertData = async () => {
  await client.connect();

  const query = 'INSERT INTO sensors (temperature, humidity, battery, timestamp) VALUES ($1, $2, $3, now())';
  const values = [23.586, 68.45, 50];

  try {
    const res = await client.query(query, values);
    console.log('Data inserted:', res.rowCount);
  } catch (err) {
    console.error('Error inserting data:', err.stack);
  } finally {
    await client.end(); // Close the connection
  }
};

// Call the insert function
insertData();
