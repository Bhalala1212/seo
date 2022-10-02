// database
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI
mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Database goedgekeurd`);
    })
    .catch(err => {
        console.log('mongodb error', err);
        process.exit(1);
    })