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
}
fetchData('general',5).then(add_breakingNews)

