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
  async addCard(name, link) {
    debugger
    const response = await fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: ""+ name +  "",
        link: ""+ link +  "",
      })
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Error", response.status, response.statusText);
    }
  }

  async changeProfile(formValues) {

    const response = await fetch(`${this._url}/users/me`, {
    
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: ""+ formValues.name +  "",
        about: ""+ formValues.title +  "",
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
      // async addLike(cardId) {
      //   const response = await fetch(`${this._url}/cards/${cardId}`, {
      //     method: "PUT",
      //     headers: {
      //       authorization: this._token
      //     }
      //   }); 
      
      //   if (response.ok) {
      //     return response.json();
      //   } else {
      //     console.log("Error", response.status, response.statusText);
      //   }
      // }
      async deleteCard(cardId) {
        const response = await fetch(`${this._url}/cards/${cardId}`, {
          method: "DELETE",
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


