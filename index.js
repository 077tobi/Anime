const express = require('express');
const axios = require('axios'); // Importa a biblioteca axios para requisições HTTP
const cheerio = require('cheerio'); // Importa a biblioteca cheerio para análise de HTML
const app = express();
const port = 3000;

// Use o body-parser para analisar o corpo das requisições
app.use(bodyParser.json());

// Rota para obter a lista de episódios
app.get('/episodios/:animeLink', async (req, res) => {
  const animeLink = req.params.animeLink;

  try {
    // Faz a requisição HTTP para o link do anime
    const response = await axios.get(animeLink);
    const html = response.data;

    // Analisa o HTML usando cheerio
    const $ = cheerio.load(html);

    // Seleciona os elementos que representam os links dos episódios
    const itemElements = $('div.div_video_list a.lEp');

    const itemInfoList = [];
    itemElements.each((index, element) => {
      const link = $(element).attr('href');
      const titulo = $(element).text();

      itemInfoList.push({
        "link": link,
        "titulo": titulo
      });
    });

    res.json(itemInfoList);
  } catch (error) {
    console.error("Erro ao obter episódios:", error);
    res.status(500).json({ error: "Erro ao obter episódios" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
