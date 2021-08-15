import Head from "next/head";
import SymbolDetailsTable from "../components/SymbolDetailsTable";

const Details = ({ name, data }: { name: string; data: any }) => {
  return (
    <div>
      <Head>
        <title>Symbol Details</title>
        <meta name="description" content="Symbol Details" />
      </Head>
      <SymbolDetailsTable name={name} data={data} />
    </div>
  );
};

export async function getServerSideProps({ params }: any) {
  // Fetch and parse symbol param
  const symbol: string = params.symbol;

  const response = await fetch(
    `https://api.bitfinex.com/v1/pubticker/${symbol}`
  );
  const data = await response.json();
  return {
    props: {
      name: symbol.toUpperCase(),
      data,
    },
  };
}

export default Details;
