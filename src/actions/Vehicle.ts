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
    export const getVehicles = async()=>{
        try {
            const res = await fetch(baseUrl + "vehicles",{
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            if(res.ok){
                const data = await res.json();
                return data?.data;
            }
            throw new Error ("Network issue");
            
        } catch (error) {
            console.error(error," something went wrong")
        }
      

    }

    export const updateVehicle = async(id: number, cardetails: { make: string; model: string; year: number; licensePlate: string; userId?: number | undefined; })=>{
        try {
            const res = await fetch(baseUrl + `${id}/vehicle`,{
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cardetails)
            })
            if(res.ok){
                const data = await res.json();
                return data;
            }
            throw new Error ("Network issue");
            
        } catch (error) {
            console.error(error," something went wrong")
        }
    }
    export const deleteVehicle = async(id: number)=>{
        try {
            const res = await fetch(baseUrl + `vehicle/${id}`,{
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            if(res.ok){
                const data = await res.json();
                return data;
            }
            throw new Error ("Network issue");
            
        } catch (error) {
            console.error(error," something went wrong")
        }
    }
