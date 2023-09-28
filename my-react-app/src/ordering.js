import React, { useState } from 'react';

function OrderForm({onSubmit}) {
  const [customerName, setCustomerName] = useState('');
  const [materialNumber, setMaterialNumber] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);





  const generateOrderNumber = () => {
    
    const randomOrderNumber = Math.floor(Math.random() * 900000) + 100000;
    return randomOrderNumber;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    if (selectedMaterials.length === 0) {
      alert('Please add at least one material before submitting the order.');
      return; 
    }
  
    const newOrderNumber = generateOrderNumber();
    const newTimestamp = new Date().toLocaleString();
  
    const newOrder = {
      customerName,
      materials: selectedMaterials,
      orderAmount,
      orderNumber: newOrderNumber,
      timestamp: newTimestamp,
    };
  
    try {
      const response = await fetch('/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });
  
      if (response.ok) {
        console.log('Order submitted successfully');
        setOrders([...orders, newOrder]);
        setCustomerName('');
        setSelectedMaterials([]);
        setOrderAmount('');
        setOrderNumber(newOrderNumber);
        setTimestamp(newTimestamp);
        onSubmit(newOrder);
      } else {
        console.error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  




  const handleAddMaterial = () => {
    if (materialNumber.trim() !== '' && orderAmount.trim() !== '') {
      const newMaterial = {
        materialNumber,
        orderAmount,
      };
      setSelectedMaterials([...selectedMaterials, newMaterial]);
      setMaterialNumber('');
      setOrderAmount('');
    }
  };

  const handleRemoveMaterial = (index) => {
    const updatedMaterials = [...selectedMaterials];
    updatedMaterials.splice(index, 1);
    setSelectedMaterials(updatedMaterials);
  };

  return (
    <div>
      <h2>Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Materials:</label>
          <div>
            <input
              type="text"
              value={materialNumber}
              onChange={(e) => setMaterialNumber(e.target.value)}
              placeholder="Material Number"
            />
            <input
              type="number"
              value={orderAmount}
              onChange={(e) => setOrderAmount(e.target.value)}
              placeholder="Order Amount"
            />
            <button type="button" onClick={handleAddMaterial}>
              Add Material
            </button>
          </div>
          <ul>
            {selectedMaterials.map((material, index) => (
              <li key={index}>
                Material Number: {material.materialNumber}, Order Amount: {material.orderAmount}
                <button type="button" onClick={() => handleRemoveMaterial(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
      </form>
      {orderNumber && (
        <div>
          <p>Order Number: <strong>{orderNumber}</strong></p>
          <p>Timestamp: <strong>{timestamp}</strong></p>
        </div>
      )}

      <h2>Order History</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <p>Order Number: {order.orderNumber}</p>
            <p>Timestamp: {order.timestamp}</p>
            <p>Customer Name: {order.customerName}</p>
            <p>Materials:</p>
            <ul>
              {order.materials.map((material, materialIndex) => (
                <li key={materialIndex}>
                  Material Number: {material.materialNumber}, Order Amount: {material.orderAmount}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderForm;