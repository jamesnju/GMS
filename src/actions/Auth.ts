"use server";

import baseUrl from "@/utils/constant";

interface Data {
  email: string;
  password: string;
  name:string
}
export async function loginUser(data: Data) {
    try {
        const res = await fetch(baseUrl +  "login" , {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        
          // Check if the status is 200 (OK)
          if (res.status === 200) {
            const result = await res.json(); // Await the JSON response
            return result;
          }
          throw new Error(`Network issue: Received status code ${res.status}`);
        
    } catch (error) {
        console.error(error)
    }
  
}

export  async function registerUser(Data: Data){
 // console.log(Data, "sending data.....");
  try {
    const res = await fetch(baseUrl + "register",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data)
      
    })
    if(res.status === 201){
      const result = await res.json();
      console.log(result, result.data, result.status, "the datares");
      return result.data;
    }
    throw new Error("net")

    // if(res.status === 201){
    //   const result = await res.json();
    //   console.log(result, "the datares");
      
    //   return result.data;
    // }
    // throw new Error("newtwork issues")
    
  } catch (error) {
    console.log(error, "error");
    
  }
 
}


export async function getAllUser(){
  const res = await fetch(baseUrl + "users",{
    method:"GET",
    headers:{
      "Content-Type": "application/json",
    },
  })

  if(!res.ok){
    throw new Error('Something went Wrong');
  }

  const data = await res.json()
  return data.data;
}
