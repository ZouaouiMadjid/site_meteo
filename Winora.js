/*let url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={cd7a84365adaf9221c53adec2f89d106}"
 fetch(url).then((reponse)=>
 reponse.json().then((data)=>console.log(data)));*/

 async function gettemperature(){
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=Bron&appid=cd7a84365adaf9221c53adec2f89d106"
    const resul = await fetch(`${apiurl}`)
    const data = await resul.json()
    let  temp =  data.main.temp - 273.15
    console.log(data);
    document.getElementById('pays1').innerHTML =  " <i class='fas fa-cloud-showers-heavy blue-color'></i>" + " " + " " +  " " +  temp.toFixed(1) + "°C"  +  " "  +  data.name  
  } 
  gettemperature()
    
  
    async function gettemperature2(){
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=Lyon&appid=cd7a84365adaf9221c53adec2f89d106"
    const resul = await fetch(`${apiurl}`)
    const data = await resul.json()
    let  temp =  data.main.temp - 273.15
    console.log(data);
    document.getElementById('pays2').innerHTML =  "<i class='fa fa-cloud'></i>"  + " " + " "+ " " + " " +  + " " +  temp.toFixed(1) + "°C"  +  " "  +  data.name 
    
  }
   gettemperature2()
  
  
    async function gettemperature1(ville){
      ville = document.getElementById('entre').value
      console.log(ville);
      const apiurl1 = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=cd7a84365adaf9221c53adec2f89d106`
    const resul1 =   await fetch(`${apiurl1}`)
    const data1 =    await resul1.json()
    let  temp1 =  data1.main.temp - 273.15
    document.getElementById('pays2').innerHTML =  "<i class='fa fa-cloud'></i>" + " " +  temp1.toFixed(1) + "°C"  +  " "  +  data1.name 
    
  }
