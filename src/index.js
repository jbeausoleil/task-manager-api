const app = require('./app')
const port = process.env.PORT; // Port located in environment file

app.listen(port, () => {
  if (process.env.port) {
    console.log("Server is up on production port");
  }
  console.log(`Listening on http://127.0.0.1:${port}`);
});
