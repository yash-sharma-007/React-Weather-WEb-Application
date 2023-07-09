import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import { useState } from "react";

const Mainpage = () => {

    const [Weather,setWeather] =useState({Temperature:302.92,Humidity:66,Wind:4.63,cloud:'Clouds'});
    const [City,Setcity] = useState('NewYork');
    const [Displaycity,setDisplaycity]=useState('NewYork');
    
    const getcity= (e) =>{
        const temp=e.target.value.trim();
        Setcity(temp.charAt(0).toUpperCase() + temp.slice(1));
    }
    const API_KEY='4f8728e3263d626c08313d8a00c24694';
    const show = async () => {
        try {
          if(City.length===0){
            alert("Please Enter City Name")
          }
          else{

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}`;
            var data = await fetch(url);
            data =await data.json();
            if (data.cod === '404') {
              alert("Please Enter Valid City Name");
            }
            else{
              console.log(data);
              setDisplaycity(City);
              setWeather(Weather=>({
                ...Weather,
                Temperature:data.main.temp,
                Humidity:data.main.humidity,
                Wind:data.wind.speed,
                cloud:data.weather[0].main
              }))
            }
          }
          
          // Return the weather data if needed
          
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };

  return (
    <Card
      style={{
        height: "780px",
        width: "600px",
        backgroundColor: "skyblue",
        padding: "10px",
        margin: "20px",
      }}
    >
      <div
        className="upper p-3 m-1"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ display: "flex",width:'300px' }}>
          <Form.Control
          onChange={getcity}
            className="City"
            type="text"
            placeholder="City Name"
            style={{ textAlign: "center" }}
          />
          <Button className="btn btn-primary" onClick={show} variant="primary">Search</Button>
        </div>
      </div>
      <div className="middle p-3 m-1">
            <div className="Temperature">
                <img src={require(`../Assets/${Weather.cloud}.png`)} width='200px' height='200px' alt="" />
                <h1>{(Weather.Temperature - 273.15).toFixed(0)} &deg; C</h1>
            </div>
            <h1 className="CityName"> {Displaycity} </h1>
      </div>

      <div className="lower p-3 m-1" style={{ height:'50%', display:'flex', alignItems:'center',justifyContent:'center',flexWrap:'wrap'}} >
        <div className="Humidity m-4" style={{display:'flex',width:'40%'}}>
            <img src={require('../Assets/humidity.png')} height='60px' width='60px' alt="" />
            <div style={{margin:'10px',display:'flex',flexDirection:'column'}}>
                <h3> {Weather.Humidity}% </h3>
                <h6>Humidity</h6>
            </div>
        </div>

        <div className="Wind m-4" style={{display:'flex',width:'40%'}}>
            <img src={require('../Assets/wind.png')} height='60px' width='60px' alt="" />
            <div style={{margin:'10px',display:'flex',flexDirection:'column'}}>
                    <h3> {Weather.Wind} Km/h  </h3> 
                    <h6>Wind Speed</h6>
            </div>
        </div>
      </div>

    </Card>
  );
};

export default Mainpage;
