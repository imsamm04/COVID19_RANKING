import { useEffect, useState } from "react";
import { getCountries,getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleOnChange = (e) => {
    const { Slug } = countries.find(
      (country) => country.ISO2.toLowerCase() === e.target.value
    );
    // call api
    getReportByCountry(Slug).then((res) =>
      console.log("getReportByCountry", { res })
    );
  };

  return (
    <>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} />
      <Highlight />
      <Summary />
    </>
  );
}

export default App;
