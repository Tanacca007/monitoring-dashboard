import mongoose from 'mongoose';
import ApiKey, { IApiKey } from './models/ApiKey'; // Adjust the import path as necessary

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/yourdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Function to create a new API key document
async function createApiKey() {
  const newApiKey: IApiKey = new ApiKey({
    key: 'your-api-key' // Replace with your actual API key
  });

  try {
    const savedApiKey = await newApiKey.save();
    console.log('API key created:', savedApiKey);
  } catch (error) {
    console.error('Error creating API key:', error);
  }
}

// Call the function to create the API key
createApiKey();