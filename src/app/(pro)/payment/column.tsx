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
  doc.setFontSize(18)
  doc.text("Receipt", 105, 20, { align: "center" })
  doc.setFontSize(12)
  doc.text(`Date: ${new Date().toLocaleString()}`, 20, 30)
  doc.text(`Receipt for: ${booking.user.name}`, 20, 40)
  doc.text(`Service: ${booking.service.name}`, 20, 50)
  doc.text(
    `Amount: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "KSH" }).format(booking.service.price)}`,
    20,
    60,
  )
  doc.text("Thank you for your business!", 20, 70)
  doc.text("Garage service management ", 20, 80)
  doc.save(`receipt_${booking.id}.pdf`)
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