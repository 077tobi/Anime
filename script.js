async function carregar() {
  const res = await fetch("https://mundoisekai.online/home/lancamentos");
  const episodios = await res.json();

  let container = document.getElementById("lista");
  episodios.forEach(ep => {
    container.innerHTML += `
      <div class="anime">
        <h2>${ep.titulo}</h2>
        <img src="${ep.capa}" alt="${ep.titulo}">
        <p>${ep.descricao || ""}</p>
        <a href="https://mundoisekai.online/anime/detalhes/${ep.id}" target="_blank">Ver Detalhes</a>
      </div>
    `;
  });
}

carregar();
