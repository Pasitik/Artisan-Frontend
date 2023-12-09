import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

export const errorHandler = (error) => {
  console.error(JSON.stringify(error, null, 2));

  console.log('=====>', error.response.data)

  if (error.response.status == 400) {
    const myrror = new Error()
    myrror.message = JSON.stringify(error.response.data)
    error = myrror
  }
  // throw for redux error handler
  throw error;
};

export default class ArtisanClient {
  onError;
  httpClient;

  constructor(onError) {
    this.onError = onError;

    if (!BASE_API_URL) {
      throw new 'Base url is not provided'();
    }

    const accessToken = localStorage.getItem('authToken');
    this.httpClient = axios.create({
      baseURL: BASE_API_URL + '/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `JWT ${accessToken}` : null,
      },
    });

    this.httpClient.interceptors.request.use((config) => {
      console.log(`Request: ${config.method} ${config.url}`);
      return config;
    }, errorHandler);

    this.httpClient.interceptors.response.use((response) => {
      return response;
    }, errorHandler);
  }

  async get(url, query) {
    return await this.httpClient.get(url, {
      params: {
        query: query,
      },
    });
  }

  async post(url, body) {
    return await this.httpClient.post(url, body);
  }

  async put(url, body) {
    return await this.httpClient.put(url, body);
  }

  async delete(url) {
    return await this.httpClient.delete(url);
  }

  async login(username, password) {
    const response = await this.post('auth/jwt/create', {
      username,
      password,
    });
    return response.data;
  }

  async signup(body) {
    const response = await this.post('auth/users/', body);
    return response.data;
  }

  async addAddress(body) {
    const response = await this.post('business/address/profile/', {
      house_number: body.houseNo,
      street: body.street,
      city: body.city,
      state: body.state,
    });
    return response.data;
  }

  async getArtisanCategories() {
    const response = await this.get('business/category');
    return response.data;
  }

  async addArtisan(body) {
    const response = await this.post('business/artisan/profile/', body);
    return response.data;
  }

  async fetchArtisan(searchParam) {
    const response = await this.get(`business/artisan/search/?${searchParam}`);
    return response.data;
  }

  async fetchAllArtisans() {
    const response = await this.get('business/artisan/');
    return response.data;
  }

  async fetchArtisansPerPage(pageNumber) {
    const response = await this.get(`business/artisan/?page=${pageNumber}`);
    return response.data;
  }

  async fetchStates() {
    const response = await this.get(`business/address/states`);
    return response.data;
  }

  async fetchCities() {
    const response = await this.get(`business/address/cities`);
    return response.data;
  }

  async fetchStreets() {
    const response = await this.get(`business/address/streets`);
    return response.data;
  }
  async fetchArtist(id) {
    const response = await this.get(`business/artisan/${id}/info`);
    return response.data;
  }
}
