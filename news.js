
async function getNews() {
  
  
  await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=yMvLLRebwDnGcG44GT6poqnpkDAttfJS')
    .then(d => d.json())
    .then(response => {
      console.log(response.results);

      const topNews = document.getElementById('topNews');

      for (var i = 0; i < response.results.length; i++) {
        const title = response.results[i].title;
        const abstract = response.results[i].abstract;
        const imageUrl = response.results[i]['media'][0]['media-metadata'][2].url;
        const imageCaption = response.results[i]['media'][0].caption;

        const newsItem = document.createElement('div');
        newsItem.classList.add('news');

        const newsImg = document.createElement('div');
        newsImg.classList.add('img');
        newsImg.innerHTML = `<img src="${imageUrl}" class="card-img-top" alt="${imageCaption}" title="${imageCaption}">`;

        const newsText = document.createElement('div');
        newsText.classList.add('text');

        const newsTitle = document.createElement('div');
        newsTitle.classList.add('title');
        newsTitle.innerHTML = `<a href="${response.results[i].url}" target="_blank"><h3>${title}</h3></a>`;

        const newsDescription = document.createElement('div');
        newsDescription.classList.add('description');
        newsDescription.innerHTML = `<p>${abstract}</p>`;

        newsText.appendChild(newsTitle);
        newsText.appendChild(newsDescription);

        newsItem.appendChild(newsImg);
        newsItem.appendChild(newsText);

        topNews.appendChild(newsItem);

        if (i == 0) {
          const breakingImg = document.getElementById('breakingImg');
          breakingImg.innerHTML = `<img src="${imageUrl}" class="card-img-top" alt="${imageCaption}" title="${imageCaption}">`;

          const breakingNewsTitle = document.getElementById('breakingNews').querySelector('.title h2');
          const breakingNewsTitleLink = document.createElement('a');
          breakingNewsTitleLink.href = response.results[i].url;
          breakingNewsTitleLink.target = '_blank';
          const breakingNewsTitleText = document.createElement('h2');
          breakingNewsTitleText.textContent = title;
          breakingNewsTitleLink.appendChild(breakingNewsTitleText);
          breakingNewsTitle.innerHTML = '';
          breakingNewsTitle.appendChild(breakingNewsTitleLink);

          const breakingNewsDescription = document.getElementById('breakingNews').querySelector('.description p');
          breakingNewsDescription.textContent = abstract;
        }
      }

      document.getElementById('title').innerHTML = response.title;
    })
}

getNews();
