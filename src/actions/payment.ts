"use server"

import baseUrl from "@/utils/constant"

// interface Datavalues {
//     id: number
//     name: string
//     description: string
//   }
export const getAllPayments = async () => {
    try {
        const res = await fetch(baseUrl + "payments",{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
    //console.log(res, "the payment----");
        if(!res.ok){
            console.log("Failed to fetch services");
        }
        const data = await res.json();
        //console.log(data, data.data, "the payment----");

        return data.payments;
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
    
}