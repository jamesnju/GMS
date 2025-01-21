// "use client"

// import { useState } from "react"
// import { useFormState } from "react-dom"
// import { addProduct } from "../actions/addProduct"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// export function ProductForm() {
//   const [state, formAction] = useFormState(addProduct, null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = (formData: FormData) => {
//     setIsSubmitting(true)
//     formAction(formData)
//     setIsSubmitting(false)
//   }

//   return (
//     <form action={handleSubmit} className="space-y-6 max-w-md mx-auto">
//       <div className="space-y-2">
//         <Label htmlFor="name">Name</Label>
//         <Input id="name" name="name" required />
//         {/* {state?.error?.name && <p className="text-sm text-red-500">{state.error.name[0]}</p>} */}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="description">Description</Label>
//         <Textarea id="description" name="description" required />
//         {/* {state?.error?.description && <p className="text-sm text-red-500">{state.error.description[0]}</p>} */}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="price">Price</Label>
//         <Input id="price" name="price" type="number" step="0.01" required />
//         {/* {state?.error?.price && <p className="text-sm text-red-500">{state.error.price[0]}</p>} */}
//       </div>

//       <Button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Adding Product..." : "Add Product"}
//       </Button>

//       {/* {state?.error && typeof state.error === "string" && (
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{state.error}</AlertDescription>
//         </Alert>
//       )} */}
// {/* 
//       {state?.success && (
//         <Alert>
//           <AlertTitle>Success</AlertTitle>
//           <AlertDescription>Product added successfully!</AlertDescription>
//         </Alert>
//       )} */}
//     </form>
//   )
// }

