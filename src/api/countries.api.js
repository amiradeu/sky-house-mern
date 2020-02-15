import axios from "axios";

const name = "https://restcountries.eu/rest/v2/name/";
const all = "https://restcountries.eu/rest/v2/all";

export const searchCountries = async input => {
  let search = name + input.target.value;
  if (input.target.value.length === 0) {
    search = all;
  }
  const data = await axios
    .get(search)
    .then(res => {
      return res.data.map(country => country);
    })
    .catch(err => console.log(`Error: ${err}`));
  return data;
};
