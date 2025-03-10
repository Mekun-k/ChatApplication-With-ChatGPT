"use client";

import { 
  Timestamp,
  collection, 
  onSnapshot, 
  orderBy, 
  query, 
  where
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { TbLogout2 } from "react-icons/tb";
import { db } from '../firebase';
import { useAppContext } from '@/context/AppContext';

type Room = {
  id: string;
  name: string;
  createdAt: Timestamp;
};

const Sidebar = () => {
  const { user, userId, setSelectedRoom } = useAppContext();
  const [rooms, setRooms] = useState<Room[]>([]);

  // Memo
  // ログインユーザーの userId に対応するルームデータを取得し、リアルタイムで監視するためのもの
  useEffect(() => {
    if (user) {
      const fetchRooms = async () => {
        const roomCollectionRef = collection(db, "rooms");
        const q = query(
          roomCollectionRef,
          where("userId", "==", userId),
          orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newRooms: Room[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            createdAt: doc.data().createdAt,
          }));
          setRooms(newRooms);
        });
  
        return () => {
          unsubscribe();
        };
      };
  
      fetchRooms();
    }
    // Memo
    // useEffect の最後の [] に入れた値は「この値が変わったら useEffect を実行する」という意味
    // つまり userId が変わったときに useEffect を実施し直すという意味。
  }, [userId]);

  const selectRoom = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className='bg-customBlue h-full overflow-y-auto px-5 flex flex-col'>
      <div className='flex-grow'>
        <div className='cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150'>
          <span className='text-white p-4 text-2xl'>＋</span>
          <h1 className='text-white text-xl font-semibold p-4'>New Chat</h1>
        </div>
        <ul>
          {rooms.map((room) => (
            <li 
              key={room.id}
              className='cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150'
              onClick={() => selectRoom(room.id)}
            >
              {room.name}
            </li>
          ))}
        </ul>
      </div>

      <div className='text-lg flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:bg-slate-700 duration-150'>
        <TbLogout2 />
        <span>ログアウト</span>
      </div>
    </div>
  )
}

export default Sidebar
