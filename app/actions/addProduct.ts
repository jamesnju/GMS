// "use server"

// import { z } from "zod"

// const productSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
//   price: z.number().positive("Price must be a positive number"),
// })

// export async function addProduct(formData: FormData) {
//   const validatedFields = productSchema.safeParse({
//     name: formData.get("name"),
//     description: formData.get("description"),
//     price: Number(formData.get("price")),
//   })

//   if (!validatedFields.success) {
//     return { error: validatedFields.error.flatten().fieldErrors }
//   }

//   const { name, description, price } = validatedFields.data

//   try {
//     // Replace this URL with your actual API endpoint
//     const response = await fetch("https://api.example.com/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, description, price }),
//     })

//     if (!response.ok) {
//       throw new Error("Failed to add product")
//     }

//     return { success: true }
//   } catch (error) {
//     return { error: "Failed to add product. Please try again." }
//   }
// }

