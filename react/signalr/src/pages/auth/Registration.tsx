import {Button, Container, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {AccountRegDTO} from "../../DTO/auth/AccountRegDTO";
import {client} from "../../index";
import {useTokenContext} from "../../context/TokenContext";
import {AccountAuthDTO} from "../../DTO/auth/AuthDTO";
import {TokenDTO} from "../../DTO/auth/TokenDTO";

export function Registration(){
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {token, setToken} = useTokenContext();
    const submit = () => {
        const body: AccountRegDTO = {
            name,
            login,
            password
        }
        client.post<TokenDTO>('Account/Register', body)
            .then(r => setToken(r.data.token))
            .catch(console.error)
    }

    return (
        <main>
            <Container maxWidth={'sm'}>
                <Stack spacing={2}>
                    <TextField label={'Имя'} variant="outlined" value={name} onChange={(ev) => setName(ev.target.value)}/>
                    <TextField label={'Логин'} variant="outlined" value={login} onChange={(ev) => setLogin(ev.target.value)}/>
                    <TextField label={'Пароль'} variant="outlined" value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                    <Button onClick={submit}>Регистрация</Button>
                </Stack>
            </Container>
        </main>
    )
}
