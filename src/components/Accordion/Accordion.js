import { FaAngleUp } from "react-icons/fa6";

// Accordion.js
export default function Accordion({ title, isOpen, toggleAccordion, children }) {
  return (
    <>
      <div className="border-b mb-4">
        <button
          className="w-full p-4 text-left flex justify-between items-center transition duration-300 hover:bg-gray-100 rounded-lg"
          onClick={toggleAccordion}
        >
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span
            className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          >
            <FaAngleUp size={14} className="text-gray-600" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="bg-white p-4 text-gray-700 rounded-b-lg shadow-md transition-all duration-300">
          {children}
        </div>
      )}
    </>
  );
}
