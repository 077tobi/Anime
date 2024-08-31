const express = require('express');
const axios = require('axios');
const { URLSearchParams } = require('url');

const app = express();
const port = 3000;

app.get('/extract', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL do vídeo não fornecido.' });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;

    // Regex simplificada, ajustável de acordo com o padrão da página
    const pattern = /<source src="([^"]+)" type="video\/mp4">/i; 
    const match = html.match(pattern);

    if (match) {
      const videoUrl = match[1];
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
