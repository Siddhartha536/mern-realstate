import React from 'react';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      {/* Heading */}
      <h1 className='text-4xl font-extrabold mb-6 text-slate-900'>About Realstate</h1>
      
      {/* About Section */}
      <section className='mb-8'>
        <p className='mb-4 text-lg text-slate-700'>
          Realstate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. 
          Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
        </p>
        <p className='mb-4 text-lg text-slate-700'>
          Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. 
          Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
        </p>
        <p className='text-lg text-slate-700'>
          With our wealth of experience and knowledge in the real estate industry, we are committed to providing the highest level of service to our clients. 
          We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
        </p>
      </section>
      
      {/* Contact Information Section */}
      <section className='bg-gray-100 p-6 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-800'>Contact Information</h2>
        <p className='text-lg text-slate-700'><strong>Address:</strong> IIT Gandhinagar, Palaj, Gujarat, India</p>
        <p className='text-lg text-slate-700'><strong>Pincode:</strong> 382355</p>
        <p className='text-lg text-slate-700'><strong>Contact No:</strong> 9353404609</p>
      </section>
    </div>
  );
}
