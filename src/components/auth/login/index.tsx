import React, {Fragment} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {IPropsLogin} from "../../../common/types/auth/auth";

const LoginPage:React.FC<IPropsLogin> = (props: IPropsLogin): JSX.Element =>{
    const{setPassword, setEmail, navigate} = props
    return(
        <Fragment>
            <Typography  variant="h2"  fontFamily="Poppins" textAlign="center">Авторизация</Typography>
            <Typography  variant="body1" marginBottom={3} fontFamily="Poppins" textAlign="center">Введите ваш логин и пароль</Typography>
            <TextField   type="email" margin="normal" fullWidth={true}  label="Email" variant="outlined" placeholder="Введите ваш email" onChange={(e) => setEmail(e.target.value)}/>
            <TextField   type="password" margin="normal" fullWidth={true} label="Пароль" variant="outlined" placeholder="Введите ваш пароль" onChange={(e) => setPassword(e.target.value)}/>
            <Button      type="submit" variant="contained" sx={{fontFamily:"Poppins",marginBottom: 2, marginTop: 2, width:'60%'}}>Войти</Button>
            <Typography  variant="body1" sx={{fontFamily:"Poppins"}}>У вас нет аккаунта?<span className="incitingText" onClick={()=>navigate("/register")}>Регистрация</span></Typography>
        </Fragment>
    )
}

export default LoginPage;
