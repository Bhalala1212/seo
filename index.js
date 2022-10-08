// express zorgt voor de packages en de server
// morgan is een HTTP logger voor de requests
// met dotenv laden we de config.env file voor de externe configuraties
const express = require('express')
const app = express()
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

app.use(morgan('dev'))
app.use(express.json())
dotenv.config({ path: './config/config.env' });
require('./config/db')
app.use(cors())

// General routes voor overzicht - Command inhouden om naar specifieke pagina te gaan
app.use('/api/v1/', require('./routes/keyword/suggest')) //suggesties voor keywords
app.use('/api/v1/', require('./routes/keyword/pagesused')) //pageused
app.use('/api/v1/', require('./routes/keyword/instarelated')) //instarelated - Nog niet gelukt om te integreren
app.use('/api/v1/', require('./routes/domain/report')) //audit report van Lighthouse API
app.use('/api/v1/', require('./routes/domain/domainkeyword')) // domain keyword na het invullen van domeinen
app.use('/api/v1/', require('./routes/domain/subdomains')) // subdomains controleren
app.use('/api/v1/', require('./routes/auth/register')) // registeren om meerdere resultaten te zien
app.use('/api/v1/', require('./routes/auth/login')) // login | user authenticatie | historie


// .listen(process.env.PORT || 5000)
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
