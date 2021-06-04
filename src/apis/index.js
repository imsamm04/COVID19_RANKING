import axios from "axios";
import moment from "moment";

export const getCountries = () =>
  axios.get("https://api.covid19api.com/countries");

export const getReportByCountry = (slug) =>
  axios.get(`https://api.covid19api.com/dayone/country/${slug}`);
