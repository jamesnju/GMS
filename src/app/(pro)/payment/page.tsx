import { Payment } from "@/components/Payment"

export default function PaymentPage() {
  // In a real application, you would fetch this data from your backend
  const mockInvoiceData = {
    items: [
      { description: "Service Fee", amount: 100 },
      { description: "Tax", amount: 10 },
    ],
    total: 110,
  };

  // In a real application, you would generate this on the server
  const mockClientSecret = "mock_client_secret";

  return (
    <div className="container mx-auto py-10">
      <Payment clientSecret={mockClientSecret} invoiceData={mockInvoiceData} />
    </div>
  );
}

