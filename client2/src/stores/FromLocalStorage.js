import {jwtDecode as jwt_decode} from "jwt-decode";

export const loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cartBooks');
    return cartData ? JSON.parse(cartData) : {};
}

export const saveCartToLocalStorage = (cartBooks) => {
    localStorage.setItem('cartBooks', JSON.stringify(cartBooks));
}
export const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
};
export const loadUserFromLocalStorage = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');

    if (token && isTokenExpired(token)) {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        return null;
    }

    try {
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return null;
    }
};

export const saveUserToLocalStorage = (loggedInUser, token) => {
    if (loggedInUser !== null && loggedInUser !== undefined) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        if (token) {
            localStorage.setItem('token', token);
        }
    } else {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
    }
};
