import React, { useState } from 'react';
import OrderForm from './ordering.js';

function App() {
  
  const [orders, setOrders] = useState([]);


  const handleOrderSubmit = (newOrder) => {

    setOrders([...orders, newOrder]);

    sendOrderDataToServer(newOrder);
  };


  const sendOrderDataToServer = async (orderData) => {
    try {
      const response = await fetch('/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log('Order submitted successfully to the server');
      } else {
        console.error('Failed to submit order to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <OrderForm onSubmit={handleOrderSubmit} />
   
    </div>
  );
}

export default App;
