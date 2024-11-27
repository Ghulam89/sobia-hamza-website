import React, { useState } from "react";
import Accordion from "../../components/Accordion/Accordion";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
const Faqs = () => {
  const [accordions, setAccordion] = useState([
    {
      key: 1,
      title: "1. HOW DO I PLACE AN ORDER ONLINE?",
      data: "External Attack Surface Management (EASM) continuously identifies, monitors, and secures an organization's externally-facing or publicly accessible assets. This process enables organizations to address weaknesses, misconfigurations, and potential entry points that adversaries could exploit to gain unauthorized access or cause harm.",
      isOpen: false,
    },
    {
      key: 2,
      title: "2. HOW WILL I KNOW THAT YOU RECEIVED MY ORDER & WHEN WILL MY PAYMENT BE DEDUCTED?",
      data: "HackerView utilizes Open Source Intelligence (OSINT) and in-house built tools to carry out its scanning activities.",
      isOpen: false,
    },
    {
      key: 3,
      title: "3. WHAT HAPPENS IF THE PRODUCT I'VE ORDERED ISN'T IN STOCK?",
      data: "The platform can pivot via various points such as WHOIS Records, Reverse WHOIS records, DNS Entries, SSL Certificates, and more.",
      isOpen: false,
    },
  ]);

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord.key === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  return (
    <>
      <Navbar/>
      <main className="flex-grow px-4  sm:w-11/12 w-12/12 mx-auto tw-min-h-screen py-8 md:px-8 md:py-12">
        <div className=" bg-white   bg-no-repeat w-full bg-cover   tw-h-auto ">
          <div className=" container">
            <div className=" w-full">
              
              <h1 className="  font-bold sm:text-4xl text-3xl text-center    text-black">
              Frequently Asked Questions
              </h1>
              <div className="  mt-12">
                {accordions.map((accordion) => (
                  <Accordion
                    key={accordion.key}
                    title={accordion.title}
                    data={accordion.data}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion.key)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Faqs;
