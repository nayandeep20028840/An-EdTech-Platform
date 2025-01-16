// Importing the Axios library to handle HTTP requests
import axios from "axios";

// Creating an instance of Axios with default configuration (optional, here it's empty)
export const axiosInstance = axios.create({});

// A function to handle API requests with configurable method, URL, body, headers, and parameters
export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    // Set the HTTP method (GET, POST, PUT, DELETE, etc.) for the request
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    // If parameters are provided, include them in the URL as query params; otherwise, send null
    params: params ? params : null,
  });
};
