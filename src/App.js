//frameworks
import { Container, Row, Col, Button, Modal, Form, Navbar, Nav } from 'react-bootstrap';
import { Helmet } from 'react-helmet'
import React, { useState, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated, config } from "@react-spring/three";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// assets:
// img
import arrow_f from "./img/arrow_front.png";
import arrow_b from "./img/arrow_back.png";
import arrow_c from "./img/arrow.png";
import max_temp from "./img/max.png";
import min_temp from "./img/min.png";
import humidity_img from "./img/humidity.png";
import presure_img from "./img/presure.png";
import wind_img from "./img/wind.png";
import cloud_img from "./img/cloud.png";
import sunset_img from "./img/sunset.png";
import sunrise_img from "./img/sunrise.png";
// 3d models
import { OrbitControls } from '@react-three/drei';
import Clouds_grey_white from './Models/Clouds_grey_white';
import Clouds_grey from './Models/Clouds_grey';
import Clouds_moon from './Models/Clouds_moon';
import Clouds_sun from './Models/Clouds_sun';
import Clouds from './Models/Clouds';
import Mist from './Models/Mist';
import Moon_rain from './Models/Moon_rain';
import Moon from './Models/Moon';
import Rain from './Models/Rain';
import Snow from './Models/Snow';
import Sun_rain from './Models/Sun_rain';
import Sun from './Models/Sun';
import Thunder from './Models/Thunder';
import { wait } from '@testing-library/user-event/dist/utils';


function App() {
  const onSubmit_r = (e) => {
    // Prevent the default behavior of the form submit (page refresh)
    e.preventDefault();
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <title>Redystum.tk</title>
      </Helmet>
      <Container fluid>
        <Row>
          <Col md={12}>

            <Navbar bg="dark" expand="lg" className='rounded' fixed="top">
              <Container>
                <Navbar.Brand className='text-white'>
                  <button href="#" className="btn-flip" onClick={() => (handleShow(), setTimeout(change_city, 20))} data-back="Change Local" data-front={city} id="change_button"></button>
                  <img src={arrow_f} className="img-fluid invisible" id="arrow_front" alt="" width="5%" />
                  <img src={arrow_b} className="img-fluid invisible" id="arrow_back" alt="" width="10%" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  </Nav>
                  <Navbar.Text>
                    <a href="http://redystum.tk">
                      <h5 className='text-secondary'>redystum.tk</h5>
                    </a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div id="main_div">
              <div id="errors_div"></div>
              <div id="3d_view"></div>
              <div style={{ height: (window.innerHeight * .4) + 90 }}></div>
              <div className="card_all" id='card_body'>
                <div className="text-center" id="first_card"></div>
                <div id="secound_card"></div>
              </div>
              <div id="forecast_card">
                <Row>
                  <h1 className="forecast text-center" id="forecast_title"></h1>
                </Row>
                <div className='card_all' id="third_card"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div>
        <Modal show={show} onHide={handleClose} className="blur text-black" controlid="change_city" aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header closeButton>
            <Modal.Title>Change Local</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit_r}>
              <Form.Group className="mb-3">
                <Form.Label>Write the location you want</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  id="new_loc"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" id="save_loc" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>);
}

function get_inicial_city() {
  function getCoordintes() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      getCity(coordinates);
    }

    function error(err) {
      console.log(`ERROR(${err.code}): ${err.message}`);
      var coordinates = "error";
      city = "City";
      country = "Country";
      getCity(coordinates);

      function Error_main() {
        if (err.code == 1) {
          return (
            <>
              <br></br><br></br><br></br><br></br><br></br><br></br>
              <Row>
                <div className="alert alert-danger" role="alert">
                  <strong>Error!</strong> You have denied access to your location.
                </div>
              </Row>
              <Row>
                <div className="alert alert-info" role="alert">
                  <strong>Fix:</strong> Click on the button above to choose the location.
                </div>
              </Row>
            </>
          );
        }
        else {
          return (
            <>
              <br></br><br></br><br></br><br></br><br></br><br></br>
              <Row>
                <div className="alert alert-danger" role="alert">
                  <strong>Error!</strong> Your location is unavailable.
                </div>
              </Row>
              <Row>
                <div className="alert alert-info" role="alert">
                  <strong>Fix:</strong> Click on the button above to choose the location.
                </div>
              </Row>
            </>
          )
        }
      }
      wait(1).then(() => {
        document.getElementById("arrow_front").classList.remove("invisible");
        document.getElementById("arrow_back").classList.remove("invisible");
        document.getElementById("3d_view").innerHTML = "";
        document.getElementById("first_card").innerHTML = "";
        document.getElementById("secound_card").innerHTML = "";
        document.getElementById("third_card").innerHTML = "";
        document.getElementById("forecast_title").innerHTML = "";
        const container = document.getElementById('errors_div');
        const root = createRoot(container);
        root.render(<Error_main />);
      });
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function getCity(coordinates) {
    if (coordinates == "error") {
      return city, country;
    }

    var lat = coordinates[0];
    var lng = coordinates[1];

    const key = "pk.650e9aa49643fd5365a3646193c6ebed";

    fetch("https://us1.locationiq.com/v1/reverse.php?key=" + key + "&lat=" + lat + "&lon=" + lng + "&format=json")
      .then((res) => res.json())
      .then((data) => {
        city = data.address.state;
        country = data.address.country;

        document.getElementById("change_button").setAttribute("data-front", city);
        document.getElementById("arrow_front").classList.add("invisible");
        document.getElementById("arrow_back").classList.add("invisible");
        get_weather();
        return city, country;
      })
  }

  getCoordintes();
}

function change_city() {
  document.getElementById("new_loc").value = city + ", " + country;

  document.getElementById("save_loc").addEventListener("click", change_local);

  function change_local() {
    var new_local = document.getElementById("new_loc").value;
    city = new_local.split(", ")[0];
    country = new_local.split(", ")[1];
    document.getElementById("change_button").setAttribute("data-front", city);
    document.getElementById("arrow_front").classList.add("invisible");
    document.getElementById("arrow_back").classList.add("invisible");
    document.getElementById("third_card").innerHTML = "";
    document.getElementById("forecast_title").innerHTML = "";
    get_weather();
  }

}

function get_weather() {

  function Error() {
    return (
      <>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <Row>
          <div className="alert alert-danger" role="alert">
            <strong>Error!</strong> Your location is unavailable.
          </div>
        </Row>
        <Row>
          <div className="alert alert-info" role="alert">
            <strong>Fix:</strong> Click on the button above to choose other the location.
          </div>
        </Row>
      </>
    )
  }

  var weather_url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + country + "&appid=" + "f60cc8c8b061cecca117979598493cda";

  fetch(weather_url)
    .then((res) => res.json())
    .then((data) => {

      if (data.length == 0) {
        document.getElementById("change_button").setAttribute("data-front", city);
        document.getElementById("arrow_front").classList.remove("invisible");
        document.getElementById("arrow_back").classList.remove("invisible");
        document.getElementById("3d_view").innerHTML = "";
        document.getElementById("first_card").innerHTML = "";
        document.getElementById("secound_card").innerHTML = "";

        const container = document.getElementById('errors_div');
        const root = createRoot(container);
        root.render(<Error />);
        return;
      }
      var lat = data[0].lat;
      var lon = data[0].lon;
      var lang = data[0].country;
      var cords = [lat, lon, lang];
      weather(cords);
      return cords;
    })

  function weather(cords) {
    var weather_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + cords[0] + "&lon=" + cords[1] + "&units=metric" + "&lang=" + cords[2].toLowerCase() + "&appid=" + "f60cc8c8b061cecca117979598493cda";


    fetch(weather_url)
      .then((res) => res.json())
      .then((data) => {
        var weather = data.weather[0].main;
        var temperature = data.main.temp;
        var temp_min = data.main.temp_min;
        var temp_max = data.main.temp_max;
        var humidity = data.main.humidity;
        var wind = data.wind.speed;
        var wind_deg = data.wind.deg;
        var clouds = data.clouds.all;
        var pressure = data.main.pressure;
        var sunrise = data.sys.sunrise;
        var sunset = data.sys.sunset;
        city = data.name;
        country = data.sys.country;
        weather_icon = data.weather[0].icon;
        var date = new Date(sunrise * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var sunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        var date = new Date(sunset * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var sunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        var weather_icon_url = "http://openweathermap.org/img/wn/" + weather_icon + "@2x.png";

        temperature = temperature.toString().split(".");
        temp_max = temp_max.toString().split(".");
        temp_min = temp_min.toString().split(".");

        document.getElementById("arrow_front").classList.add("invisible");
        document.getElementById("arrow_front").classList.add("invisible");
        document.getElementById("errors_div").innerHTML = "";

        function get_wind_direction(wind_deg) {
          var val = parseInt((wind_deg / 22.5) + .5)
          var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
          return arr[(val % 16)]
        }

        var directions = get_wind_direction(wind_deg);

        var img_rotation_wind = "rotate(" + wind_deg + "deg)";

        var weather_url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cords[0] + "&lon=" + cords[1] + "&units=metric" + "&lang=" + cords[2].toLowerCase() + "&appid=" + "f60cc8c8b061cecca117979598493cda";


        fetch(weather_url)
          .then((res) => res.json())
          .then((data) => {
            var hourly = data.hourly;
            var labels = [];
            var data_rain = [];
            var data_sun = [];
            for (var i = 0; i < 15; i++) {
              var hour = hourly[i].dt
              var data_rain_ = hourly[i].pop;
              var data_sun_ = hourly[i].temp;
              data_rain.push(data_rain_ * 100);
              data_sun.push(data_sun_);
              var date = new Date(hour * 1000);
              var hours = date.getHours();
              labels.push(hours);
            }

            const data_table_rain = {
              labels,
              datasets: [
                {
                  lineTension: 0.4,
                  data: data_rain,
                  borderColor: "rgb(10, 152, 247)",
                  backgroundColor: "rgba(10, 152, 247, 0.384)"
                }
              ]
            };
            const data_table_sun = {
              labels,
              datasets: [
                {
                  lineTension: 0.4,
                  data: data_sun,
                  borderColor: "rgb(255, 255, 0)",
                  backgroundColor: "rgba(255, 255, 0, 0.384)"
                }
              ]
            };


            ChartJS.register(
              CategoryScale,
              LinearScale,
              PointElement,
              LineElement,
              Title,
              Tooltip,
              Legend
            );

            const options = {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                  position: "top"
                },
                title: {
                  display: false,
                }
              },
            };

            var f_temp = [];
            var f_img = [];
            var f_day = [];
            var f_week = [];
            var format_options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            for (var i = 1; i < 7; i++) {
              var f_date = new Date(data.daily[i].dt * 1000);
              var f_day_ = f_date.toLocaleDateString().split("/");
              f_day.push(f_day_[0] + "/" + f_day_[1]);
              var f_week_ = f_date.toLocaleDateString("en-US", format_options).split(",")[0]
              f_week.push(f_week_);
              var f_temp_ = data.daily[i].temp.day;
              f_temp.push(f_temp_);
              var f_img_ = data.daily[i].weather[0].icon;
              f_img.push(f_img_);
            }



            function Inicial_card() {
              return (
                <>
                  {/* <div className="cards"> */}
                  <Row>
                    <h1 className="card_title">{city}</h1>
                  </Row>
                  <Row>
                    <h1 className='temperature'>{temperature[0]}<span className="fs-6">.{temperature[1]} °C</span></h1>
                  </Row>
                  {/* </div> */}
                </>
              )
            }

            function Second_card() {
              return (
                <>
                  <div style={{ height: '150px' }}>
                    <h3>Probability of rain <span className="fs-6">(%)</span></h3>
                    <Line options={options} data={data_table_rain} />
                  </div>
                  <div style={{ height: '50px' }}></div>
                  <div style={{ height: '150px' }}>
                    <h3>Temperature <span className="fs-6">(°C)</span></h3>
                    <Line options={options} data={data_table_sun} />
                  </div>
                  <hr className='my-4'></hr>
                  <div className="cards">
                    <Row>
                      <Col md={4}>
                        <img src={max_temp} className="img-fluid"></img>
                        <br></br>Max temperature:
                        <h3>{temp_max[0]}<span className="fs-6">.{temp_max[1]} °C</span></h3>
                      </Col>
                      <Col md={4}>
                        <img src={min_temp} className="img-fluid"></img>
                        <br></br>Min temperature:
                        <h3>{temp_min[0]}<span className="fs-6">.{temp_min[1]} °C</span></h3>
                      </Col>
                      <Col md={4}>
                        <img src={humidity_img} className="img-fluid"></img>
                        <br></br>Humidity:
                        <h3>{humidity}%</h3>
                      </Col>
                    </Row>
                  </div>
                  <hr className='my-3'></hr>
                  <div className="cards">
                    <Row>
                      <Col md={4}>
                        <img src={weather_icon_url} className="img-fluid"></img>
                        <br></br>Sky:
                        <h3>{weather}</h3>
                      </Col>
                      <Col md={4}>
                        <img src={wind_img} className="img-fluid"></img>
                        <br></br>Wind:
                        <h3>{wind} m/s</h3>
                      </Col>
                      <Col md={4}>
                        <img src={presure_img} className="img-fluid"></img>
                        <br></br>Pressure:
                        <h3>{pressure} hPa</h3>
                      </Col>
                    </Row>
                  </div>
                  <hr className='my-3'></hr>
                  <Row>
                    <Col md={6}>
                      <div className="cards">
                        <img src={cloud_img} className="img-fluid"></img>
                        <br></br>Clouds:
                        <h3>{clouds}%</h3>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="cards">
                        <img src={arrow_c} className='img-fluid' style={{ transform: img_rotation_wind }}></img>
                        <br></br>Wind Direction:
                        <h3>{wind_deg}° ({directions})</h3>
                      </div>
                    </Col>
                  </Row>
                  <hr className='my-3'></hr>
                  <div className="cards">
                    <Row>
                      <Col md={6}>
                        <img src={sunrise_img} className="img-fluid"></img>
                        <br></br>Sunrise:
                        <h3>{sunrise}</h3>
                      </Col>
                      <Col md={6}>
                        <img src={sunset_img} className='img-fluid'></img>
                        <br></br>Sunset:
                        <h3>{sunset}</h3>
                      </Col>
                    </Row>
                  </div>
                </>
              );
            }

            function Forecast_card() {
              return (
                <>
                  <div className="cards">
                    <Row>
                      <Col md={2}>
                        <img src={"http://openweathermap.org/img/wn/" + f_img[0] + "@2x.png"}></img>
                        <h4>{f_week[0]}</h4>
                        <h3>{f_temp[0]}</h3>
                        <h4>{f_day[0]}</h4>
                      </Col>
                      <Col md={2}>
                        <img src={"http://openweathermap.org/img/wn/" + f_img[1] + "@2x.png"}></img>
                        <h4>{f_week[1]}</h4>
                        <h3>{f_temp[1]}</h3>
                        <h4>{f_day[1]}</h4>
                      </Col>
                      <Col md={2}>
                        <img src={"http://openweathermap.org/img/wn/" + f_img[2] + "@2x.png"}></img>
                        <h4>{f_week[2]}</h4>
                        <h3>{f_temp[2]}</h3>
                        <h4>{f_day[2]}</h4>
                      </Col>
                      <Col md={2}>
                        <img src={"http://openweathermap.org/img/wn/" + f_img[3] + "@2x.png"}></img>
                        <h4>{f_week[3]}</h4>
                        <h3>{f_temp[3]}</h3>
                        <h4>{f_day[3]}</h4>
                      </Col>
                      <Col md={2}>
                        <img src={"http://openweathermap.org/img/wn/" + f_img[4] + "@2x.png"}></img>
                        <h4>{f_week[4]}</h4>
                        <h3>{f_temp[4]}</h3>
                        <h4>{f_day[4]}</h4>
                      </Col>
                      <Col md={2}>
                        <img src={"http://openweathermap.org/img/wn/" + f_img[5] + "@2x.png"}></img>
                        <h4>{f_week[5]}</h4>
                        <h3>{f_temp[5]}</h3>
                        <h4>{f_day[5]}</h4>
                      </Col>
                    </Row>

                  </div>
                </>
              )
            }

            const doc_local_3d = document.getElementById('3d_view');
            const root_3d = createRoot(doc_local_3d);
            root_3d.render(<Weather_3d />);

            const doc_local_1 = document.getElementById('first_card');
            const root_1 = createRoot(doc_local_1);
            root_1.render(<Inicial_card />);

            const doc_local_2 = document.getElementById('secound_card');
            const root_2 = createRoot(doc_local_2);
            root_2.render(<Second_card />);

            const doc_local_3 = document.getElementById('third_card');
            const root_3 = createRoot(doc_local_3);
            root_3.render(<Forecast_card />);

            const doc_local_4 = document.getElementById('forecast_title');
            doc_local_4.innerHTML = "Forecast";
          });

      })
  }
}

function Weather_3d() {
  function Get_3d() {
    var wi = weather_icon

    // bg colors
    const sun_color = '#5fa0fa40';
    const sun_cloud_colors = '#8ca2c240';
    const moon_color = '#73737340';
    const moon_clouds_color = '#a6a6a640';
    const clouds_grey_color = '#55555540';
    const clouds_grey_white_color = '#8a8a8a40';
    const rain_color = '#3a496640';
    const rain_sun_color = '#6390ad40';
    const thunder_color = '#bf9c6740';
    const snow_color = '#e5e5e540';
    const mist_color = '#73737340';
    const clouds_color = '#a6a6a640';

    function change_color(bg, color){
      document.getElementById("card_body").style.background = bg;
      document.getElementById("card_body").style.color = color;
      document.getElementById("third_card").style.background = bg;
      document.getElementById("third_card").style.color = color;
    }


    if (wi.endsWith("n")) {
      wi = wi.replace("n", "");
      wi = parseInt(wi);

      if (wi == 1) {
        change_color(moon_color, "white");

        return (
          <Moon position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 2) {
        change_color(moon_clouds_color, "black");

        return (
          <Clouds_moon position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 3) {
        change_color(clouds_grey_color, "white");

        return (
          <Clouds_grey position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 4) {
        change_color(clouds_grey_white_color, "white");

        return (
          <Clouds_grey_white position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 9) {
        change_color(rain_sun_color, "white");

        return (
          <Rain position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 10) {
        change_color(rain_color, "white");

        return (
          <Moon_rain position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 11) {
        change_color(thunder_color, "white");

        return (
          <Thunder position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 13) {
        change_color(snow_color, "black");

        return (
          <Snow position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 50) {
        change_color(mist_color, "white");

        return (
          <Mist position={[0, 2, 0]} />
        );
      }

    } else {
      wi = wi.replace("d", "");
      wi = parseInt(wi);

      if (wi == 1) {
        change_color(sun_color, "white");

        return (
          <Sun position={[0, -2.5, 0]} />
        );
      }
      else if (wi == 2) {
        change_color(sun_cloud_colors, "white");

        return (
          <Clouds_sun position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 3) {
        change_color(clouds_grey_color, "white");

        return (
          <Clouds_grey position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 4) {
        change_color(clouds_grey_white_color, "white");

        return (
          <Clouds_grey_white position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 9) {
        change_color(rain_color, "white");

        return (
          <Rain position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 10) {
        change_color(rain_sun_color, "white");

        return (
          <Sun_rain position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 11) {
        document.getElementById("card_body").style.background = thunder_color;
        document.getElementById("card_body").style.color = "black";
        document.getElementById("third_card").style.background = thunder_color;
        document.getElementById("third_card").style.color = "black";

        return (
          <Thunder position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 13) {
        document.getElementById("card_body").style.background = snow_color;
        document.getElementById("card_body").style.color = "black";
        document.getElementById("third_card").style.background = snow_color;
        document.getElementById("third_card").style.color = "black";

        return (
          <Snow position={[0, -2.5, 0]} />
        );
      }

      else if (wi == 50) {
        document.getElementById("card_body").style.background = mist_color;
        document.getElementById("card_body").style.color = "white";
        document.getElementById("third_card").style.background = mist_color;
        document.getElementById("third_card").style.color = "white";

        return (
          <Mist position={[0, 2, 0]} />
        );
      }

    }

    document.getElementById("card_body").style.background = clouds_color;
    document.getElementById("card_body").style.color = "white";
    document.getElementById("third_card").style.background = clouds_color;
    document.getElementById("third_card").style.color = "white";

    return (
      <Clouds position={[0, -2.5, 0]} />
    );
  }

  function Rotation_3d() {
    const myMesh = React.useRef();
    const [active, setActive] = useState(false);

    const { scale } = useSpring({
      scale: active ? 1.5 : 1,
      config: config.wobbly
    });
    var inc = 0;
    var playable = true;
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      myMesh.current.rotation.y = a / 5;

      if (inc < -.1) { // max right rotation
        playable = true;
      }

      if (inc < .1 && playable) { // max left rotation
        myMesh.current.rotation.x = inc;
        inc += .001
      } else {
        myMesh.current.rotation.x = inc;
        inc -= .001
        playable = false;
      }
    });

    return (
      <animated.mesh
        scale={scale}
        onClick={() => setActive(!active)}
        ref={myMesh}>
        <Get_3d />
      </animated.mesh>
    );
  }
  return (
    <Canvas
      camera={{ position: [60, 0, 0], fov: 15 }}
      style={{
        width: window.innerWidth - 20,
        height: window.innerHeight * .4,
        position: "fixed",
        top: '70px',
        zIndex: '-1'
      }}>
      <OrbitControls />
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Rotation_3d />
      </Suspense>
    </Canvas>
  );



}

var city = "";
var country = "";
var weather_icon = "";

export default App;
get_inicial_city();