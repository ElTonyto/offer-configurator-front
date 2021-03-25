import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Home from "../components/home/Home"

import Catalogs from "../components/catalogs/Catalogs"
import EditCatalog from "../components/catalogs/EditCatalog"

import Offers from "../components/offers/Offers"
import EditOffer from "../components/offers/EditOffer"

import Products from "../components/products/Products"
import EditProduct from "../components/products/EditProduct"


const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/catalogs/add" component={EditCatalog} />
        <Route exact path="/catalogs/:id" component={EditCatalog} />
        
        <Route exact path="/offers/add" component={EditOffer} />
        <Route exact path="/offers/:id" component={EditOffer} />
    
        <Route exact path="/products/add" component={EditProduct} />
        <Route exact path="/products/:id" component={EditProduct} />

        <Route exact path="/catalogs" component={Catalogs} />
        <Route exact path="/offers" component={Offers} />
        <Route exact path="/products" component={Products} />

        <Route exact path="/" component={Home} />
        <Redirect to="/" />
    </Switch>
)

export default Routes
