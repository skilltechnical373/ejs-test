const express = require('express');
const path = require('path');
const app = express();
const { v4: uuidv4 } = require('uuid');

const info = [
  {
    id: '',
    name: 'aman',
    email: 'dsd',
    phone: '',
    date_in: '',
    date_out: '',
    payment: '',
  },
];

const PORT = process.env.PORT || 4000;

app.use(express.json());

const parseData = (req, res, next) => {
  if (req.method === 'POST') {
    const formData = {};
    req.on('data', (data) => {
      const parsedData = decodeURIComponent(data).split('&');

      for (let data of parsedData) {
        decodedData = decodeURIComponent(data.replace(/\+/g, '%20'));

        const [key, value] = decodedData.split('=');

        formData[key] = value;
      }

      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(path.resolve(__dirname, './views/form.ejs'));
});

app.get('/result', (req, res) => {
  res.render(path.resolve(__dirname, './views/result.ejs'));
});

let results = [];
app.post('/delete', (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  results = results.filter((r) => r.id !== id);
  return res.render(path.resolve(__dirname, './views/result.ejs'));
});

app.get('/search', (req, res) => {
  res.render(path.resolve(__dirname, '/views/search.ejs'));
});

app.post('/information', parseData, (req, res) => {
  const data = req.body;
  results.push({
    id: uuidv4(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    payment: data.payment,
  });

  return res.render(path.resolve(__dirname, './views/result.ejs'), {
    results,
  });
});

// Setting up listener
app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
