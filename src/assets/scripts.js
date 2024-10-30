import moment from "moment";
import meta from "../vr_db/meta.json";

export var findGetParameter = (parameterName) => {
  var result = null,
    tmp = [];
  window.location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
};

export function renderMeta(pathname, locale, tag) {
  let localeReplace = locale ? locale.toUpperCase() : "RU";
  let meta_locale =
    meta[localeReplace].find((item) => item.pathname === pathname) || {};
  let tagFind = Object.keys(meta_locale).find((item) => item.match(tag)) || "";

  return meta_locale[tagFind] || "";
}

export function renderDate(date, locale) {
  const month = {
    ru: [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ],
    uz: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  let date_resp = date;
  if (date) {
    let data_split = moment(date).format("DD-MM-YYYY").split("-");
    if (data_split[1] && month[locale][+data_split[1] - 1])
      data_split[1] = month[locale][+data_split[1] - 1];
    date_resp = data_split.join(" ");
  }

  return date_resp;
}

export function reduceArray(data, active = true) {
  let arr = [];

  data.pages.forEach((item) => {
    arr = arr.concat(
      item?.data?.content
        ? item.data.content
        : item?.data && Array.isArray(item?.data)
        ? item.data
        : []
    );
  });

  if (active) return (arr || []).filter((item) => item.active);

  return arr;
}

export const setLanguagesValues = (values) => {
  const data = {};
  for (let key in values) {
    if (values[key]) {
      if (
        Object.keys(values[key]).filter((lang) => lang.match(/ru|en|uz/g))
          .length
      ) {
        Object.keys(values[key])
          .filter((lang) => lang.match(/ru|en|uz/g))
          .forEach((lang) => {
            data[`${key}.${lang}`] = values[key][lang];
          });
      } else {
        data[key] = values[key];
      }
    }
  }
  return data;
};

export const languagesSplit = (values) => {
  let data = {};
  for (let key in values) {
    if (key.match(/\.[a-z]{2}/g)) {
      let lang = key.match(/\.[a-z]{2}/g)
        ? key.match(/\.ru|\.en|\.uz/g)[0].replace(".", "")
        : null;
      let name = key.replace(/\.[a-z]{2}/g, "");
      if (!data[name]) data[name] = { ru: "", en: "", uz: "" };
      if (lang) {
        data[name][lang] = values[key];
      }
    } else {
      data[key] = values[key];
    }
  }
  return data;
};

export function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}
