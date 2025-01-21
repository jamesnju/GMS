"use server"

import baseUrl from "@/utils/constant"


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
