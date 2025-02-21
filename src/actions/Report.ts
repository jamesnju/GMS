"use server";

import baseUrl from "@/utils/constant";

export async function getReport() {
    try {
        const res = await fetch(baseUrl + "report", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(res, "res---report------------------------");
        if (res.ok) {
            const data = await res.json();
            console.log(data, "data---report------------------------");
            return data;
        } else {
            throw new Error("Network issues");
        }
    } catch (error) {
        console.error(error, "Something went wrong");
    }
}