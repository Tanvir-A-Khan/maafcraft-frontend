export const getUrl = (url) => {
    return "./product_image/" + url;
};

// utils/disable-console.js

export const disableConsole = () => {
    // Override console methods
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
};
