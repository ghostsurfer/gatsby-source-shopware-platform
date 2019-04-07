const fetch = require('node-fetch')
const {ProductNode, CategoryNode} = require ('./shopware-nodes.js')

const api = {
  url:'https://zmb-8857.pg.shopware.com/',
  limit:100,
  key:'SWSCAWNHZLZXEVJ1AXF5Y2DKDQ'
}

exports.sourceNodes = ({ actions }) => {
const { createNode } = actions;

const allProducts   = fetchApi('product', api.url, api.key, api.limit, 1)
                      .then(products => Promise.all(products.map(data => createNode(ProductNode(data)))))

const allCategories = fetchApi('category', api.url, api.key, api.limit, 1)
                      .then(categories => Promise.all(categories.map(data => createNode(CategoryNode(data)))))


function fetchApi(endpoint, url, key, limit, page){
      const apiUrl = url + 'storefront-api/v1/' + endpoint + '/?limit=' + limit + '&page=' + page

      console.log(': Try to fetch ' + endpoint + 'page ' + page)

    return fetch( apiUrl,{
      method: 'GET',
      headers:{ 'x-sw-access-key': key}
    }).then(data => data.json())
      .then(data => {
            if(page*limit < data.total){
                page++
                return fetchApi(endpoint, url, key, limit, page).then(nextPage => {
                    return data.data.concat(nextPage);
                });
            }


            return data.data;
        });
}

return Promise.all([allProducts, allCategories])
}
