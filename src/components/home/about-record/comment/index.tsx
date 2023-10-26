import React from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, IconButton, TextField, Typography} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import {IPublicRecord} from "../../../../common/types/record/record";
import {IPublicComment} from "../../../../common/types/comment/comment";
import {useAppSelector} from "../../../../utils/hook";
import {useAuthInstance} from "../../../../utils/axios";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const CommentComponent: React.FC<IPublicComment> = ({ id,forRecordId,fromUserId,text,createdTime,authorComment,setIsClick}) => {
    const user = useAppSelector(state =>state.auth.user)
    const api = useAuthInstance()
    const isVisible = ():string=>{
        if(user.role === "admin"|| user.id === fromUserId)
            return "block"
        return "none"
    }
    const delComm = async () => {
        try {
            const response = await api.delete("/api/Comment?id="+id) // Замените URL на ваш адрес API
            setIsClick("true")
        } catch (error) {
            console.error('Ошибка запроса:', error)
        }
    };
    return (
        <Card sx={{ width:"60%" , mb:10,ml:"20%"}}>
            <CardActionArea>
                <CardContent>
                    <Typography  variant="h5" color="text.secondary">
                        {" "+authorComment}
                    </Typography>
                    <Typography mt={3} ml={4}  variant="body2" color="text.secondary">
                        {text}
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Typography ml={2} gutterBottom variant="body1" component="div">
                    {createdTime.slice(0, 19).replace("T"," / ")}
                </Typography>
                <IconButton onClick={delComm} size="small" sx={{display:isVisible()}}>
                    <DeleteOutlineOutlinedIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default CommentComponent;