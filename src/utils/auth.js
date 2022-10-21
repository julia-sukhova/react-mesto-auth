class AuthApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    register(email, password) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        }));
    }

    authorize(email, password) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        }));
    }

    checkToken(token) {
        const headers = Object.assign({}, this._headers);
        headers["Authorization"] = `Bearer ${token}`
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: headers
        }));
    }

    _wrapFetchResponse(res) {
        return res.then(res => {
            if (!res.ok) {
                return Promise.reject(`fetch(): ${res.body} (${res.status})`);
            }
            return res.json();
        });
    }

}

const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
});

export { authApi };
