import React from "react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhatsAppButton = () => {
  const phoneNumber = "+8801712801284";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <button className="flex items-center justify-center px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600">
        <FontAwesomeIcon icon={faWhatsapp} className="mr-2 text-3xl" />
        <div className="flex flex-col items-start *:text-xs">
          <p> Message </p>
          <p> on WhatsApp </p>
        </div>
      </button>
    </a>
  );
};

export default WhatsAppButton;
