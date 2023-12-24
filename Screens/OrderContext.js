import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const addOrder = (newOrder, newTotal) => {
    setOrder(newOrder);
    setTotal(newTotal);
  };

  return (
    <OrderContext.Provider value={{ order, total, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
