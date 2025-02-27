"use client";

import { auth } from "@/app/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createContext, ReactNode, useEffect, useState } from "react";

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

export function AppProvider({ children }: AppProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

    // useEffectの使用理由
    // コンポーネントがマウントされた時（=初回表示時）にだけ発動する処理を記述したいとき
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setUser(newUser);
            setUserId(newUser ? newUser.uid : null);
        });

        // クリーンアップ関数、コンポーネントがアンマウントされる時に実行される処理
        // コンポーネントが削除されるとき、Firebaseの認証状態の監視を解除
        return () => {
            unsubscribe();
        };
    }, []);

    return(
        <AppContext.Provider
            value={{ user, userId, setUser, selectedRoom, setSelectedRoom }}
        >
            {children}
        </AppContext.Provider>
    );
}
