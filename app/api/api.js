import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

let authToken = "";
if (typeof window !== "undefined") {
  authToken = localStorage.getItem("auth") || "";
}

const backend = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": authToken ? `Bearer ${authToken}` : ""
  }
});

backend.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        return new Error(error);
    }
);

backend.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return new Error(error);
    }
);

export async function registerUser(userData) {
    try {
        const response = await backend.post('/register', JSON.stringify(userData));
        // console.log(( response.data));       
         return response.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}

export async function addNewProduct(formData) {
    try {
        const response = await backend.post('/products/add-new', formData);
        console.log(( response.data));      
        console.log(response.message); 
         return response.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}

export async function updateProduct(formData) {
    try {
        const response = await backend.put('/products/update-product', formData);
        console.log(( response.data));      
        console.log(response.message); 
        return response.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}
export async function deleteProduct(id) {
    try {
        const response = await backend.delete('/products/delete-product?id='+id);
        console.log(( response.data));      
        console.log(response.message); 
         return response.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}

export async function loginUser(userData) {
    try {
        const response = await backend.post('/login', JSON.stringify(userData));
        console.log( response.data);   
            
        localStorage.setItem("auth", response?.data?.data?.token);
        // console.log(localStorage.getItem("auth"));
         return response?.data;
    } catch (error) {
        console.log("Error registering user:", error);
        return ("Error registering user: " + error.message);
    }
}

export async function getAllTypes(type) {
    try {
        const response = await backend.get('/products/get-all-types?category='+type);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return ("Error fetching categories: " + error.message);
    }
}

export async function getAllProducts(item, category, page, perPage) {
    try {
        let req = '/products/get-all';
        if (item != null)
            req += `?page=${page}&per_page=${perPage}&item=${item}&category=${category}`;
        const response = await backend.get(req);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getAllProductsOfDashboardCategory(dashboard) {
    try {
        let req = '/products/get-all-by-dashboard-view';
        if (dashboard != null) req += `?dashboard=${dashboard}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getAllProductsOfCategory(category, page, per_page) {
    console.log(category);
    try {
        let req = '/products/get-all-by-category';
        if (category[0] != null)
            req += `?page=${page}&per_page=${per_page}&category=${category[0]}`;

        if(category[1] != null)
            req += `&sub_category=${category[1]}`;
        console.log(req);
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getNameAutoComplete(item) {
    try {
        let req = '/products/auto-name-complete?item=';
        if (item != null) req += item;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function addToCart(data) {
    try {
        let req = '/cart/add';
        // if (item != null) req += item;
        const response = await backend.post(req, data);
        console.log(response);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getCartItem(email) {
    try {
        console.log("api", email);
        let req = `/cart/get?email=${email}`;
        const response = await backend.get(req);
        console.log(response);
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function removeACart(cartId) {
    try {
        console.log(cartId);
        let req = `/cart/delete?cart_id=${cartId}`;
        const response = await backend.delete(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateQuantity(cartId, quantity) {
    try {
        console.log(cartId, quantity);
        let req = `/cart/update?cart_id=${cartId}&quantity=${quantity}`;
        const response = await backend.put(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function logout(cartId, quantity) {
    try {
        console.log(cartId, quantity);
        let req = `/cart/update?cart_id=${cartId}&quantity=${quantity}`;
        const response = await backend.put(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getGalleryImages() {
    try {
        let req = `/products/gallery`;
        console.log(req);
        const response = await backend.get(req);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function addFeedBack(data) {
    try {
        let req = `/message`;
        console.log(req);
        const response = await backend.post(req, data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getFeedBack() {
    try {
        let req = `/admin/messages`;
        // console.log(req);
        const response = await backend.get(req);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function getUsers() {
    try {
        let req = `/admin/users`;
        // console.log(req);
        const response = await backend.get(req);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getUser(id) {
    try {
        let req = `/me?email=`+id;
        // console.log(req);
        const response = await backend.get(req);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function updateUser(user) {
    try {
        let req = `/me`;
        // console.log(req);
        const response = await backend.put(req,user);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getOtp (email, message) {
    try {
        let req = `/email/sendOtp?email=`+email+"&otp="+message;
        console.log(req);
        const response = await backend.post(req);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function resetPassword (email, password) {
    try {
        let req = `/reset-password?email=${email}&password=${password}`;
        console.log(req);
        const response = await backend.put(req);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function makePayment(data) {
    try {
        let req = `/order/make-payment`;
        // console.log(req);
        // console.log(data, "this is while calling ");
        const response = await backend.post(req, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function makeOrder(data) {
    try {
        let req = `/order/add-order`;
        console.log(req);
        console.log(data, "this is while calling ");
        const response = await backend.post(req, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function getOrder(email) {
    try {
        let req = `/order/get-order?email=`+email;
        console.log(req);
        console.log("this is while calling ");
        const response = await backend.get(req);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function updateDeliveryStatus(orderId,newStatus) {
    try {
        let req = `/order/update-delivery-status?orderId=${orderId}&newStatus=${newStatus}`;
        console.log(req);
        console.log("this is while calling ");
        const response = await backend.put(req);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function searchProducts(item, category, page, per_page) {
    try {
        console.log(item, category);
        
        let req = `products/get-all?page=${page}&per_page=${per_page}&item=${item}&category=${category}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}
