const http = require('http');
const url = require('url');

const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };
const PORT = 3000;

let products = [
    { id: 1, name: 'Product 1', price: 200.0 },
    { id: 2, name: 'Product 2', price: 300.0 },
];

const server = http.createServer((req, res) =>{
    const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET') {
    if (parsedUrl.path === '/product') {
      sendResponse(res, 200, CONTENT_TYPE_JSON, products);
    } else if (parsedUrl.path.startsWith("/product")) {
      const productId = parsedUrl.query.id || parseInt(parsedUrl.path.split('/').pop());
      const product = products.find(product => product.id === productId);

      if (product) {
        sendResponse(res, 200, CONTENT_TYPE_JSON, product);
      } else {
        sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Product not found' });
      }

    } else {
      sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
    }
  } else if (req.method === 'POST' && parsedUrl.path === '/product') {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', () => {
      const product = JSON.parse(requestBody);
      product.id = products.length + 1;
      products.push(product);

      sendResponse(res, 201, CONTENT_TYPE_JSON, product);
    });
  } else if (req.method === 'PUT' && parsedUrl.path.startsWith('/product/')) {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', () => {
      const updatedProduct = JSON.parse(requestBody);
      const productId = parseInt(parsedUrl.path.split('/').pop());
      const productIndex = products.findIndex(p => p.id === productId);

      if (productIndex !== -1) {
        products[productIndex] = {id: productId ,...updatedProduct, ...products[productIndex]};
        sendResponse(res, 200, CONTENT_TYPE_JSON, products[productIndex]);
      } else {
        sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Product not found' });
      }
    });
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
  }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

const sendResponse = (res, statusCode, contentType, data) => {
  res.writeHead(statusCode, contentType);
  res.end(JSON.stringify(data));
};