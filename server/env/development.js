module.exports = {
  "DATABASE_URI": "mongodb://localhost:27017/fsg-app",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "4451599318-mv13plqdf7bj82fqfu4e6vr8m6p0olnt.apps.googleusercontent.com",
    "consumerSecret": "li1oLAVyI4EkCs5K2XId8M9z",
    "callbackUrl": "http://127.0.0.1:1337/auth/google/callback"
  },
  "FACEBOOK": {
    "clientID": "1520489354939780",
    "clientSecret": "72ef297f5647ddc5a6b328ed1856170b",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "4451599318-mv13plqdf7bj82fqfu4e6vr8m6p0olnt.apps.googleusercontent.com",
    "clientSecret": "li1oLAVyI4EkCs5K2XId8M9z",
    "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  },
  COOKIEMAXAGE: 1 * 24 * 3600 * 1000 //1 day express in ms

};