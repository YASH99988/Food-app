import { SECOND_TIME } from "./config";

const timeOut = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(`Request took take ${sec} seconds`);
    }, sec * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeOut(SECOND_TIME)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`Something went wrong ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
