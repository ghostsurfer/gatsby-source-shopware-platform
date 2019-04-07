const createNodeHelpers = require('gatsby-node-helpers').default;
const schema = require('./shopware-schema.js');

const {
    createNodeFactory
} = createNodeHelpers({
    typePrefix: 'Shopware'
});

const PRODUCT = 'Product';

const ProductNode = createNodeFactory(PRODUCT);

const fakeNodes = [
    ProductNode(schema.product),

];

module.exports = {
    ProductNode,
};
