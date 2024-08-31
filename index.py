import telebot
import requests
from bs4 import BeautifulSoup

# Token do seu bot
TOKEN = '7205848165:AAFueVRtFLGHtTExyoPpHV5b44IoSszOiPg'

# Crie uma instância do bot
bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start_message(message):
    bot.send_message(message.chat.id, "Olá! 👋\nEu posso extrair URLs de vídeos de algumas páginas web.\n\nEnvie-me um link de um vídeo, e eu tentarei extrair o URL do vídeo.")

@bot.message_handler(func=lambda message: True)
def extract_url(message):
    url = message.text
    chat_id = message.chat.id

    try:
        # Faz uma requisição HTTP para a página web
        response = requests.get(url)
        response.raise_for_status() # Verifica se a requisição foi bem-sucedida

        # Extrai o URL do vídeo usando Beautiful Soup
        soup = BeautifulSoup(response.content, 'html.parser')
        video_url = soup.find('source', attrs={'type': 'video/mp4'})['src']

        # Envia o URL do vídeo para o usuário
        bot.send_message(chat_id, f"URL do vídeo extraído: {video_url}")

    except requests.exceptions.RequestException as e:
        # Caso a requisição falhe ou o URL do vídeo não seja encontrado
        print(f"Erro ao extrair o URL: {e}")
        bot.send_message(chat_id, "Não foi possível extrair o URL do vídeo. 😭")

# Inicia o bot
bot.polling()
