import { User } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createContext, ReactNode, useState } from "react";

type AppProviderProps = {
    children: ReactNode;
};

type AppContextType = {
    user: User | null;
    userId: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    selectedRoom: string | null;
    setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
};

const defalutContextData = {
    user: null,
    userId: null,
    setUser: () => {},
    selectedRoom: null,
    setSelectedRoom: () => {},
};

const AppContext = createContext<AppContextType>(defalutContextData);

// TODO:error発生してるが理解して解決したいのでこのままcommitします
export function AppProvider({ children }: AppProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

    return(
        <AppContext.Provider
            value={{ user, userId, setUser, setSelectedRoom }}
        >
            {children}
        </AppContext.Provider>
    );
}
