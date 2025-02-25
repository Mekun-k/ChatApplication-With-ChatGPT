import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createContext, ReactNode, useState } from "react";

type AppProviderProps = {
    children: ReactNode;
};

const defalutContextData = {
    user: null,
    userId: null,
    setUser: () => {},
    selectedRoom: null,
    setSelectedRoom: () => {},
}

const AppContext = createContext(defalutContextData);

export function AppProvider({ children }: AppProviderProps) {
    const [user, setUser] = useState<any | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

    return <AppContext.Provider value={{user, userId, setUser, selectedRoom, setSelectedRoom}}><>
}
