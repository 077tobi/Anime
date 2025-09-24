function trocarEpisodio(novoLink) {
  const player = document.getElementById("player");
  player.src = novoLink;
  player.play();
}
