import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "../../components/Accordion/Accordion";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Base_url } from "../../utils/Base_url";
const Faqs = () => {



  const [accordions, setAccordion] = useState([]);



  useEffect(() => {
    axios
      .get(`${Base_url}/faq/getAll`)
      .then((res) => {
        console.log(res);

        setAccordion(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleAccordion = (accordionkey) => {
    const updatedAccordions = accordions.map((accord) => {
      if (accord._id === accordionkey) {
        return { ...accord, isOpen: !accord.isOpen };
      } else {
        return { ...accord, isOpen: false };
      }
    });

    setAccordion(updatedAccordions);
  };
  return (
    <>
      <Navbar />
      <main className="flex-grow px-4  sm:w-11/12 w-12/12 mx-auto tw-min-h-screen py-8 md:px-8 md:py-12">
        <div className=" bg-white   bg-no-repeat w-full bg-cover   tw-h-auto ">
          <div className=" container mx-auto">
            <div className=" w-full">

              <h1 className="  font-bold sm:text-4xl text-3xl text-center   text-primary">
                Frequently Asked Questions
              </h1>
              <div className="  mt-12">
                {accordions.map((accordion) => (
                  <Accordion
                    key={accordion._id}
                    title={accordion.question}
                    data={accordion.answer}
                    isOpen={accordion.isOpen}
                    toggleAccordion={() => toggleAccordion(accordion._id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Faqs;
