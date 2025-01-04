import { Dispatch, SetStateAction, createContext, useState } from "react";

type LayoutContextProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const LayoutContext = createContext<LayoutContextProps>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export function LayoutProvider({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
