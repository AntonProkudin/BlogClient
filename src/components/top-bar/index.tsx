import React, {useContext} from 'react';
import {useAppSelector} from "../../utils/hook";
import {ColorModeContext, tokens} from "../../theme";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import {AppBar, Box, Grid, IconButton, InputBase, Toolbar, Typography, useTheme} from "@mui/material";
import {LightMode, DarkMode, Search, MenuOutlined} from '@mui/icons-material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {useStyles} from "./styles";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import CreateIcon from '@mui/icons-material/Create';
import {useNavigate} from "react-router-dom";

const TopBarComponent = () => {
    const user = useAppSelector(state =>state.auth.user)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const navigate = useNavigate()
    const isVisible = ():string=>{
        if(user.role === "admin")
            return "block"
        return "none"
    }
    return (
        <Box width="100%" display="flex" justifyContent="space-between" px="32px" py="24px">
            <Grid>Привет, {user.firstName+" "+ user.lastName}</Grid>
            <Box display="flex">
                <IconButton onClick={()=>navigate("/create")} sx={{display:isVisible()}}>
                    <CreateIcon/>
                </IconButton>
                <Grid sx={{pr:"37px", borderRight:"1px solid" }}>
                    <IconButton onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === 'dark' ? (<DarkModeIcon/>):(<LightModeIcon/>)}
                    </IconButton>
                    <IconButton>
                        <NotificationsNoneIcon/>
                    </IconButton>
                </Grid>
                <Grid
                sx={{
                    display:"flex",
                    backgroundColor:`${colors.primary[600]}`,
                    borderRadius:"8px",
                    ml:"28px"
                }}>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <InputBase sx={{px:"18px", py:"12"}} placeholder="Поиск"/>
                </Grid>
            </Box>
        </Box>
    );
};

export default TopBarComponent;