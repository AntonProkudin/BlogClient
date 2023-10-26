import React, {Fragment, useEffect, useState} from 'react';
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
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../utils/hook";
import {useAuthInstance} from "../../../utils/axios";
import {IPublicRecord, IPublicRecordCreate} from "../../../common/types/record/record";

const ChangeRecordPage:React.FC = (props:any): JSX.Element =>{
    const params = useParams();
    const recordId = params.id?.replace("{","").replace("}","").replace(":","");
    const [title, setTitle] = useState('')
    const [field, setField] = useState('')
    const [data, setData] = useState<IPublicRecord>();
    const user = useAppSelector(state =>state.auth.user)
    const navigate = useNavigate()
    const api = useAuthInstance()

    useEffect(() => {
        // Функция для выполнения запроса к API
        const getRecord = async () => {
            try {
                const response = await api.get('/api/Record/One/?id='+recordId) // Замените URL на ваш адрес API
                // console.log('/api/Record/One/?id='+recordId)
                setData(response.data.record); // Устанавливаем данные из ответа в стейт
                // console.log(response)
                //  setIsClick("")
            } catch (error) {
                console.error('Ошибка при получении данных:', error)
            }
        }
        getRecord();
    }, []);



    const handleSubmit = async (e:{preventDefault:() => void;})=> {
        e.preventDefault()
        try {
            const recordData = {
                id: data?.id,
                authorId: data?.authorId,
                recordName: data?.recordName,
                recordText: field,
                timeCreated:data?.timeCreated,
                recordAuthor:"",
            }
            const response = await api.put('/api/Record',recordData) // Замените URL на ваш адрес API
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
                            <Typography>
                                {data?.recordName}
                            </Typography>
                            <TextField
                                defaultValue={data?.recordText}
                                onChange={(e) => setField(e.target.value)}
                                fullWidth={true}
                                variant="outlined"
                                margin="normal"
                                placeholder="Введите содержимое записи"
                                multiline
                                maxRows={4}
                            />
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button      type="submit" variant="contained" sx={{fontFamily:"Poppins",marginBottom: 2, marginTop: 2, width:'60%'}}>Обновить</Button>
                        <Typography  variant="body1" sx={{ml:"10",fontFamily:"Poppins"}}><span className="incitingText" onClick={()=>navigate("/")}>Вернуться назад</span></Typography>
                    </CardActions>
                </Card>
            </form>
        </div>
    )
}
export default ChangeRecordPage;