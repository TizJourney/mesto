import {
  token,
  baseUrl
} from '../util/constants.js';

export default class Request {
  constructor(urlTail) {
    this._url = baseUrl + urlTail;
  }

  _parseAndCheckStatus(internalRequest) {
    return internalRequest.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
    })
  }

  get() {
    return this._parseAndCheckStatus(
      fetch(this._url, {
        headers: {
          authorization: token
        }
      })
    )
  }

  patch(data) {
    return this._parseAndCheckStatus(
      fetch(this._url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
        body: JSON.stringify(data)
      }))
  }
}
