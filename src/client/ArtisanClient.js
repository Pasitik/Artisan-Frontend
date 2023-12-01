import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

export const errorHandler = (error) => {
  console.error(JSON.stringify(error, null, 2));
  throw error;
};

export default class ArtisanClient {
  onError;
  httpClient;

  constructor(onError) {
    this.onError = onError;

    if (!BASE_API_URL) {
      throw new "Base url is not provided"();
    }

    const accessToken = localStorage.getItem("authToken");
    this.httpClient = axios.create({
      baseURL: BASE_API_URL + "/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    });

    this.httpClient.interceptors.request.use((config) => {
      console.log(`  Request: ${config.method} ${config.url}`);
      return config;
    }, errorHandler);

    this.httpClient.interceptors.response.use((response) => {
      if (response.statusText != "Ok" && response.status >= 300) {
        if (response.status >= 500) {
          throw new Error("Server failure");
        }
      }
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

  async put(url, body, options) {
    return await this.httpClient.put(url, body);
  }

  async delete(url, options) {
    return await this.httpClient.delete(url);
  }

  async login(username, password) {
    const response = await this.post("auth/jwt/create", {
      username,
      password,
    });
    return response.data;
  }

  async addAddress(body) {
    const response = await this.post("business/address/profile/", {
      house_number: body.houseNo,
      street: body.street,
      city: body.city,
      state: body.state,
    });
    return response.data;
  }
}
