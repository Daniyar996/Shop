import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Content from "../components/Content/Content";
import Home from "../components/Home";
import ModalProduct from "../components/ModalProduct/ModalProduct";
import HeaderShop from "../components/Header/Header";
import FooterPage from "../components/Footer/Footer";
import NotFound from "../components/NotFound/NotFound";

const AppRouter = () => {
    return (
        <Router>
            <HeaderShop/>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home} />
                <Route path="/content" component={Content} />
                <Route path="/modal_product/:id" component={ModalProduct} />
                <Route path="/new" component={Content} />
                <Route path="*" component={NotFound} />
            </Switch>
            <FooterPage/>
        </Router>
    );
};

export default AppRouter;
