// Function to extract user id from URL
export const getUserIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1]; // Assuming user id is the last part of the URL
};
