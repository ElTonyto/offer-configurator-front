import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Home from "../components/home/Home"

import Catalogs from "../components/catalogs/Catalogs"
import EditCatalog from "../components/catalogs/EditCatalog"
import AddCatalog from "../components/catalogs/AddCatalog"

import Offers from "../components/offers/Offers"
import EditOffer from "../components/offers/EditOffer"
import AddOffer from "../components/offers/AddOffer"

import Products from "../components/products/Products"
import EditProduct from "../components/products/EditProduct"
import AddProduct from "../components/products/AddProduct"


const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/catalogs" component={Catalogs} />
        <Route exact path="/catalogs/:id" component={EditCatalog} />
        <Route exact path="/catalogs/add" component={AddCatalog} />

        <Route exact path="/offers" component={Offers} />
        <Route exact path="/offers/:id" component={EditOffer} />
        <Route exact path="/offers/add" component={AddOffer} />

        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={EditProduct} />
        <Route exact path="/products/add" component={AddProduct} />

        <Redirect to="/" />
    </Switch>
)

export default Routes
