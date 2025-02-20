"use client"
//import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
//import axios from "axios";
//import baseUrl from "@/utils/constant";
//import { toast } from "react-toastify";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
//import { Elements } from "@stripe/react-stripe-js";
//import { loadStripe } from "@stripe/stripe-js";
//import PaymentModal from "./PaymentModal";

// Load Stripe outside of the component to avoid recreating the Stripe object on every render
//const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Payment {
  id: number;
  userId: number;
  bookingServiceId: number;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  createdAt: string;
  transactionId: string | null;
  merchantRequestId: string | null;
  mpesaReceipt: string | null;
}

const generateReceipt = (payment: Payment) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Receipt", 105, 20, { align: "center" });
  doc.setFontSize(12);

  // Draw the top section with the user name and date on the right
  doc.text(`Date: ${new Date().toLocaleString()}`, 160, 30);
  doc.text(`Name: ${payment.userId}`, 160, 40);

  // Set a box around the header with a gap
  doc.setLineWidth(0.5);
  doc.rect(140, 20, 60, 30);

  // Create the table header with a color background
  const tableX = 20;
  const tableY = 60; // Added gap between the header and the table
  const tableWidth = 180;
  const rowHeight = 12;

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
      `${new Intl.NumberFormat("en-US", { style: "currency", currency: "KSH" }).format(payment.amount)}`,
      payment.paymentMethod,
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
  doc.save(`receipt_${payment.id}.pdf`);
};

const ActionsCell = ({ payment }: { payment: Payment }) => {
  //const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // const handleCancelTransaction = async () => {
  //   try {
  //     const response = await axios.post(`${baseUrl}/cancel-transaction`, { paymentId: payment.id });
  //     console.log("Transaction cancelled:", response.data);
  //     toast.success("Transaction cancelled successfully");
  //   } catch (error) {
  //     console.error("Failed to cancel transaction:", error);
  //     toast.error("Failed to cancel transaction");
  //   }
  // };

  return (
    <>
      <div className="flex space-x-2">
        {/* <Button onClick={() => setIsPaymentModalOpen(true)} size="sm">
          Pay
        </Button>  */}
        <Button onClick={() => generateReceipt(payment)} size="sm">
          Print Receipt
        </Button>
        {/* <Button onClick={handleCancelTransaction} size="sm" variant="destructive">
          Cancel
        </Button>  */}
      </div>
      {/* <Elements stripe={stripePromise}>
        <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} payment={payment} />
      </Elements> */}
    </>
  );
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "service",
    header: "Service",
    cell: ({ row }) => row.original.bookingServiceId,
  },
  {
    id: "user",
    header: "User",
    cell: ({ row }) => row.original.userId,
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.paymentDate).toLocaleDateString(),
  },
  {
    id: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.paymentStatus.toUpperCase();
      return (
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            status === "pending"
              ? "bg-yellow-500 text-white"
              : status === "initiated" 
              ? "bg-red-500 text-white"
              : status === "completed"
              ? "bg-green-500 text-white"
              : status === "waiting verification"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {row.original.paymentStatus}
        </span>
      );
    },
  },
  
  {
    id: "amount",
    header: "Price",
    cell: ({ row }) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "KSH" }).format(row.original.amount),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell payment={row.original} />,
  },
];

export const PaymentTable = ({ payments }: { payments: Payment[] }) => {
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text("Payments Report", 14, 15);
    const headers = ["Service", "User", "Date", "Status", "Price"];
    const data = payments.map((payment) => [
      payment.bookingServiceId,
      payment.userId,
      new Date(payment.paymentDate).toLocaleDateString(),
      payment.paymentStatus,
      `KSH ${payment.amount}`,
    ]);
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 20,
    });
    doc.save("payments_report.pdf");
  };

  const generateExcelReport = () => {
    const ws = XLSX.utils.json_to_sheet(
      payments.map((payment) => ({
        Service: payment.bookingServiceId,
        User: payment.userId,
        Date: new Date(payment.paymentDate).toLocaleDateString(),
        Status: payment.paymentStatus,
        Price: `KSH ${payment.amount}`,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    XLSX.writeFile(wb, "payments_report.xlsx");
  };

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
  );
};