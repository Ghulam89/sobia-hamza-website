import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, children, className, setIsModalOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed  z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                onClick={onClose}
                className="absolute inset-0   bg-[#F7F7F7]"
              ></div>

              <MdClose
                className=" cursor-pointer absolute top-3 right-7"
                onClick={() => onClose()}
                size={25}
              />
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className={`inline-block align-bottom bg-white  text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle ${className} `}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
