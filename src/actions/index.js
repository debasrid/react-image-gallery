const APIURL = 'https://api.unsplash.com/photos/';
const APISEARCHURL = 'https://api.unsplash.com/search/photos';
const axios = require('axios');
const querystring = require('querystring');
const clientID = '0d54d7bf8f81c9ee80a75d9e1263fbb6b8267fad9d908e597b9f7c4f6bcdee23';
export const getPhotos = (page = 1) => axios.get(`${APIURL}/?client_id=${clientID}&page=${page}`);
export const searchPhotos = (data) => {
    return axios.get(`${APISEARCHURL}/?client_id=${clientID}&query=${data.q}&page=${data.page}`);
}