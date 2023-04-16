import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContext from "@mui/material/Dialog/DialogContext";
import {useEffect, useState} from "react";
import {client} from "../index";
import {useRoomContext} from "../context/RoomContext";
import {RoomOutDTO} from "../DTO/RoomOutDTO";
import {useTokenContext} from "../context/TokenContext";
import {useNavigate} from "react-router";

type ConnectPopupProps = {
    show: boolean;
    setShow: (v:boolean) => void;
}

export function ConnectPopup({show, setShow}: ConnectPopupProps) {
    const [code, setCode] = useState<string>('');
    const {setRoomId} = useRoomContext();
    const {token} = useTokenContext();
    useEffect(() => console.log(code), [code])
    const nav = useNavigate();
    const submit = () => {
        client.get<RoomOutDTO>('Rooms/' + code, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(r => setRoomId(code))
            .then(() => nav('../room'))
            .catch(console.error)
    }

    return (
        <Dialog open={show} onClose={() => setShow(false)}>
            <DialogTitle>Присоединение</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Введите код для присоединения
                </DialogContentText>
                <TextField  autoFocus
                            margin="dense"
                            id="name"
                            label="Код присоединеиня"
                            type="email"
                            fullWidth
                            variant="standard"
                value={code}
                onChange={(ev) => setCode(ev.target.value)}/>
                <Button onClick={submit}>Присоединиться</Button>
            </DialogContent>
        </Dialog>
    )
}
