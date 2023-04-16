import {Box, Button, Container} from "@mui/material";
import {ConnectPopup} from "../UI/ConnectPopup";
import {useState} from "react";

export function Home(){
    const [showConnect, setShowConnect] = useState<boolean>(false);


    return (
        <Container>
            <Box>
                <Button onClick={() => setShowConnect(true)}>Присоедениться</Button>
                <ConnectPopup show={showConnect} setShow={setShowConnect}/>
                <Button>Создать</Button>
            </Box>
        </Container>
    )
}
