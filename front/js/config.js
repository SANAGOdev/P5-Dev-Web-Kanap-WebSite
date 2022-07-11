const config = {
    baseUrl: "http://localhost:3000/api/products", //API url for retreive the entire catalog
    productUrl: "http://localhost:3000/api/products/:id:", //API url for retreive one item of the catalog
    orderUrl: "http://localhost:3000/api/products/order" //API url for make the order 
};

//All the regex needed
const baseRegex = XRegExp.build(/^[\p{L} ',.-]{1,25}$/);
const adressRegex = XRegExp.build(/^[\p{L}0-9 ',.-]{1,50}$/);
const emailRegex = XRegExp.build(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);