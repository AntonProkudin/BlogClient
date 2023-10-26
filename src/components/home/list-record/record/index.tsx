import React, {useEffect, useState} from 'react';
import {IPublicRecord} from "../../../../common/types/record/record";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    TextField,
    Typography
} from "@mui/material";
import {useAppSelector} from "../../../../utils/hook";
import {useAuthInstance} from "../../../../utils/axios";
import {useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CardRecord: React.FC<IPublicRecord> = ({ id,authorId,recordName,recordText ,timeCreated,setIsClick,recordAuthor}) => {
    const user = useAppSelector(state =>state.auth.user)
    const api = useAuthInstance()
    const navigate = useNavigate()
    const isVisible = ():string=>{
        if(user.role === "admin"|| user.id === authorId)
            return "block"
        return "none"
    }
    const delRecord = async () => {
        try {
            const response = await api.delete("/api/Record?id="+id) // Замените URL на ваш адрес API
            setIsClick("true")
        } catch (error) {
            console.error('Ошибка запроса:', error)
        }
    };
    return (
        <Card sx={{ width:"60%" , mb:10,ml:"20%"}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recordName}
                    </Typography>
                    <ReactMarkdown>{recordText.slice(0, 200)+"..."}</ReactMarkdown>

                    <Typography variant="body2" color="text.secondary">
                        {recordAuthor+" : "+ timeCreated.slice(0, 19).replace("T"," / ")}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" onClick={()=>navigate("/about/:{"+id+"}")}>
                    <Typography variant="body2" color="text.secondary">
                        Подробнее
                    </Typography>
                </Button>
                <Button onClick={delRecord} size="small" sx={{display:isVisible()}}>
                    <Typography variant="body2" color="text.secondary">
                        Удалить
                    </Typography>
                </Button>
                <Button size="small" onClick={()=>navigate("/change/:{"+id+"}")} sx={{display:isVisible()}}>
                    <Typography variant="body2" color="text.secondary">
                        Редактировать
                    </Typography>
                </Button>
            </CardActions>
        </Card>



     //   <Box>
     //       <Typography  variant="h2"  fontFamily="Poppins" textAlign="center">{recordName}</Typography>
     //       <Typography  variant="body1" marginBottom={3} fontFamily="Poppins" textAlign="center">{recordText}</Typography>
     //       <Button      type="submit" variant="contained" sx={{fontFamily:"Poppins",marginBottom: 2, marginTop: 2, width:'60%'}}>Развернуть</Button>
     //       <Typography  variant="body1" sx={{fontFamily:"Poppins"}}>{authorId+" "+timeCreated}</Typography>
     //   </Box>
    );
};

export default CardRecord;