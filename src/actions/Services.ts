"use server"

import baseUrl from "@/utils/constant"

interface Datavalues {
    id: number
    name: string
    description: string
  }
export const getAllServices = async () => {

    try {
        const res = await fetch(baseUrl + "services",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
    
        if(!res.ok){
            throw new Error("Failed to fetch services");
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
            throw new Error("Failed to fetch services");
        }
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
    
}
//book services

export const postBookService = async(Datavalues: { userId: number | undefined; serviceId: number; description: string; categoryId: number; bookedDate: Date })=>{
    console.log(Datavalues, "server======================")
    const res = await fetch( baseUrl + "booking",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Datavalues)
    })
    console.log(res ,"res================================")
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
    console.log(res, "data id")
    if(!res.ok){
        throw new Error("something went wrong");
    }
    const data = await res.json();
    console.log(data, "data received from API"); // Log the entire data object

    return data?.data;
}