import React, {Fragment, useState} from 'react';
import {
    Box,
    Button, Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import {useNavigate} from "react-router-dom";
import './style.scss'
import {useAppSelector} from "../../../utils/hook";
import {useAuthInstance} from "../../../utils/axios";
import {IPublicRecordCreate} from "../../../common/types/record/record";

const CreateRecordPage:React.FC = (props:any): JSX.Element =>{
    const [title, setTitle] = useState('')
    const [field, setField] = useState('')
    const user = useAppSelector(state =>state.auth.user)
    const navigate = useNavigate()
    const api = useAuthInstance()
    const handleSubmit = async (e:{preventDefault:() => void;})=> {
        e.preventDefault()
            try {
                const recordData = {
                    authorId: user.id,
                    recordName: title,
                    recordText: field,
                }
                const response = await api.post('/api/Record',recordData) // Замените URL на ваш адрес API
                console.log(response)
                navigate("/")
            } catch (error) {
                console.error('Ошибка при получении данных:', error)
            }

    }
    return(
        <div className={'root'}>
            <form className="form" onSubmit={handleSubmit}>
                <Card sx={{ width:"60%" , mb:10,ml:"20%"}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
                        />
                        <CardContent>
                            <TextField   type="text" margin="normal" fullWidth={true}  label="Заголовок" variant="outlined" placeholder="Введите заголовок записи" onChange={(e) => setTitle(e.target.value)}/>
                            <TextField
                                onChange={(e) => setField(e.target.value)}
                                fullWidth={true}
                                variant="outlined"
                                margin="normal"
                                label="Содержимое"
                                placeholder="Введите содержимое записи"
                                multiline
                                maxRows={4}
                            />
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button      type="submit" variant="contained" sx={{fontFamily:"Poppins",marginBottom: 2, marginTop: 2, width:'60%'}}>Создать</Button>
                        <Typography  variant="body1" sx={{ml:"10",fontFamily:"Poppins"}}><span className="incitingText" onClick={()=>navigate("/")}>Вернуться назад</span></Typography>
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}
export default CreateRecordPage;