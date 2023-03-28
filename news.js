let breakingImg = document.querySelector('#breakingImg')

const apiKey = "b199fee65e6f4f3e8e04d133c9279ef8"

const fetchData = async (category,pageSize)=>{
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`
    const data = await fetch(url)
    const response = await data.json()
    console.log(response);
    return response.articles
}
//fetchData('general',5)



const add_breakingNews = (data)=>{
    breakingImg.innerHTML = `<img src=${data[0].urlToImage} alt="image">`
    breakingNews_title.innerHTML = `<a href=${data[0].url} target="_blank"><h2>${data[0].title}</h2></a>`
    breakingNews_desc.innerHTML = `${data[0].description}`
}
//fetchData('general',5).then(add_breakingNews)


