// {
//     @author: Raven Nathalie L. Cueto
//     @date modified: October 5, 2026 
// }

// server.js - serves the front-end files as static files using Express
import express from 'express';

const app = express();
const PORT = 3000;

// Everything inside /static_files becomes reachable as a URL,
// http://localhost:3000/index.html, /styles.css, /form.js
app.use(express.static('static_files'))

// this tells our server to listen to the port 3000
// we can also pass an optional callback function to execute after the server starts
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/index.html`)
})
