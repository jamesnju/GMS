"use server"

import { Service } from "@/Globalcomponents/admin/manageSerives/AddService";
import { ServiceCategory } from "@/Globalcomponents/admin/manageSerives/AddServiceCategory";
import { Booking } from "@/Globalcomponents/admin/manageSerives/EditService";
import baseUrl from "@/utils/constant"

// interface Datavalues {
//     id: number
//     name: string
//     description: string
//   }
export const getAllServices = async () => {

    try {
        const res = await fetch(baseUrl + "services",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
    
        if(!res.ok){
            console.log("Failed to fetch services");
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
    
}
export const getAllServicesCategory = async () => {

    try {
        const res = await fetch(baseUrl + "serviceCategory",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
    
        if(!res.ok){
            console.log("Failed to fetch services");
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
    
}
//book services


export const getBookedServices = async () => {
  try{

    const res = await fetch(baseUrl + "bookings",{
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        }
    })
    if(!res.ok){
        throw new Error("Failed to fetch services");
    }
    const data = await res.json();
    return data.data;
} catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }}

export const postBookService = async(Datavalues: { userId: number | undefined; serviceId: number; description: string; categoryId: number; bookedDate: Date })=>{
    const res = await fetch( baseUrl + "booking",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Datavalues)
    })
    if(!res.ok){
        throw new Error("something went wrong"); 
    }
    const data = await res.json();
    return data;
}

export const getBookingById = async (id: number): Promise< null>=>{
    const res = await fetch(baseUrl + `${id}/booking`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        },

    })
    //console.log(res, "data id")
    if(!res.ok){
        throw new Error("something went wrong");
    }
    const data = await res.json();
    //console.log(data, "data received from API"); // Log the entire data object

    return data?.data;
}

export const updateDate = async (
    values: { serviceId: number; description: string; status: string; categoryId: number; bookedDate: Date; userId?: number },
    id: number
  ) => {
    const formattedValues = {
      ...values,
      bookedDate: values.bookedDate.toISOString(), // Ensure the date is in the correct format
    };
  
    const res = await fetch(`${baseUrl}${id}/booking`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedValues),
    });
  
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  
    const data = await res.json();
    return data;
  };


  //delte

  export const deleteBookedService = async(id: number) =>{
    try {
        const res = await fetch(`${baseUrl}${id}/appointment`);
          
        // Handle successful deletion (e.g., refetch data, show success message)
        console.log(res);
        // alert(res);
        
      } catch (error) {
        console.error("Failed to delete service", error);
        alert("error")
        // Handle error (e.g., show error message)
      } 
  }


  //
  export async function postService(data: Service) {
  
    const res = await fetch(baseUrl + "service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Corrected header key
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  
    return await res.json();
  }
  export async function postServiceCategory(data: ServiceCategory) {
  
    const res = await fetch(baseUrl + "serviceCategory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
  
    return await res.json();
  }
  
export async function getServiceById(id: number){
  try {
    const res = await fetch(baseUrl + `${id}/service`,{
      method:"GET",
      headers:{
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    return data?.data;
  } catch (error) {
    console.error("Something error", error);
  }
}




  export async function updateService(serviceData: Booking, id: number){
    try {
      //console.log(serviceData, "serviceData");
      
      const res = await fetch(baseUrl + `${id}/service`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(serviceData)
      })
      if(res.ok){
        const data = await res.json();
        return data;      }
      throw new Error("Failed to update service");
      
    } catch (error) {
      console.log(error, "sothing went wrong")
    }
  }

  
  export async function updateServiceCategory(data:ServiceCategory,id: number){
    try {
      const response = await fetch(`${baseUrl}${id}/serviceCategory`, { 
        method: 'PATCH',
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
       })
       
    console.log("Raw Response:", response);

    if (!response) {
      throw new Error("No response received from the server.");
    }

    if (!response.ok) {
      console.error("Failed response:", response.status, response.statusText);
      throw new Error("Failed to update service category");
    }

    const result = await response.json();
    console.log("Update successful:", result);
    return result;
    } catch (error) {
      console.error("Failed to update service category",error);
    }
    
  }
  export async function getCategoryServiceById(id: number){
    try {
      const res = await fetch(baseUrl + `${id}/serviceCategory`,{ 
        method:"GET",
        headers:{
          "Content-Type": "application/json"
        }
        
      })
      if(!res.ok){
        throw new Error("Failed to fetch services");
      }
      const data = await res.json();
      return data?.data;
    } catch (error) {
      console.log(error, "sothing went wrong")

    }
  }