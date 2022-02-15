// Dependency for express to receive json
const express = require('express');
// call the db config from /config/db
const connectDB = require('./config/db');
// bind the app to express
const app = express();

// Connect Database
connectDB();

// Init Middleware allows json to be interpreted
app.use(express.json({ extended: false }));

// Home route for initial entry
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/leadProvider', require('./routes/api/leadProvider'));
app.use('/api/leadList', require('./routes/api/leadList'));
app.use('/api/lead', require('./routes/api/lead'));
app.use('/api/export', require('./routes/api/export'));
app.use('/api/dupBlockRule', require('./routes/api/dupBlockRule'));
//app.use('/api/pixel', require('./Drafts/pixelroute'));

// bind port to process.env file, if not present then port defaults to 5000
const PORT = process.env.PORT || 5000;
// when the server is started it will console log Server started on port (then the port specified)
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
