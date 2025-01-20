// import the base URL from constants
import baseUrl from "@/utils/constant"

// Define the type for the user data
interface User {
    id: number;
    name: string;
    email: string;
    // Add other relevant fields here
}

// Function to fetch user data by ID
export const getUserById = async (id: number): Promise<User | null> => {
    try {
        // Fetch user data from the server
        const res = await fetch(`${baseUrl}${id}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if the response is not OK
        if (!res.ok) {
            // You can handle specific status codes here if needed
            if (res.status === 404) {
                throw new Error('User not found');
            } else {
                throw new Error('Something went wrong');
            }
        }

        // Parse the JSON response
        const data: User = await res.json();
        return data;

    } catch (error) {
        // Log the error and return null
        console.error('Error fetching user data:', error);
        return null;
    }
}