'use client'

import React, { createContext, useState, useContext, ReactNode, useReducer } from "react";

interface GlobalState {
  imagesUpdated: boolean;
  triggerUpdate: () => void;
  forceUpdate: () => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [imagesUpdated, setImagesUpdated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[ _ ,forceUpdate] = useReducer(x => x + 1, 0);

  const triggerUpdate = () => {
    setImagesUpdated((prev) => !prev); // Toggle state to signal update
    console.log('Updated state:', !imagesUpdated); // Log the new state
  };

  return (
    <GlobalStateContext.Provider value={{ imagesUpdated, triggerUpdate, forceUpdate }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
