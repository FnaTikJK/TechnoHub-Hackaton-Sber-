import {TokenContextProvider} from "./context/TokenContext";
import {RoomContextProvider} from "./context/RoomContext";

export function Providers({children}: { children: JSX.Element | JSX.Element[] }) {

    return (
        <TokenContextProvider>
            <RoomContextProvider>
                {children}
            </RoomContextProvider>
        </TokenContextProvider>
    )
}
