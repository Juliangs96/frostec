import { Helmet } from 'react-helmet-async'
import Banner from '../components/Banner'
import ItemListContainer from '../components/ItemListContainer'

function Home() {
  return (
    <>
      <Helmet>
        <title>Frostec Refrigeración | Heladeras, aires y lavarropas</title>
        <meta name="description" content="Venta, instalación y reparación de heladeras, aires acondicionados y lavarropas en Caseros, Buenos Aires." />
      </Helmet>
      <Banner />
      <ItemListContainer titulo="Nuestros productos" />
    </>
  )
}

export default Home
