const express = require('express');
const jsoup = require('jsoup');
const { URLSearchParams } = require('url');

const app = express();
const port = 3000; // Porta que a API irá escutar

app.get('/extract', async (req, res) => {
  const url = req.query.url; // Pega o URL do vídeo da query string

  if (!url) {
    return res.status(400).json({ error: 'URL do vídeo não fornecido.' });
  }

  try {
    const response = await jsoup.connect(url).get();
    const html = response.html();

    const pattern = /initializePlayer\('(.+?)'/; // Expressão regular para encontrar o URL do vídeo
    const match = html.match(pattern);

    if (match) {
      const videoUrl = match[1]; // Extrai o URL do vídeo
      return res.json({ videoUrl });
    } else {
      return res.status(404).json({ error: 'Não foi possível extrair o URL do vídeo.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao extrair o URL do vídeo.' });
  }
});

app.listen(port, () => {
  console.log(`API escutando na porta ${port}`);
});
