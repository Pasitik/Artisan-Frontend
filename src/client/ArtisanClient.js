import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

export const errorHandler = (error) => {
  const originalRequest = error.config;

  console.log('=====>', error.response.data);

  if (error.response.status == 400) {
    const myrror = new Error();
    myrror.message = JSON.stringify(error.response.data);
    error = myrror;

    return Promise.reject(error);
  }

  if (error.response.status === 401 && error.config.url === 'auth/jwt/create') {
    const myrror = new Error();
    if (error.response.data.detail) {
      myrror.message = error.response.data.detail;
      error = myrror;
    }
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refresh');
    (async () => {
      try {
        const response = await this.httpClient.post('/auth/jwt/refresh', {
          refresh: refreshToken,
        });

        if (response.status === 200) {
          const newAccessToken = response.data.access;
          localStorage.setItem('authToken', newAccessToken);

          // Update the original request with the new access token
          originalRequest.headers.Authorization = `JWT ${newAccessToken}`;

          // Retry the original request
          return this.httpClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error refreshing access token:', refreshError);
        // Redirect to login page
        history.push('/login');
      }
    })();
  }
  // throw error;
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
      baseURL: BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `JWT ${accessToken}` : null,
      },
    });

    this.httpClient.interceptors.request.use((config) => {
      console.log(`Request: ${config.method} ${config.url}`);

      const accessToken = localStorage.getItem('authToken');
      if (accessToken) {
        config.headers.Authorization = `JWT ${accessToken}`;
      }
      return config;
    }, errorHandler);

    this.httpClient.interceptors.response.use(
      (response) => response,
      errorHandler,
    );
  }

  async get(url) {
    return await this.httpClient.get(url);
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

  async patch(url, body) {
    return await this.httpClient.patch(url, body);
  }

  isAuthenticated() {
    return localStorage.getItem('authToken') !== null;
  }

  async loginUser(username, password) {
    const response = await this.post('auth/jwt/create', {
      username,
      password,
    });
    if (response.data.access) {
      localStorage.setItem('authToken', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
    }
    return response.data;
  }

  async logout() {
    return null;
  }

  async getUser() {
    const response = await this.get('auth/users/me/');
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
    const response = await this.get('business/category/');
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
    const response = await this.get(`business/address/states/`);
    return response.data;
  }

  async fetchCities() {
    const response = await this.get(`business/address/cities/`);
    return response.data;
  }

  async fetchStreets() {
    const response = await this.get(`business/address/streets/`);
    return response.data;
  }
  async fetchArtist(id) {
    const response = await this.get(`business/artisan/${id}/info/`);
    return response.data;
  }

  async verifyArtist(id) {
    const response = await this.get(`business/artisan/${id}/verify/`);
    return response.data;
  }

  async updateCustomer(body) {
    const response = await this.put('business/profile/me/', body);
    return response.data;
  }

  async fetchCustomer() {
    const response = await this.get('business/profile/me/');
    return response.data;
  }

  async fetchCustomerAddress() {
    const response = await this.get(`business/address/profile/`);
    return response.data;
  }
  async updateCustomerAddress(body) {
    const response = await this.put(`business/address/profile/`, body);
    return response.data;
  }
  async updateCustomerPortfolio(body) {
    const response = await this.put(`business/artisan/profile/`, body);
    return response.data;
  }

  async fetchCustomerPortfolio() {
    const response = await this.get(`business/artisan/profile/`);
    return response.data;
  }

  async fetchCustomerProfilephoto() {
    const response = await this.get('business/profile/photo/');
    return response.data;
  }

  async fetchArtisanRating() {
    const response = await this.get('business/rating/user/');
    return response.data;
  }

  async updateArtisanRating(body) {
    const response = await this.post('business/rating/add_rating/', body);
    return response.data;
  }
  async updateArtisanReview(body) {
    const response = await this.post('business/review/add_review/', body);
    return response.data;
  }

  async updateCustomerProfilephoto(body) {
    const response = await this.httpClient.post(
      'business/customer/photo/',
      body,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return response.data;
  }

  async updateCustomerMembership(body) {
    const response = await this.patch('business/profile/me/', body);
    return response.data;
  }
}
