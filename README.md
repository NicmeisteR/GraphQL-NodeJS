# GraphQL-NodeJS
Run GraphQL queries with NodeJS and express. The openAPI used for the project: https://developer.haloapi.com

# Setup
1. Get a API key from [HaloAPI](https://developer.haloapi.com).
2. Replace the below [{{ your-api-key }}](api/keys.js) with your api key in the keys file:
    ```js 
    module.exports.config = {
        halo: {
            desc: 'ocp-apim-subscription-key',
            key: '{{ your-api-key }}'
        }
    }
    ```
3. Open up a terminal and use command:
    > npm i
4. Once the packages are installed run the following command to start the express server:
    > npm start
5. Then run the below and it will return a queried object in the terminal and write it to the response folder:
    > npm test 

6. Command to ignore changes to the "keys.js" file.
    > git update-index --assume-unchanged api/keys.js