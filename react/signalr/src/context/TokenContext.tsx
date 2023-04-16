import React, {useContext, useEffect, useState} from "react";

export type TokenContextType = {
    token: string;
    setToken: (s: string) => void
}
const TokenContext = React.createContext<TokenContextType>({token:'', setToken: () =>null})

export const useTokenContext = () => useContext(TokenContext);

export function TokenContextProvider({children}: {children: JSX.Element | JSX.Element[]}){
    const [token, setToken] = useState<string>('')

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    )
}
