import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pdf from 'html-pdf';

const pdfTemplate = require('./documents');
const app = express();
app.use(cors());

//Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Post Route - pdf generation and fetching of data
app.post('/create-pdf', (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile('./src/result.pdf', err => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
});

//Get Route = send the generated pdf to the client
app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
