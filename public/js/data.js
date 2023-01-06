// Obtenha o elemento HTML no qual você deseja exibir os itens
const container = document.getElementById('items');

function getStars(rating) {
  const wholeStars = Math.floor(rating);
  const filledStars = '★'.repeat(wholeStars);
  const emptyStars = '☆'.repeat(5 - wholeStars);
  return filledStars + emptyStars;
}

fetch('public/data/itens.json')
  .then(response => response.json())
  .then(data => {
    for (const item of data) {
      const itemDiv = document.createElement('div');

      // Criando o elemento image
      const image = document.createElement('img');
      image.src = item.image;
      // Adicionando todos o elemento image em uma div
      const divimage = document.createElement('div');
      divimage.classList.add('divimage');
      divimage.appendChild(image).className = 'imagem';

      // Criando o elemento name
      const name = document.createElement('h3');
      name.textContent = item.name;

      // Criando o elemento classification
      const classification = document.createElement('p');
      classification.insertAdjacentHTML('beforeend', '<span class="star">'+getStars(item.classification)+'</span>');
      classification.insertAdjacentHTML('beforeend', ` &#711; ${item.classification} (${item.rank})`);

      // Criando o elemento price
      const price = document.createElement('div');
      price.insertAdjacentHTML('beforeend', '<span class="coin">$</span>');
      price.insertAdjacentHTML('beforeend', ` ${item.price}`);
      price.insertAdjacentHTML('beforeend', '<span class="cents">'+item.cents+'</span>');
      // Criando o elemento colors
      const colors = document.createElement('div');
      colors.textContent = '';
      // Itera sobre as cores e criar elementos de cor
      for (const color of Object.values(item.colors)) {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = color;
        colorDiv.style.width = '20px';
        colorDiv.style.height = '20px';
        colorDiv.style.borderRadius = '50px';
        colorDiv.style.display = 'inline-block';
        colorDiv.style.marginRight = '5px';
        colorDiv.style.cursor = 'pointer';
        colors.appendChild(colorDiv);
      }
      // Adicionando todos os elementos de price e color em uma div
      const precoecor = document.createElement('div');
      precoecor.classList.add('precoecor');
      precoecor.appendChild(price).className = 'money';
      precoecor.appendChild(colors);

      // Criando o elemento options
      const options = document.createElement('p');
      options.insertAdjacentHTML('beforeend', 'Options: <a class="options" href="#">'+item.options+' sizes</a>');

      // Criando o elemento botão
      const button = document.createElement('button');
      button.textContent = 'Ver produto';

      // Adicionando todos os elementos em itemDiv
      itemDiv.appendChild(divimage);
      itemDiv.appendChild(name).className = 'uk-h3';
      itemDiv.appendChild(classification);
      itemDiv.appendChild(precoecor);
      itemDiv.appendChild(options);
      itemDiv.appendChild(button).className = 'verProduto';
      // Adicionando todos os elementos em itemDiv em container

      const all = document.createElement('div');
      all.appendChild(itemDiv).className = 'box';

      container.appendChild(all).className = 'uk-width-medium-1-2 uk-width-large-1-3';
    }
  });
