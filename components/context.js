import React, { createContext, useEffect, useState } from "react";
import { message } from "antd";

// Create the context
const MyContext = createContext();

// Create a provider component
const MyProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MyContext.Provider value={{ messageApi }}>
      {contextHolder} {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
