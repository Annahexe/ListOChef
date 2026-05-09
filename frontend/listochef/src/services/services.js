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
