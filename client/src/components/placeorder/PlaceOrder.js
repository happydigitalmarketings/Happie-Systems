import React, { useState } from "react";
import DOMPurify from "dompurify";
const PlaceOrder = ({title, description, price}) => {

    const sanitizedDescription = DOMPurify.sanitize(description);
  // State to store order details (you can expand this as needed)
  const [orderDetails, setOrderDetails] = useState({
    product: null,
    quantity: null,
    price: null
  });

  console.log("desc", description)

  const textDescription = sanitizedDescription.replace(/<\/?[^>]+(>|$)/g, "");

  console.log("textdesc", textDescription)

  // WhatsApp phone number (replace with the number you want orders sent to)
  const whatsappNumber = "919994442863"; // Example: +91xxxxxxxxxx

  // Function to create the WhatsApp message
  const createWhatsAppMessage = () => {
    const message = `Hello, I would like to place an order for the following product:\n
*Product:* *${title}*\n
*Price:* *₹${price}*\n
                      `;
    // URL-encode the message
    return encodeURIComponent(message);
  };

  return (
    <div>
       <a
        href={`https://wa.me/${whatsappNumber}?text=${createWhatsAppMessage()}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          backgroundColor: "#25D366", // WhatsApp color
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Place Order
      </a>
    </div>
  );
};

export default PlaceOrder;
