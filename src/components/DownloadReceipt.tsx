import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

interface DownloadReceiptProps {
  invoiceData: any; // Replace 'any' with a more specific type for your invoice data
}

export function DownloadReceipt({ invoiceData }: DownloadReceiptProps) {
  const handleDownload = () => {
    // Generate receipt content (you may want to use a library like jsPDF for more complex receipts)
    const receiptContent = `
      Receipt
      -------
      Date: ${new Date().toLocaleDateString()}
      Total: $${invoiceData.total.toFixed(2)}
      
      Items:
      ${invoiceData.items.map((item: any) => `${item.description}: $${item.amount.toFixed(2)}`).join('\n')}
    `;

    // Create a Blob with the receipt content
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleDownload} className="w-full">
      <Download className="mr-2 h-4 w-4" /> Download Receipt
    </Button>
  );
}

