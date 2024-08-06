const express = require('express');
const bodyParser = require('body-parser');
const modelUsers = require('./models/users'); // Assuming you have a file for your user model

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// PUT route to update user data
app.put('/users/:id', (req, res) => {
    const data = req.body;
    const id = req.params.id;

    modelUsers.update(id, data, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to update user data' });
        }
        // If the update is successful, return a success response
        res.json({ message: 'User data updated successfully' });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
