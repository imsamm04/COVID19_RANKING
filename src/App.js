import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleOnChange = (e) => {
    // set action when change selected country
    selectedCountryId(e.target.value);
  };

  useEffect(() => {
    const { Slug } = countries.find(
      (country) => country.ISO2.toLowerCase() === selectedCountryId
    );
    //call api
    getReportByCountry(Slug).then((res)=>
      console.log('getReportByCountry', {res})
    );
  }, [countries, selectedCountryId]);


  return (
    <>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} />
      <Highlight />
      <Summary />
    </>
  );
}

export default App;
