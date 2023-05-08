import { ShopLayout } from "@/components/layout";
import { Typography } from "@mui/material";
import type { NextPage } from "next";

import { ProductList } from "@/components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "@/components/ui";



const Home: NextPage = () => {

  const { products, isLoading } = useProducts('products')

  return (
    <ShopLayout
      title={"Teslo Shop - Home"}
      pageDescription={"Encuentra los mejores precios en la tienda de tesla"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {
        isLoading ? <FullScreenLoading/> : <ProductList products={products} />
      }

    </ShopLayout >
  );
};

export default Home;
