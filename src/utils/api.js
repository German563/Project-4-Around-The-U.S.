export default class  Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._token = options.token;
    }
  
  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    }) 
    if (response.ok) {
        return response.json()
    } else {
        console.log("Error", response.status, response.statusText)
    }
  } 
  async getUserData() {
    const response = await fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._token
        }
      }) 
      if (response.ok) {
          return response.json()
      } else {
          console.log("Error", response.status, response.statusText)
      }
  }
  async addCard() {
    const response = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Error", response.status, response.statusText);
    }
  }

  async changeProfile() {
    const response = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist"
      })
    });
    if (response.ok) {
        return response.json()
    } else {
        console.log("Error", response.status, response.statusText)
    }
    }
    async getLikes() {
        const response = await fetch(`${this._url}/cards`, {
            headers: {
              authorization: this._token
            }
          }) 
          if (response.ok) {
              return response.json()
          } else {
              console.log("Error", response.status, response.statusText)
          }
      }
      async addLike(cardId) {
        const response = await fetch(`${this._url}/cards/_id`, {
          method: "PUT",
          headers: {
            authorization: this._token
          }
        }); 
      
        if (response.ok) {
          return response.json();
        } else {
          console.log("Error", response.status, response.statusText);
        }
      }
      
  }


