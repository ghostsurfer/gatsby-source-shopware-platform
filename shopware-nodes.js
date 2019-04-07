const createNodeHelpers = require('gatsby-node-helpers').default;
const schema = require('./shopware-schema.js');

const {
    createNodeFactory
} = createNodeHelpers({
    typePrefix: 'Shopware'
});

const PRODUCT = 'Product';
const CATEGORY = 'Category'

const ProductNode = createNodeFactory(PRODUCT);
const CategoryNode = createNodeFactory(CATEGORY)

const fakeNodes = [
    ProductNode(schema.product),
    CategoryNode(schema.category)

];

module.exports = {
    ProductNode, CategoryNode
};
