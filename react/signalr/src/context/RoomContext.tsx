import React, {useContext, useState} from "react";

type RoomContextType = {
    roomId: string,
    setRoomId: (s: string) => void
}
const RoomContext = React.createContext<RoomContextType>({roomId: '', setRoomId: () => null})

export const useRoomContext = () => useContext(RoomContext);

export function RoomContextProvider({children}: { children: JSX.Element | JSX.Element[] }) {
    const [roomId, setRoomId] = useState<string>('');

    return (
        <RoomContext.Provider value={{roomId, setRoomId}}>
            {children}
        </RoomContext.Provider>
    )
}
