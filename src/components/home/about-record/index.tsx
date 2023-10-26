import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IPublicRecord} from "../../../common/types/record/record";
import {useAuthInstance} from "../../../utils/axios";
import ReactMarkdown from 'react-markdown';
import "./style.css";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia, Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import {IPublicComment} from "../../../common/types/comment/comment";
import CardRecord from "../list-record/record";
import CommentComponent from "./comment";
import {useAppSelector} from "../../../utils/hook";

const AboutRecordPage = () => {
    const params = useParams();
    const recordId = params.id?.replace("{","").replace("}","").replace(":","");
    const [text, setText] = useState<string>("");
    const [data, setData] = useState<IPublicRecord>();
    const [dataComm, setDataComm] = useState<IPublicComment[]>([]);// Стейт для хранения данных из API
    const api = useAuthInstance()
    const [isClick, setIsClick] = useState('false');
    const user = useAppSelector(state =>state.auth.user)

    const handleSubmit = async (e:{preventDefault:() => void;})=> {
        e.preventDefault()
        try {
            const commentData = {
                forRecordId: recordId,
                fromUserId: user.id,
                text: text,
            }
            const response = await api.post('/api/Comment',commentData) // Замените URL на ваш адрес API
            setIsClick("")
            setText("")
            console.log(response)
        } catch (error) {
            console.error('Ошибка при получении данных:', error)
        }

    }

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
        const getComment = async () => {
            try {
                const response = await api.get('/api/Comment?idRecord='+recordId) // Замените URL на ваш адрес API
                //console.log('/api/Record/One/?id='+recordId)
                setDataComm(response.data.comments); // Устанавливаем данные из ответа в стейт
                console.log(response)
                  setIsClick("1")
            } catch (error) {
                console.error('Ошибка при получении данных:', error)
            }
        }
        getRecord();
        getComment();// Вызываем функцию для получения данных при монтировании компонента
    }, [isClick]);
    return (
        <div className="card-list" >
        <Card sx={{ width:"60%" , mb:10,ml:"20%"}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {data?.recordName}
                    </Typography>
                    <ReactMarkdown>{data?.recordText}</ReactMarkdown>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Typography ml={1} variant="body1" color="text.secondary">
                    {data?.recordAuthor+" : "+ data?.timeCreated.slice(0, 19).replace("T"," / ")}
                </Typography>
            </CardActions>
        </Card>

                {dataComm.map((item, index) => (
                    <CommentComponent
                        id={item.id}
                        key={item.id} // Важно добавить ключ для каждой карточки
                        forRecordId={item.forRecordId}
                        fromUserId={item.fromUserId}
                        text={item.text}
                        createdTime={item.createdTime}
                        authorComment={item.authorComment}
                        setIsClick={setIsClick}
                    />
                ))}

            <form onSubmit={handleSubmit}>
            <Card sx={{ width:"60%" , mb:10,ml:"20%"}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div">
                            Оставьте свой комментарий
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>

                    <TextField
                        onChange={(e) => setText(e.target.value)}
                        fullWidth={true}
                        variant="outlined"
                        margin="normal"
                        label="Комментарий"
                        placeholder="Оставьте комментарий"
                        multiline
                        maxRows={4}
                    />
                    <IconButton type="submit" sx={{fontFamily:"Poppins"}}>
                        <CreateIcon/>
                    </IconButton>
                </CardActions>
            </Card>
            </form>
        </div>
    );
};

export default AboutRecordPage;