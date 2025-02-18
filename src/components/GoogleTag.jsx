import { useEffect } from 'react';

const GoogleTag = () => {
  useEffect(() => {
    // Load the Google Analytics script
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-SX0M1ZE872';
    script1.async = true;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-SX0M1ZE872');

    // Cleanup function
    return () => {
      document.head.removeChild(script1);
    };
  }, []); // Empty dependency array means this runs once on mount

  return null; // This component doesn't render anything
};

export default GoogleTag;