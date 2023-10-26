import React, {Fragment} from 'react';
import {IPropsRegister} from "../../../common/types/auth/auth";
import {Button, TextField, Typography} from "@mui/material";

const RegisterPage:React.FC<IPropsRegister> = (props: IPropsRegister): JSX.Element =>{
    const{setPassword, setEmail, setRepeatPassword, setLastName, setFirstName, navigate} = props
    return(
        <Fragment>
            <Typography  variant="h2"  fontFamily="Poppins" textAlign="center">Регистрация</Typography>
            <Typography  variant="body1" marginBottom={3} fontFamily="Poppins" textAlign="center">Введите данные для регистрации</Typography>
            <TextField  type="email" margin="normal" fullWidth={true}  label="Email" variant="outlined" placeholder="Введите ваш email" onChange={(e) => setEmail(e.target.value)}/>
            <TextField margin="normal" fullWidth={true} label="Имя" variant="outlined" placeholder="Введите ваше имя" onChange={(e) => setFirstName(e.target.value)}/>
            <TextField margin="normal" fullWidth={true} label="Фамилия" variant="outlined" placeholder="Введите вашу фамилию" onChange={(e) => setLastName(e.target.value)}/>
            <TextField type="password" margin="normal" fullWidth={true} label="Пароль" variant="outlined" placeholder="Введите ваш пароль" onChange={(e) => setPassword(e.target.value)}/>
            <TextField type="password" margin="normal" fullWidth={true} label="Повторите пароль" variant="outlined" placeholder="Повторите ваш пароль" onChange={(e) => setRepeatPassword(e.target.value)}/>
            <Button type="submit" variant="contained" sx={{fontFamily:"Poppins",marginBottom: 2, marginTop: 2, width:'60%'}}>Регистрация</Button>
            <Typography  variant="body1" sx={{fontFamily:"Poppins"}}>У вас есть аккаунт?<span className="incitingText" onClick={()=>navigate("/login")}>Войти</span></Typography>
        </Fragment>

    )
};

export default RegisterPage;