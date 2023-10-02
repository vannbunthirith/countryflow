import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(json => setCountries(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [countryName, setMsgModal] = useState("red");

  let countryTitle = <div>Country:</div>;
  let countryBody = <div>n/a</div>;

  function showcountry(CountryIndex) {
    setMsgModal(CountryIndex);
    handleShow();
  }

  function loadCountryDetail(CountryIndex) {
    let Msg = "Country Name: " + countries[CountryIndex].name.common +
      " (" + CountryIndex + ") " + ", SC: " + countries[CountryIndex].cca2 +
      " (" + CountryIndex + ") " + ", ShortCut: " + countries[CountryIndex].cca3 +
      ", Region: " + countries[CountryIndex].region;

    alert(Msg);

  }
  function imgPath(imgName) {
    let Path = "https://flagcdn.com/w320/" + imgName + ".png";
    return Path;
  }


  return (

    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Countries Catalog: </h1>
          <di>{Object.keys(countries[198].name.nativeName)}</di>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Flag</th>
                <th>
                  <div className="row">
                    <div>Country </div>
                    <div>Name</div>
                  </div>
                </th>
                <th>
                  <div className="row">
                    <div>2 character </div>
                    <div>Country Code</div>
                  </div>
                </th>
                <th><div className="row">
                  <div>3 character </div>
                  <div>Country Code</div>
                </div>
                </th>

                <th>
                  <div className="row">
                    <div>Native </div>
                    <div>Country Name</div>
                  </div>
                </th>
                <th>
                  <div className="row">
                    <div>Alternative</div>
                    <div>Country Name</div>
                  </div>
                </th>
                <th>Country Calling Codes</th>
              </tr>
            </thead>
            <tbody>
              {countries?.map((country, index) => (
                <tr>
                  <td><img src={imgPath(country.cca2.toLowerCase())} width={60}></img></td>
                  <td><button type="button" class="btn btn-primary" onClick={() => loadCountryDetail(index)}>{country.name.official}</button></td>
                  <td>{country.cca2}</td>
                  <td>{country.cca3}</td>
                  <td>
                    <div>
                      {countries[index].name.common}
                    </div>
                  </td>
                  <td>
                    <div class="row">
                      {Object.keys(country.altSpellings).map(key => (
                        <div value={key}>{country.altSpellings[key]}</div>
                      ))}
                    </div>
                  </td>
                  <td>{country.idd.root}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </>
      )}

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{countryTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>boODY</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
