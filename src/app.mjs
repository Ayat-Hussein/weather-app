import express from 'express';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import path from 'path';
import getWeather from '../getWeather.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const publicPath = path.join(__dirname, '../public');
const pathTemplate = path.join(__dirname, '../template/views');
const pathPartials = path.join(__dirname, '../template/partials');
// console.log(pathPartials);

app.set('view engine', 'hbs');
app.set('views', pathTemplate);

hbs.registerPartials(pathPartials);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', { title: 'homepage', name: 'Ayat elsherif', age: 38 });
});

// app.get("/help", (req, res) => {
//   res.send("this is help page");
// });

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'welcome to the About me page, trying my best to serve',
  });
});

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send([{ errorMessage: 'the address parameter is required' }]);
  }
  try {
    const weatherObj = await getWeather(req.query.address);
    if (weatherObj) {
      res.send([
        {
          locationName: weatherObj?.locationName,
          countr: weatherObj?.locationCountry,
          weather: weatherObj?.temperature,
        },
      ]);
    }
  } catch (error) {
    // console.log("not a location", error);
    res.send({ errorMessage: 'unable to find location ya tooota' });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Article Not found!!!',
    errorMessage:
      "Help Article Not found!!!, o can go back to <a href='/help'>The Help</a> page",
  });
});
app.get('/products', (req, res) => {
  if (!req.query.color) {
    return res.send([
      { errorMessage: "you didn't enter the search in search query" },
    ]);
  }

  res.send({ products: [] });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404, the page is not found',
    errorMessage: '404, the page you are trying to reach is Not found',
  });
});

app.listen(3000, () => {
  console.log('listen on port 3000, Ayat');
});
