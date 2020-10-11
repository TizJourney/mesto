import {
  token,
  baseUrl
} from '../util/constants.js';

export default class Request {
  constructor(urlTail) {
    this._url = baseUrl + urlTail;
  }

  get() {
    return fetch(this._url, {
      headers: {
        authorization: token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
      })
      .catch((err) => {
        //обработать ошибку загрузки данных
        console.log(err);
      })
  }

}
