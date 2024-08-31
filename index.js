const { Telegraf } = require('telegraf');
const Jsoup = require('jsoup');
const { Gson } = require('gson'); // Importe a biblioteca Gson (você precisará instalá-la)

require('dotenv').config(); // Carrega as variáveis de ambiente

const bot = new Telegraf(process.env.BOT_TOKEN); // Cria uma instância do bot

bot.start((ctx) => ctx.reply('Olá! Envie-me um link para extrair o URL do vídeo.'));

bot.on('text', async (ctx) => {
  const link = ctx.message.text; // Obtém o link enviado pelo usuário

  try {
    const response = await fetch(link); // Faz uma requisição HTTP para o link
    const html = await response.text(); // Obtém o código HTML da página

    const videoInfoList = extrairURLsDeVideos(html); // Chama a função para extrair URLs

    if (videoInfoList.length > 0) {
      const videoUrl = videoInfoList[0].Video_Url; // Obtém o primeiro URL da lista
      ctx.reply(`O URL do vídeo é: ${videoUrl}`);
    } else {
      ctx.reply('Não encontrei nenhum URL de vídeo nesse link.');
    }

  } catch (error) {
    console.error('Erro ao processar o link:', error);
    ctx.reply('Ocorreu um erro ao processar seu pedido. Tente novamente.');
  }
});

// Função para extrair URLs de vídeos usando Jsoup
function extrairURLsDeVideos(html) {
  const videoInfoList = [];
  const pattern = /initializePlayer\('(.+?)'/; // Padrão para encontrar o URL do vídeo
  const matches = html.matchAll(pattern); // Busca todas as correspondências no HTML

  for (const match of matches) {
    const videoUrl = match[1]; // Obtém o URL do vídeo da correspondência
    const videoInfo = { Video_Url: videoUrl }; // Cria um objeto com o URL
    videoInfoList.push(videoInfo); // Adiciona o objeto à lista
  }

  return videoInfoList;
}

bot.launch();

// Habilita o webhook (opcional)
// bot.telegram.setWebhook(process.env.VERCEL_URL); 
