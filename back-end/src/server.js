import express from 'express';

const app = express();

const port = 3000;

// cors.use(app)

// app.use(express().json);
app.listen(port, () => {
  console.log(`listeining to port: ${port}`);
});
