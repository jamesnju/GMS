"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import axios from "axios"
import baseUrl from "@/utils/constant"
import { toast } from "react-toastify"

import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentModal from "./PaymentModal"

// Load Stripe outside of the component to avoid recreating the Stripe object on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Booking {
  id: number
  userId: number
  serviceId: number
  bookedDate: string
  status: string
  user: {
    id: number
    name: string
    email: string
  }
  service: {
    id: number
    name: string
    price: number
  }
}

const generateReceipt = (booking: Booking) => {
  const doc = new jsPDF()
  doc.setFontSize(18);
  doc.text("Receipt", 105, 20, { align: "center" });
  doc.setFontSize(12);
  
  // Draw the top section with the user name and date on the right
  doc.text(`Date: ${new Date().toLocaleString()}`, 160, 30);
  doc.text(`Name: ${booking.user.name}`, 160, 40);
  
  // Set a box around the header with a gap
  doc.setLineWidth(0.5);
  doc.rect(140, 20, 60, 30);
  
  // Create the table header with a color background
  const tableX = 20;
  const tableY = 60; // Added gap between the header and the table
  const tableWidth = 180;
  const rowHeight = 12;
  //const colWidths = [60, 120]; // Price column and Service Name column
  
  // Set a background color for the table header
  doc.setFillColor(220, 220, 220);
  doc.rect(tableX, tableY, tableWidth, rowHeight, "F");
  
  // Set text color for header and make it stand out
  doc.setTextColor(0, 51, 102); // Dark blue
  doc.text("Price", tableX + 5, tableY + 8);
  doc.text("Service Name", tableX + 70, tableY + 8);
  
  // Table Body
  const data = [
    [
      `${new Intl.NumberFormat("en-US", { style: "currency", currency: "KSH" }).format(booking.service.price)}`,
      booking.service.name,
    ],
  ];
  
  // Draw table rows with lines
  doc.setFillColor(255, 255, 255); // White color for rows
  doc.setTextColor(51, 51, 51); // Dark grey text for rows
  data.forEach((row, i) => {
    // Draw row lines
    doc.rect(tableX, tableY + (i + 1) * rowHeight, tableWidth, rowHeight, "S");
    doc.text(row[0], tableX + 5, tableY + (i + 1) * rowHeight + 8); // Price
    doc.text(row[1], tableX + 70, tableY + (i + 1) * rowHeight + 8); // Service Name
  });
  
  // Draw outer table border
  doc.setLineWidth(1);
  doc.rect(tableX - 2, tableY - 2, tableWidth + 4, rowHeight * (data.length + 1) + 4);
  
  // Closing message with more content
  const closingY = tableY + (data.length + 1) * rowHeight + 20;
  doc.setTextColor(0, 128, 0); // Dark green for "Thank you" message
  doc.text("Thank you for your business!", 105, closingY, { align: "center" });
  
  doc.setTextColor(255, 99, 71); // Tomato color for "Garage Service Management"
  doc.text("Garage Service Management", 105, closingY + 10, { align: "center" });
  
  // Add more content related to the garage service system
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0); // Black color for additional content
  doc.text(
    "We provide high-quality auto repairs and services to ensure your vehicle is safe and reliable.",
    20,
    closingY + 30,
    { maxWidth: 180, align: "center" }
  );
  
  doc.text(
    "Our team of experienced mechanics is here to help with brake services, engine diagnostics, and more!",
    20,
    closingY + 40,
    { maxWidth: 180, align: "center" }
  );
  
  // Final message with contact information
  doc.setTextColor(0, 51, 102); // Blue color for contact information
  doc.text("For more details, visit: www.garageservices.com", 20, closingY + 60, { align: "center" });
  
  // Save the PDF
  doc.save(`receipt_${booking.id}.pdf`);
  
}

const ActionsCell = ({ booking }: { booking: Booking }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  const handleCancelTransaction = async () => {
    try {
      const response = await axios.post(`${baseUrl}/cancel-transaction`, { bookingId: booking.id })
      console.log("Transaction cancelled:", response.data)
      toast.success("Transaction cancelled successfully")
    } catch (error) {
      console.error("Failed to cancel transaction:", error)
      toast.error("Failed to cancel transaction")
    }
  }

  return (
    <>
      <div className="flex space-x-2">
        <Button onClick={() => setIsPaymentModalOpen(true)} size="sm">
          Pay
        </Button>
        <Button onClick={() => generateReceipt(booking)} size="sm">
          Print Receipt
        </Button>
        <Button onClick={handleCancelTransaction} size="sm" variant="destructive">
          Cancel
        </Button>
      </div>
      <Elements stripe={stripePromise}>
        <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} booking={booking} />
      </Elements>
    </>
  )
}

export const columns: ColumnDef<Booking>[] = [
  {
    id: "service",
    header: "Service",
    cell: ({ row }) => row.original.service.name,
  },
  {
    id: "user",
    header: "User",
    cell: ({ row }) => row.original.user.name,
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.bookedDate).toLocaleDateString(),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },
  {
    id: "price",
    header: "Price",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "KSH" }).format(row.original.service.price),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell booking={row.original} />,
  },
]

export const BookingTable = ({ bookings }: { bookings: Booking[] }) => {
  const generatePDFReport = () => {
    const doc = new jsPDF()
    doc.text("Bookings Report", 14, 15)
    const headers = ["Service", "User", "Date", "Status", "Price"]
    const data = bookings.map((booking) => [
      booking.service.name,
      booking.user.name,
      new Date(booking.bookedDate).toLocaleDateString(),
      booking.status,
      `KSH ${booking.service.price}`,
    ])
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 20,
    })
    doc.save("bookings_report.pdf")
  }

  const generateExcelReport = () => {
    const ws = XLSX.utils.json_to_sheet(
      bookings.map((booking) => ({
        Service: booking.service.name,
        User: booking.user.name,
        Date: new Date(booking.bookedDate).toLocaleDateString(),
        Status: booking.status,
        Price: `KSH ${booking.service.price}`,
      })),
    )
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Bookings")
    XLSX.writeFile(wb, "bookings_report.xlsx")
  }

  return (
    <div>
      <div className="mb-4 flex justify-end space-x-2">
        <Button onClick={generatePDFReport}>
          <Download className="mr-2 h-4 w-4" /> Download PDF Report
        </Button>
        <Button onClick={generateExcelReport}>
          <Download className="mr-2 h-4 w-4" /> Download Excel Report
        </Button>
      </div>
    </div>
  )
}