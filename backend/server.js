const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os'); // Import the os module
require('dotenv').config();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Static folder for frontend assets
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const chatRoutes = require('./routes/chatRoutes');
app.use('/api/chat', chatRoutes);

// Error handler middleware
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Utility to get network address
const getNetworkAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost'; 
};

// Start server
app.listen(PORT, () => {
  const host = getNetworkAddress();
  console.log(`Server is running on http://${host}:${PORT}`);
});
