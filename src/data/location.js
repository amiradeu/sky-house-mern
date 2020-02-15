import { worldData } from "./worldData.js";

export const countryList = () => {
    const country = worldData.map(loc => loc.country);
    const uniqueCountry = [...new Set(country)].sort();

    return uniqueCountry.map(loc => {
        let locObj = { value: loc, label: loc };
        return locObj;
    });
};

export const stateList = (country) => {
    console.log(country);
}