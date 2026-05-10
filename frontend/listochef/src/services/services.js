/**
 * Sends an authenticated GET request and returns the JSON response.
 *
 * @param {string} url - Endpoint URL.
 * @param {string} token - User authentication token.
 * @returns {Promise<Object|Array|undefined>} Parsed JSON response, or undefined if the request fails.
 */
export const getData = async (url, token) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("getData error:", error);
  }
};

/**
 * Sends a POST request without token and returns both status and JSON response.
 * Used mainly for onboarding requests such as login, where response data is needed.
 *
 * @param {string} url - Endpoint URL.
 * @param {Object} data - Data sent in the request body.
 * @returns {Promise<Array|undefined>} Array containing status and JSON response, or undefined if the request fails.
 */
export const postDataOnboarding = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonReceived = await response.json();
    return [response.status, jsonReceived];
  } catch (error) {
    console.log("postData error:", error);
  }
};

/**
 * Sends a POST request without token and returns only the response status.
 * Used for simple requests where the response body is not needed.
 *
 * @param {string} url - Endpoint URL.
 * @param {Object} data - Data sent in the request body.
 * @returns {Promise<Array|undefined>} Array containing status, or undefined if the request fails.
 */
export const postData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const received = await response.status;
    return [received];
  } catch (error) {
    console.log("postData error:", error);
  }
};

/**
 * Sends an authenticated POST request.
 * Supports both JSON data and FormData, so it can be used for normal requests
 * and requests that include uploaded images.
 *
 * @param {string} url - Endpoint URL.
 * @param {Object|FormData} data - Data sent in the request body.
 * @param {string} token - User authentication token.
 * @returns {Promise<Array|undefined>} Array containing status and response data, or undefined if the request fails.
 */
export const postDataToken = async (url, data, token) => {
  try {
    const isFormData = data instanceof FormData;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    const result =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    return [response.status, result];
  } catch (error) {
    console.log("postDataToken error:", error);
  }
};
