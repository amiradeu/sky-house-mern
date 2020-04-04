import { worldData } from "./worldData.js";

export const getCountrylist = () => {
  const country = worldData.map(loc => loc.country);
  const uniqueCountry = [...new Set(country)].sort();

  return uniqueCountry.map(loc => {
    let locObj = { value: loc, label: loc };
    return locObj;
  });
};

export const getStatelist = country => {
  const state = worldData
    .filter(loc => {
      return loc.country === country;
    })
    .map(st => {
      let locObj = { value: st.city, label: st.city };
      return locObj;
    });

  return state;
};

export const getCoordinate = city => {
  const data = worldData.filter(loc => {
    return loc.city === city;
  });
  let coordinate = [data[0].lat, data[0].lng];
  return coordinate;
};
