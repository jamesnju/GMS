"use server"

import baseUrl from "@/utils/constant"
// interface Car{
//     name: string;
//     model: string;
//     year: number;
// }
export const postVehicle = async(cardetails: { make: string; model: string; year: number; licensePlate: string; userId?: number | undefined; }) =>{

    console.log(cardetails, "the vehicle--------------------111")

    const res = await fetch( baseUrl + "vehicle", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cardetails)
    })
    console.log(cardetails, "the vehicle")
    if(res.ok){
        const data = await res.json();
        return data;
    }
    }