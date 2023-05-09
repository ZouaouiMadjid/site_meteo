let breakingImg = document.querySelector('#breakingImg')

const fetchData = async ()=>{
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=yMvLLRebwDnGcG44GT6poqnpkDAttfJS`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response);
    return response.articles

}

const add_breakingNews = (data)=>{
    breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`
    breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`
    breakingNews_desc.innerHTML = `${data[0].description}`
}
fetchData('general',5).then(add_breakingNews)
