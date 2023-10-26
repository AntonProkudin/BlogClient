import React, {useEffect, useState} from 'react';
import {IPublicRecord} from "../../../common/types/record/record";
import CardRecord from "./record";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {Grid, Typography} from "@mui/material";
import {instance, useAuthInstance} from "../../../utils/axios";
import {useAppSelector} from "../../../utils/hook";
import "./style.css";
const ListRecordComponent: React.FC = () => {
    const [data, setData] = useState<IPublicRecord[]>([]); // Стейт для хранения данных из API
    const api = useAuthInstance()
    const [isClick, setIsClick] = useState('false');
    useEffect(() => {
        // Функция для выполнения запроса к API
        const getRecords = async () => {
            try {
                const response = await api.get('/api/Record') // Замените URL на ваш адрес API
                setData(response.data.records); // Устанавливаем данные из ответа в стейт
                setIsClick("")
            } catch (error) {
                console.error('Ошибка при получении данных:', error)
            }
        };

        getRecords(); // Вызываем функцию для получения данных при монтировании компонента
    }, [isClick]);
    return (

        <div className="card-list" >
            {data.map((item, index) => (
                <CardRecord
                    setIsClick={setIsClick}
                    id={item.id}
                    key={item.id} // Важно добавить ключ для каждой карточки
                    authorId={item.authorId}
                    recordName={item.recordName}
                    recordText={item.recordText}
                    timeCreated={item.timeCreated}
                    recordAuthor={item.recordAuthor}
                />
            ))}
        </div>
    );
};

export default ListRecordComponent;