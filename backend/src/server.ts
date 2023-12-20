import express from 'express';
import payload from 'payload';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your actual frontend origin
  credentials: true,
}));

const start = async () => {
  try {
    // Initialize Payload
    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    // Add your own express routes here

    app.listen(8000, () => {
      console.log('Server is running on port 8000');
    });
  } catch (error) {
    console.error('Failed to initialize Payload:', error);
    process.exit(1); // Terminate the application on initialization failure
  }
};

start();
