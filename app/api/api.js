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
         return response.data;
    } catch (error) {
        return ("Error registering user: " + error.message);
    }
}

export async function addNewProduct(formData) {
    try {
        const response = await backend.post('/admin/products/add-new', formData);
         return response.data;
    } catch (error) {
        return ("Error registering user: " + error.message);
    }
}

export async function updateProduct(formData) {
    try {
        const response = await backend.put('/admin/products/update-product', formData);
        return response.data;
    } catch (error) {
        
        return ("Error registering user: " + error.message);
    }
}
export async function deleteProduct(id) {
    try {
        const response = await backend.delete('/admin/products/delete-product?id='+id);
        
         return response.data;
    } catch (error) {
        return ("Error registering user: " + error.message);
    }
}

export async function loginUser(userData) {
    try {
        const response = await backend.post('/login', JSON.stringify(userData));
            
        localStorage.setItem("auth", response?.data?.data?.token);
         return response?.data;
    } catch (error) {
        return ("Error registering user: " + error.message);
    }
}

export async function getAllTypes(type) {
    try {
        const response = await backend.get('/products/get-all-types?category='+type);
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
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function getAllProductsAdmin(item, category, page, perPage) {
    try {
        let req = '/admin/products/get-all';
        if (item != null)
            req += `?page=${page}&per_page=${perPage}&item=${item}&category=${category}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getAProduct(id) {
    try {
        let req = `/products/get-a-product?id=${id}`;
        const response = await backend.get(req);
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
    
    try {
        let req = '/products/get-all-by-category';
        if (category[0] != null)
            req += `?page=${page}&per_page=${per_page}&category=${category[0]}`;

        if(category[1] != null)
            req += `&sub_category=${category[1]}`;
        
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
        
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getCartItem(email) {
    try {
        
        let req = `/cart/get?email=${email}`;
        const response = await backend.get(req);
        
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function removeACart(cartId) {
    try {
        
        let req = `/cart/delete?cart_id=${cartId}`;
        const response = await backend.delete(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function updateQuantity(cartId, quantity) {
    try {
        
        let req = `/cart/update?cart_id=${cartId}&quantity=${quantity}`;
        const response = await backend.put(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function logout(cartId, quantity) {
    try {
        
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
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function addFeedBack(data) {
    try {
        let req = `/message`;
        const response = await backend.post(req, data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getFeedBack() {
    try {
        let req = `/admin/messages`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function getUsers() {
    try {
        let req = `/admin/users`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getUser(id) {
    try {
        let req = `/me?email=`+id;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function updateUser(user) {
    try {
        let req = `/me`;
        
        const response = await backend.put(req,user);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function getOtp (email, message) {
    try {
        let req = `/email/sendOtp?email=`+email+"&otp="+message;
        const response = await backend.post(req);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function resetPassword (email, password) {
    try {
        let req = `/reset-password?email=${email}&password=${password}`;
        const response = await backend.put(req);
        return response.data;
    } catch (error) {
        return error;
    }
}


export async function makePayment(data) {
    try {
        let req = `/order/make-payment`;
        const response = await backend.post(req, data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function makeOrder(data) {
    try {
        let req = `/order/add-order`;
        const response = await backend.post(req, data);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function getOrder(email) {
    try {
        let req = `/order/get-order?email=`+email;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}
export async function updateDeliveryStatus(orderId,newStatus) {
    try {
        let req = `/order/update-delivery-status?orderId=${orderId}&newStatus=${newStatus}`;
        const response = await backend.put(req);
        return response.data;
    } catch (error) {
        return error;
    }
}

export async function searchProducts(item, category, page, per_page) {
    try {
        if(category == undefined ) category = "";
        let req = `products/get-all?page=${page}&per_page=${per_page}&item=${item}&category=${category}`;
        const response = await backend.get(req);
        return response.data;
    } catch (error) {
        return error;
    }
}
