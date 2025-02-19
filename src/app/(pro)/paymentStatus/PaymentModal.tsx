"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import baseUrl from "@/utils/constant";

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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, payment }) => {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "mpesa">("stripe");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentMethodChange = (value: "stripe" | "mpesa") => {
    setPaymentMethod(value);
    setStep(2);
  };

  const handleConfirmPayment = async () => {
    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        console.error("Stripe has not loaded");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("Card element not found");
        return;
      }

      const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Error creating payment method:", error);
        toast.error("Payment failed. Please try again.");
        return;
      }

      try {
        const response = await axios.post(baseUrl + "/payments", {
          userId: payment.userId,
          bookingServiceId: payment.bookingServiceId,
          amount: payment.amount,
          paymentMethodId: stripePaymentMethod.id,
        });
        console.log("Payment confirmed:", response.data);
        toast.success("Payment confirmed successfully");
        onClose();
      } catch (error) {
        console.error("Failed to confirm payment:", error);
        toast.error("Failed to confirm payment");
      }
    } else if (paymentMethod === "mpesa") {
      try {
        const response = await axios.post(baseUrl + "/mpesa", {
          userId: payment.userId,
          phoneNumber: phoneNumber,
          amount: payment.amount,
          bookingServiceId: payment.bookingServiceId,
        });
        console.log("M-Pesa payment initiated:", response.data);
        toast.success("M-Pesa payment initiated. Please check your phone for the prompt.");
        onClose();
      } catch (error) {
        console.error("Failed to initiate M-Pesa payment:", error);
        toast.error("Failed to initiate M-Pesa payment");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-lg w-full sm:max-w-md sm:px-4 sm:py-6 p-6">
    <DialogHeader>
      <DialogTitle>Payment for {payment.bookingServiceId}</DialogTitle>
      <DialogDescription>Please select your payment method and confirm the details.</DialogDescription>
    </DialogHeader>

    {step === 1 && (
      <RadioGroup onValueChange={(value) => handlePaymentMethodChange(value as "stripe" | "mpesa")}>
        <div className="flex items-center space-x-2 mb-3">
          <RadioGroupItem value="stripe" id="stripe" />
          <Label htmlFor="stripe">Pay with Stripe</Label>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <RadioGroupItem value="mpesa" id="mpesa" />
          <Label htmlFor="mpesa">Pay with M-Pesa</Label>
        </div>
      </RadioGroup>
    )}

    {step === 2 && (
      <div className="py-4 space-y-4">
        <p><strong>Service:</strong> {payment.bookingServiceId}</p>
        <p>
          <strong>Price:</strong>{" "}
          {new Intl.NumberFormat("en-US", { style: "currency", currency: "KSH" }).format(payment.amount)}
        </p>
        <p><strong>Name:</strong> {payment.userId}</p>
        <p><strong>Email:</strong> {payment.userId}</p>
        {paymentMethod === "stripe" && (
          <div className="mt-4">
            <CardElement />
          </div>
        )}
        {paymentMethod === "mpesa" && (
          <div className="mt-4">
            <Label htmlFor="phoneNumber">M-Pesa Phone Number</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="M-Pesa phone number format 2700747076"
            />
          </div>
        )}
      </div>
    )}

    <DialogFooter className="flex justify-between sm:flex-col sm:space-y-2 sm:mt-4">
      {step === 2 && (
        <Button onClick={() => setStep(1)} variant="outline" className="w-full sm:w-auto">
          Back
        </Button>
      )}
      <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
        Cancel
      </Button>
      {step === 2 && (
        <Button onClick={handleConfirmPayment} className="w-full sm:w-auto">
          Confirm Payment
        </Button>
      )}
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default PaymentModal;