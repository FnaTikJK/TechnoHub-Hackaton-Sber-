import {Box, CircularProgress, Container, List, ListItem, ListItemText} from "@mui/material";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import * as signalR from "@microsoft/signalr";
import {UserOutDTO} from "../DTO/UserOutDTO";
import {connection} from "../index";
import {useRoomContext} from "../context/RoomContext";

type RoomProps = {
    name: string
}

export function Room({name}: RoomProps) {
    const [users, setUsers] = useState<UserOutDTO[]>([]);
    const {roomId} = useRoomContext();


    useEffect(() => {
        connection.send('JoinRoom', roomId, 'userId', name)

        connection.on('JoinUser', (r) => {
            console.log(r)
            console.log(r as UserOutDTO);
            setUsers((prevState) => [...prevState, r as UserOutDTO]);
        })
    })


    return (
        <Container>
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
            <List>
                {users.map(u => <ListItem>
                    <ListItemText>
                        {u.name}
                    </ListItemText>
                </ListItem>)}
            </List>
        </Container>
    )
}
