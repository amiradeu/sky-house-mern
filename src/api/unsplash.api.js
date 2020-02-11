import { toJson } from "unsplash-js";

const unsplash_api = process.env.REACT_APP_UNSPLASH_API;
const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash({
  accessKey: unsplash_api
});

export const getPeopleUnsplash = async () => {
  const data = await unsplash.search
    .photos("headshot people", 3, 100)
    .then(toJson)
    .then(json => {
      return json.results;
    });
  return data;
};

export const getHouseUnsplash = async () => {
  const data = await unsplash.search
    .photos("house", 3, 100)
    .then(toJson)
    .then(json => {
      return json.results;
    });
  return data;
};
