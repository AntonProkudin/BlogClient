import React from 'react';
import Home from './components/home'
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from "./utils/router/privateRoute";
import AuthRootComponent from "./components/auth";
import {useMode, ColorModeContext} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import LayoutComponent from "./components/layout";
import CreateRecordPage from "./components/home/new-record";
import AboutRecordPage from "./components/home/about-record";
import ChangeRecordPage from "./components/home/change-record";

function App() {
    const [theme, colorMode] = useMode()
  return (
      <ColorModeContext.Provider value = {colorMode}>
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <LayoutComponent>
              <div className="App">
                  <Routes>
                      <Route element={<PrivateRoute/>}>
                          <Route path='/' element={<Home/>}/>
                          <Route path='create' element={<CreateRecordPage/>}/>
                          <Route path='about/:id' element={<AboutRecordPage/>}/>
                          <Route path='change/:id' element={<ChangeRecordPage/>}/>
                      </Route>
                      <Route path='login' element={<AuthRootComponent/>}/>
                      <Route path='register' element={<AuthRootComponent/>}/>
                  </Routes>
              </div>
          </LayoutComponent>
          </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
