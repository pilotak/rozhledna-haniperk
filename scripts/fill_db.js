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

  try {
    // create table
    await client.query(
      'CREATE TABLE sensors (temperature real, humidity real, battery smallint, timestamp timestamptz NOT NULL)',
    );

    // insert data
    await client.query(
      'INSERT INTO sensors (temperature, humidity, battery, timestamp) VALUES ($1, $2, $3, now())',
      [23.586, 68.45, 50],
    );
  } catch (err) {
    console.error('Error inserting data:', err.stack);
  } finally {
    await client.end(); // Close the connection
  }
};

// Call the insert function
insertData();
