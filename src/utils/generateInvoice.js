import jsPDF from "jspdf";

const generateInvoice = (order) => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("NextCart", 15, 20);

  doc.setFontSize(12);
  doc.text("Premium Shopping Invoice", 15, 28);

  // Invoice Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(22);
  doc.text("INVOICE", 150, 20);

  // Invoice Info
  doc.setDrawColor(200);
  doc.rect(14, 45, 182, 35);

  doc.setFontSize(11);

  doc.text(`Invoice No: ${order.invoiceNumber || "N/A"}`, 20, 55);

  doc.text(`Order ID: ${order._id}`, 20, 63);

  doc.text(
    `Invoice Date: ${
      order.invoiceGeneratedAt
        ? new Date(order.invoiceGeneratedAt).toLocaleDateString()
        : new Date(order.createdAt).toLocaleDateString()
    }`,
    20,
    71,
  );

  // Customer Section
  doc.setFontSize(14);
  doc.text("Customer Information", 20, 95);

  doc.setFontSize(11);

  doc.text(`Name: ${order.user?.name || "Customer"}`, 20, 105);

  doc.text(`Email: ${order.user?.email || "N/A"}`, 20, 113);

  doc.text(`Phone: ${order.shippingAddress?.phone || "N/A"}`, 20, 121);

  // Address Section
  doc.setFontSize(14);
  doc.text("Shipping Address", 20, 140);

  doc.setFontSize(11);

  doc.text(order.shippingAddress?.address || "", 20, 150);

  doc.text(
    `${order.shippingAddress?.city || ""}, ${
      order.shippingAddress?.state || ""
    }`,
    20,
    158,
  );

  doc.text(`PIN: ${order.shippingAddress?.postalCode || ""}`, 20, 166);

  // Product Table Header
  let y = 185;

  doc.setFillColor(230, 230, 230);
  doc.rect(15, y, 180, 10, "F");

  doc.text("Product", 20, y + 7);
  doc.text("Qty", 105, y + 7);
  doc.text("Price", 135, y + 7);
  doc.text("Total", 170, y + 7);

  y += 18;

  order.items.forEach((item) => {
    const name = item.product?.name || "Product";
    const price = item.product?.price || 0;
    const qty = item.quantity || 1;
    const total = price * qty;

    doc.text(name.substring(0, 40), 20, y);
    doc.text(String(qty), 108, y);
    doc.text(`Rs.${price}`, 132, y);
    doc.text(`Rs.${total}`, 167, y);

    y += 10;
  });

  // Total Box
  y += 10;

  doc.line(15, y, 195, y);

  y += 12;

  doc.setFontSize(14);

  doc.text(`Grand Total: Rs.${order.totalPrice}`, 20, y);

  y += 12;

  doc.setFontSize(11);

  doc.text(`Payment Method: ${order.paymentMethod}`, 20, y);

  y += 8;

  doc.text(`Payment Status: ${order.paymentStatus}`, 20, y);

  y += 8;

  doc.text(`Order Status: ${order.status}`, 20, y);

  // Footer
  y += 25;

  doc.setFontSize(12);
  doc.setTextColor(100);

  doc.text("Thank you for shopping with FlipShop", 20, y);

  doc.text("This is a computer generated invoice.", 20, y + 8);

  doc.save(`Invoice-${order.invoiceNumber || order._id}.pdf`);
};

export default generateInvoice;
