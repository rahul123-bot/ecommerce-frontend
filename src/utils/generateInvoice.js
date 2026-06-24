import jsPDF from "jspdf";

const generateInvoice = (order) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("INVOICE", 80, 20);

  doc.setFontSize(12);

  doc.text(`Order ID: ${order._id}`, 20, 40);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 50);

  doc.text(
    `Customer: ${order.user?.name || "Customer"}`,
    20,
    60
  );

  doc.text(
    `Payment: ${order.paymentStatus}`,
    20,
    70
  );

  doc.text(
    `Status: ${order.status}`,
    20,
    80
  );

  let y = 100;

  doc.text("Products", 20, y);

  y += 10;

  order.items.forEach((item) => {
    doc.text(
      `${item.product?.name} x ${item.quantity}`,
      20,
      y
    );

    doc.text(
      `₹${item.product?.price}`,
      150,
      y
    );

    y += 10;
  });

  y += 10;

  doc.text(
    `Total Amount: ₹${order.totalPrice}`,
    20,
    y
  );

  doc.save(`invoice-${order._id}.pdf`);
};

export default generateInvoice;