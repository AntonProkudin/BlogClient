import React from 'react';
import {Box} from "@mui/material";
import './style.scss'
import ListRecordComponent from "./list-record";

const Home:React.FC = ():JSX.Element => {
    const items: string[] = ['Item 1', 'Item 2', 'Item 3'];
    return(
        <ListRecordComponent/>
    )
}

export default Home;
