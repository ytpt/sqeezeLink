# Squeeze Links
The project creates short links and maintains statistics on the views of these links. This is a web interface that works through the API.

### Install
Copy project and install the react and other libraries:
```
git clone https://github.com/ytpt/squeezeLink.git squeeze
cd squeeze
npm install
```

### Config
The config file contains:
```js
const config = {
    'api_base_url': 'http://api-url/',
    'cookie_name': 'token',
    'pagination_limit': 15,
};
```
The config file located *src/Components/config.js*
### Run:
```
npm start
```
