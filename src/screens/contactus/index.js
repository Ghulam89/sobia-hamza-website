import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Base_url } from '../../utils/Base_url';
import { toast } from 'react-toastify';

const ContactUs = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      message: Yup.string().required('Message is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${Base_url}/contactus/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Handle success response
          // alert('Message sent successfully!');
          toast.success('Message sent successfully!')
        } else {
          // Handle failure response
          alert('Failed to send message.');
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      }
    },
  });

  

  return (
    <>
      <Navbar />

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`shadow-sm ${formik.errors.name && formik.touched.name ? 'border-red-500' : 'border-gray-300'} bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`shadow-sm ${formik.errors.email && formik.touched.email ? 'border-red-500' : 'border-gray-300'} bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${formik.errors.phoneNumber && formik.touched.phoneNumber ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter your phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.phoneNumber}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border ${formik.errors.message && formik.touched.message ? 'border-red-500' : 'border-gray-300'} focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Enter your message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.message && formik.touched.message && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black mx-auto sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
