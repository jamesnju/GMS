"use client"

import { useState } from "react"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InvoiceBreakdown } from "./InvoiceBreakdown"
import { DownloadReceipt } from "./DownloadReceipt"

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentProps {
  clientSecret: string;
  invoiceData: {
    items: { description: string; amount: number }[];
    total: number;
  };
}

function PaymentForm({ invoiceData }: { invoiceData: PaymentProps['invoiceData'] }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirmation`,
      },
    });

    if (result.error) {
      console.error(result.error);
      setPaymentStatus('error');
    } else {
      setPaymentStatus('success');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent>
        <InvoiceBreakdown items={invoiceData.items} total={invoiceData.total} />
        <div className="mt-4">
          <PaymentElement />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button type="submit" disabled={isProcessing || paymentStatus === 'success'} className="w-full">
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
        {paymentStatus === 'success' && <DownloadReceipt invoiceData={invoiceData} />}
      </CardFooter>
    </form>
  );
}

export function Payment({ clientSecret, invoiceData }: PaymentProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Complete your payment securely with Stripe</CardDescription>
      </CardHeader>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm invoiceData={invoiceData} />
      </Elements>
    </Card>
  );
}

