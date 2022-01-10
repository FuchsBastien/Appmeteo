const CLEAPI = 'dc6213a6c3ef2d2335152ed981eadef4';
let resultatsAPI ;

const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');

/*condition si localisation activée ou désactivée*/
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);

    }, () => {
        alert(`Vous avez refusé la géolocalisation, l'application ne peur pas fonctionner, veuillez l'activer.!`)
    })
}


 /*fonction appel API*/
function AppelAPI(long, lat) {
      //console.log(long, lat)
      //on ajoute ${} et &exclude=minutely&units=metric&lang=fr pour exclure min, unité en m et en français
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
      //on transforme les données en fichier json
      .then((reponse) => {
          return reponse.json();
      })
      //on stocke les données du fichier json dans une variable
      .then((data) => {
          console.log(data)
          resultatsAPI = data;
            
        //on appelle des données de ce fichier json
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI.timezone;
      }) 

     
   
}         