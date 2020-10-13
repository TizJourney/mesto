export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _request(tailUrl, method='GET', data=null) {
    const requestParams = {
      method: method,
      headers: {
        authorization: this._token
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
        return Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`));
      })
  }

  getCards() {
    return this._request('cards');
  }

  addCard(data) {
    return this._request('cards', 'POST', data);
  }

  getUserInfo() {
    return this._request('users/me');
  }

  updateUserInfo(data) {
    return this._request('users/me', 'PATCH', data);
  }

  removeCard(id) {
    return this._request(`cards/${id}`, 'DELETE');
  }

  setLike(id) {
    return this._request(`cards/likes/${id}`, 'PUT');
  }

  removeLike(id) {
    return this._request(`cards/likes/${id}`, 'DELETE');
  }

  updateAvatar(data) {
    return this._request('users/me/avatar', 'PATCH', data);
  }
}
