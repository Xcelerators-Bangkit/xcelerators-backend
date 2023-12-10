import axios from "axios";

// Function to check if the image URL is valid
const checkImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await axios.head(url);
    return response.status === 200 && response.headers['content-type'].startsWith('image');
  } catch (error) {
    return false;
  }
};

export default checkImageUrl;