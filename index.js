const express = require('express');
const bodyParser = require('body-parser');
const jsoup = require('jsoup'); // Certifique-se de instalar o jsoup: npm install jsoup
const app = express();
const port = 3000;

// Use o body-parser para analisar o corpo das requisições
app.use(bodyParser.json());

// Rota para obter a lista de episódios
app.get('/episodios/:animeLink', async (req, res) => {
  const animeLink = req.params.animeLink;

  try {
    const html = await jsoup.connect(animeLink).get(); // Faz a requisição ao site
    const doc = jsoup.parse(html);
    const itemElements = doc.select("div.div_video_list a.lEp");

    const itemInfoList = [];
    for (const itemElement of itemElements) {
      const link = itemElement.attr("href");
      const titulo = itemElement.text();

      itemInfoList.push({
        "link": link,
        "titulo": titulo
      });
    }

    res.json(itemInfoList); // Envia a lista de episódios como JSON
  } catch (error) {
    console.error("Erro ao obter episódios:", error);
    res.status(500).json({ error: "Erro ao obter episódios" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
