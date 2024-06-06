import React from "react"

const getCookie = (cookieKey) => {
  let cookieName = `${cookieKey}=`;

  let cookieArray = document.cookie.split(';');

  for (let cookie of cookieArray) {

    while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1, cookie.length);
      }

    if (cookie.indexOf(cookieName) == 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
}

export default getCookie;
