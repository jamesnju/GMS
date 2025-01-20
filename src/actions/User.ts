"use server"

import baseUrl from "@/utils/constant"

export  async function getUserById(id: number){
    const res = await fetch(baseUrl + `${id}/user`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",

        },
    })

    if(!res.ok){
        throw new Error('something went wrong');
    }

    const data = await res.json()
    return data;
}