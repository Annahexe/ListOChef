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
    const text = await response.text();
    console.log("Contenido response text: " + text)
    console.log("Status: " + response.status)
    return [response.status, text];
  } catch (error) {
    console.log("postData error:", error);
  }
};