// 1. Import the backend SDK (Notice the package name is 'imagekit')
import ImageKit from 'imagekit';
import config from '../config/config.js';

// 2. Initialize the backend instance
const client = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,      // Ensure this is in your config
    privateKey: config.IMAGEKIT_PRIVATE_KEY,    // Required
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT   // Ensure this is in your config
});

export const uploadFile = async ({ buffer, fileName }) => {
    try {
        // 3. Convert the Multer buffer directly to a base64 text string
        const fileBase64 = buffer.toString("base64");

        // 4. Send it off using the correct backend method
        const response = await client.upload({
            file: fileBase64,
            fileName: fileName,
            folder: "/products" // Optional: organizes your dashboard
        });

        // 5. Return the direct image URL string
        return response.url; 
    } catch (error) {
        console.error("ImageKit upload file helper error:", error);
        throw error;
    }
};
