const express = require('express');
const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 8080;
const fetch = require('isomorphic-fetch');
const cors = require('cors');

app.use(express.urlencoded({ extended: true  }));
app.use(express.json());
app.use(helmet());
app.use(cors());


app.get('/search/:term/:media', async(req, res) => {
  try {
    const { term, media } = req.params;
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=${media}&limit=25`);
    const data = await response.json();
    res.json(data.results);
  } catch (e) {
    console.log(e);
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));