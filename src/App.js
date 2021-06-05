import { Container, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      setCountries(res.data);
      setSelectedCountryId("vn");
    });
  }, []);

  const handleOnChange = (e) => {
    // set action when change selected country
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );
      //call api
      getReportByCountry(Slug).then((res) => {
        const a = res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <Container style={{ marginTop: 20 }}>
      <>
        <Typography variant="h6" component="h6">
          COVID19-TRACKING <span>by viet.dinhduc</span>
        </Typography>
        <CountrySelector
          countries={countries}
          handleOnChange={handleOnChange}
          value={selectedCountryId}
        />
        <Highlight report={report} />
        <Summary countryId={selectedCountryId} report={report} />
      </>
    </Container>
  );
}

export default App;
