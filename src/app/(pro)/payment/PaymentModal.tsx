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

interface Booking {
  id: number;
  userId: number;
  serviceId: number;
  bookedDate: string;
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  service: {
    id: number;
    name: string;
    price: number;
  };
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, booking }) => {
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "mpesa">("stripe");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as "stripe" | "mpesa");
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
          userId: booking.userId,
          bookingServiceId: booking.id,
          amount: booking.service.price,
          paymentMethodId: stripePaymentMethod?.id,
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
        const response = await axios.post(baseUrl + "mpesa", {
          userId: booking.userId,
          phoneNumber: phoneNumber,
          amount: booking.service.price,
          bookingServiceId: booking.id,
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
      <DialogContent className="max-w-lg w-full sm:max-w-md p-6 sm:px-8 sm:py-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-900 animate-fade-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Payment for {booking.service.name}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Please select your payment method and confirm the details.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <RadioGroup
            onValueChange={(value) => handlePaymentMethodChange(value)}
            className="mt-4"
          >
            {/* <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem
                value="stripe"
                id="stripe"
                className="border-gray-300 focus:ring-indigo-500"
              />
              <Label htmlFor="stripe" className="text-gray-700 dark:text-gray-200">
                Pay with Stripe
              </Label>
            </div> */}
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem
                value="mpesa"
                id="mpesa"
                className="border-gray-300 focus:ring-indigo-500"
              />
              <Label htmlFor="mpesa" className="text-gray-700 dark:text-gray-200">
                Pay with M-Pesa
              </Label>
            </div>
          </RadioGroup>
        )}

        {step === 2 && (
         <div className="py-8 px-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto border border-gray-200 dark:border-gray-700">
         <div className="text-center">
           <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Payment Details</h2>
           <p className="text-gray-600 dark:text-gray-300">M-Pesa Payment</p>
         </div>
         
         <div className="text-gray-700 dark:text-gray-200">
           <p className="text-lg">
             <strong>Service:</strong> {booking.service.name}
           </p>
           <p className="text-lg">
             <strong>Price:</strong>{" "}
             {new Intl.NumberFormat("en-US", {
               style: "currency",
               currency: "KSH",
             }).format(booking.service.price)}
           </p>
           <p className="text-lg">
             <strong>Name:</strong> {booking.user.name}
           </p>
           <p className="text-lg">
             <strong>Email:</strong> {booking.user.email}
           </p>
       
           {paymentMethod === "mpesa" && (
             <div className="mt-6">
               <Label htmlFor="phoneNumber" className="block text-gray-700 dark:text-gray-200 text-sm font-medium">
                 M-Pesa Phone Number
               </Label>
               <Input
                 id="phoneNumber"
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                 placeholder="Format: 254700000000"
                 className="mt-2 w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
               />
             </div>
           )}
         </div>
       
         <div className="flex justify-between items-center mt-6">
           <Button onClick={() => setStep(1)} variant="outline" className="w-full sm:w-auto">
             Back
           </Button>
           <Button onClick={handleConfirmPayment} className="w-full sm:w-auto">
             Confirm Payment
           </Button>
         </div>
       </div>
        )}

        {/* <DialogFooter className="flex justify-between flex-wrap gap-2 sm:flex-col sm:space-y-2 sm:mt-4">
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
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;