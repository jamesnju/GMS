"use server";
import baseUrl from "@/utils/constant";

interface User {
  id: number; // Add the id field to the User interface
  name: string;
  email: string;
  password: string;
}

// // Function to fetch user data by ID
// export const getUserById = async (id: number) => {

//   try {
//     const response = await axios.get(baseUrl + `${id}/user`);
    
//     return response?.d ?? [];
    
    
//   } catch (e: any) {
//     return [e.message, 400];
//   }
// };
export async function getUserById(id: number): Promise<User | null> {
  try {
    const res = await fetch(`${baseUrl}${id}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // If the user is not found, return null instead of throwing an error
      if (res.status === 404) {
        return null;
      }
      console.log(`Error fetching user data: ${res.statusText}`);
    }

    const data: User = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Return null in case of any error fetching the data
    return null;
  }
}

export async function updateUser(id: number, data: User) {
  try {
    console.log(data, "the server update")
    const res = await fetch(`${baseUrl}${id}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to update user: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error updating user data:", error);
    return null;
  }
}


export async function deleteUser(id: number) {
  const res = await fetch(`${baseUrl}${id}/user`, {
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
    },
  })
  if(!res.ok){
    throw new Error("Something went wrong!")
  }
  const status = res.status;
  return status;

}