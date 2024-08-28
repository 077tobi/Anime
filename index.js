const express = require('express');
const youtubeSearch = require('youtube-search-api');

const app = express();
const port = 3000;

// Define a API Key do YouTube
const apiKey = 'AIzaSyCnvpTslrEESSwV3KQp28r6wIF-29DnVw8'; // Substitua pela sua API Key

// Rota para buscar vídeos do YouTube
app.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).send('O parâmetro "q" é obrigatório.');
  }

  try {
    const results = await youtubeSearch.search({
      key: apiKey,
      term: searchTerm,
      maxResults: 10,
    });

    // Retorna os resultados da busca
    res.json(results);
  } catch (error) {
    res.status(500).send('Erro ao buscar no YouTube: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
