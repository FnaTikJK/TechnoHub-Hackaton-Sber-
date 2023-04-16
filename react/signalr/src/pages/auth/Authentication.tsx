import {useState} from "react";
import {Box, Button, Container, Select, Stack, TextField} from "@mui/material";
import {client} from '../../index';
import {AccountAuthDTO} from "../../DTO/auth/AuthDTO";
import {TokenDTO} from "../../DTO/auth/TokenDTO";
import {useTokenContext} from "../../context/TokenContext";
import {useNavigate} from "react-router";

export function Authentication(){
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {token, setToken} = useTokenContext();
const nav = useNavigate();


    const submit = () => {
        const body: AccountAuthDTO = {
            login,
            password
        }
        client.post<TokenDTO>('Account/Login', body)
            .then(r => setToken(r.data.token))
            .then(() => nav('../home'))
            .catch(console.error)
    }

    return (
        <Container>
            <Box>
            <Stack>
                <TextField label={'Логин'} value={login} onChange={(ev) => setLogin(ev.target.value)}/>
                <TextField label={'Пароль'} value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                <Button onClick={submit}>Войти</Button>
            </Stack>
            </Box>
        </Container>
    )
}
