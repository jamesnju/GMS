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

interface Payment {
  id: number;
  userId: number;
  bookingServiceId: number;
  amount: number;
  rejectionReason:string;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  createdAt: string;
  transactionId: string;
  merchantRequestId: string | null;
  mpesaReceipt: string | null;
  user: {
      id: number;
      name: string;
      email: string;
      role: string;
  };
  bookingService: {
      bookedDate: string;
      service: {
          name: string;
          description: string;
          price: number;
      };
  };
}




const generateReceipt = (payment: Payment) => {
  const doc = new jsPDF();

  // Colors
  const primaryColor:  [number, number, number] = [213, 85, 29]; // Orange
  const textColor: [number, number, number] = [0, 0, 0]; // Black

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...textColor);
  doc.text("★ RECEIPT ★", 105, 20, { align: "center" });

  // Business Details
  doc.setFontSize(14);
  doc.setTextColor(...primaryColor);
  doc.text("Garage Management System", 105, 30, { align: "center" });
  doc.text("4490 Mombasa", 105, 38, { align: "center" });
  doc.text("Kilifi, NY 12210", 105, 46, { align: "center" });

  // BILL TO & SHIP TO
  doc.setFontSize(12);
  doc.setTextColor(...textColor);
  doc.text("BILL", 20, 60);
  // doc.text("SHIP TO", 100, 60);

  doc.text(payment.user.name, 20, 68);
  doc.text(payment.user.email, 20, 76);

  // doc.text(payment.user.name, 100, 68);
  // doc.text(payment.user.email, 100, 76);

  // Receipt details
  doc.setFont("helvetica", "bold");
  doc.text("RECEIPT #", 150, 60);
  doc.text("RECEIPT DATE", 150, 68);
  doc.text("P.O. #", 150, 76);
  doc.text("DUE DATE", 150, 84);

  doc.setFont("helvetica", "normal");
  doc.text(payment.id.toString(), 180, 60);
  doc.text(new Date(payment.paymentDate).toLocaleDateString(), 180, 68);
  doc.text("36", 180, 76);
  const createdAtDate = new Date(payment.createdAt);
createdAtDate.setDate(createdAtDate.getDate() + 10); 

doc.text(createdAtDate.toLocaleDateString(), 180, 84);
  //doc.text(new Date(payment.createdAt).toLocaleDateString(), 180, 84);


  // Table Header
  const tableStartY = 100;
  doc.setFillColor(...primaryColor);
  doc.setTextColor(255, 255, 255);
  doc.rect(20, tableStartY, 170, 10, "F");
  doc.text("ID", 25, tableStartY + 7);
  doc.text("SERVICE NAME", 60, tableStartY + 7);
  doc.text("UNIT PRICE", 130, tableStartY + 7);
  doc.text("AMOUNT", 165, tableStartY + 7);

  // Table Data
  let y = tableStartY + 15;
  doc.setTextColor(...textColor);
  doc.text((payment.id).toString(), 25, y);
  doc.text(payment.bookingService.service.name, 60, y);
  doc.text(`KSH${payment.bookingService.service.price.toFixed(2)}`, 130, y);
  doc.text(`KSH${payment.amount.toFixed(2)}`, 165, y);

  // Subtotal & Tax
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal", 130, y);
  doc.text(`$${payment.amount.toFixed(2)}`, 165, y);
  y += 8;
  doc.text("Sales Tax 5.0%", 130, y);
  doc.text(`$${(payment.amount * 0.05).toFixed(2)}`, 165, y);
  y += 10;

  // TOTAL
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.text("TOTAL", 130, y);
  doc.text(`$${(payment.amount * 1.05).toFixed(2)}`, 165, y);

  // Signature
  doc.setTextColor(...textColor);
  doc.setFont("helvetica", "italic");
  doc.text(payment.user.name, 140, y + 15);
  doc.line(130, y + 18, 180, y + 18);

  // Terms & Conditions
  y += 30;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.text("TERMS & CONDITIONS", 20, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...textColor);
  doc.text("Payment is due within 15 days", 20, y + 8);
  doc.text("ADDITIONAL DETAILS", 20, y);
  doc.setFont("helvetica", "bold");
  doc.text(` TRANSACTION ID : ${payment.transactionId}`, 20, y + 16);
  doc.text(`PAYMENT METHOD: ${payment.paymentMethod}`, 20, y + 24);
  //doc.text("Routing: 098765432", 20, y + 32);
  doc.text((`PAYMENT STATUS:  ${payment.paymentStatus}`), 20, y + 32);


  // Thank You Message
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...primaryColor);
  doc.setFontSize(14);
  doc.text("Thank you", 160, y + 40);

  // Save PDF
  doc.save(`receipt${payment.id}.pdf`);
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
    id: "rejectionReason",
    header: "rejectionReason",
    cell: ({ row }) => row?.original.rejectionReason || "Failed Transaction",
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