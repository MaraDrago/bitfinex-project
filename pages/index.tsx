import Head from "next/head";
import React, { useEffect, useState } from "react";
import SymbolsTable from "../components/SymbolsTable";

interface SingleSymbolData {
  name: string;
  data: number[];
}

const Home = ({ tFirstFiveSymbols }: { tFirstFiveSymbols: string[] }) => {
  const [symbolsData, setSymbolsData] = useState<SingleSymbolData[]>([]);

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const pairChannelIds: any = {};
    const symbolsDataResponse: SingleSymbolData[] = [];

    if (isBrowser) {
      const webSocketConnection = new WebSocket(
        "wss://api-pub.bitfinex.com/ws/2"
      );
      webSocketConnection.onmessage = function (event) {
        const response = JSON.parse(event.data);
        // On subscribe to symbol
        if (response.event === "subscribed") {
          // Assign websocket channel id to symbol
          pairChannelIds[response.chanId] = response.pair;
        }

        // On data received from any channel (not event and not hb)
        if (!response.event && response[1] !== "hb") {
          const name = pairChannelIds[response[0]];
          const data = response[1];
          const symbolDataIndex = symbolsDataResponse.findIndex(
            (symbol: any) => symbol.name === name
          );
          if (symbolDataIndex === -1) {
            symbolsDataResponse.push({
              name,
              data,
            });
          } else {
            symbolsDataResponse[symbolDataIndex] = {
              name,
              data,
            };
          }
          setSymbolsData([...symbolsDataResponse]);
        }
      };

      webSocketConnection.onopen = function (event) {
        tFirstFiveSymbols.forEach((symbol: string) => {
          const message = JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol,
          });
          webSocketConnection.send(message);
        });
      };
    }
  }, [tFirstFiveSymbols]);

  return (
    <div>
      <Head>
        <title>Symbols</title>
        <meta name="description" content="Symbols" />
      </Head>
      <SymbolsTable symbolsData={symbolsData} />
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch("https://api.bitfinex.com/v1/symbols");
  const symbols = await response.json();
  const firstFiveSymbols = symbols.slice(0, 5);
  let prefix = "t";
  const tFirstFiveSymbols = firstFiveSymbols.map(
    (symbol: string) => prefix + symbol.toUpperCase()
  );

  return {
    props: {
      tFirstFiveSymbols,
    },
  };
}

export default Home;
