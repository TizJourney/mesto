import {
  token,
  baseUrl
} from '../util/constants.js';

export default class Api {
  constructor(urlTail) {
    this._baseUrl = baseUrl;
  }

  _parseAndCheckStatus(internalRequest) {
    return internalRequest.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
    })
  }

  _get(tailUrl) {
    return this._parseAndCheckStatus(
      fetch(this._baseUrl + tailUrl, {
        headers: {
          authorization: token
        }
      })
    )
  }

  _patch(tailUrl, data) {
    return this._parseAndCheckStatus(
      fetch(this._baseUrl + tailUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
        body: JSON.stringify(data)
      }))
  }

  getInitialCardsPromise() {
    return this._get('cards');
  }

  getUserInfoPromise() {
    return this._get('users/me');
  }

  updateUserInfoPromise(data) {
    return this._patch('users/me', data);
  }


}
