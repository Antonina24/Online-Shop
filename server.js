
   const express = require('express');
   const app = express();
   const path = require('path');

   const port = 8000; // Choose a port number for your server

   // Serve static files
   app.use(express.static(path.join(__dirname, 'public')));

   // Start the server
   app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
   });