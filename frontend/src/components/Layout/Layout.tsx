import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 pb-10">
        {children}
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#0F111E',
          border: '1px solid rgba(0, 191, 255, 0.3)',
          borderRadius: '0.5rem',
          color: 'white',
          boxShadow: '0 0 10px rgba(0, 191, 255, 0.2)'
        }}
      />
    </div>
  );
};

export default Layout;