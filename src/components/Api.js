import {
  token,
  baseUrl
} from '../util/constants.js';

export default class Api {
  constructor(urlTail) {
    this._baseUrl = baseUrl;
  }

  _request(tailUrl, method='GET', data=null) {
    const requestParams = {
      method: method,
      headers: {
        authorization: token
      },
    }

    if (data != null) {
      requestParams['body'] = JSON.stringify(data);
      requestParams.headers['Content-Type'] = 'application/json';
    }

    return fetch(this._baseUrl + tailUrl, requestParams)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
      })
  }

  getInitialCardsPromise() {
    return this._request('cards');
  }

  addCardPromise(data) {
    return this._request('cards', 'POST', data);
  }

  getUserInfoPromise() {
    return this._request('users/me');
  }

  updateUserInfoPromise(data) {
    return this._request('users/me', 'PATCH', data);
  }
}
