// Trading pairs
// [
//   CHANNEL_ID,
//   [
//     BID,
//     BID_SIZE,
//     ASK,
//     ASK_SIZE,
//     DAILY_CHANGE, 4 (2)
//     DAILY_CHANGE_RELATIVE, 5 (3)
//     LAST_PRICE, 6 (1)
//     VOLUME,
//     HIGH,8 (4)
//     LOW 9 (5)
//   ]
// ]

import Link from "next/link";
import React from "react";

const TableRow = ({ symbol, name }: { symbol: number[]; name: string }) => {
  // Values are drawn from the Bitfinex websocket response map in the above comment
  const values = [symbol[6], symbol[4], symbol[5], symbol[8], symbol[9]];
  return (
    <tr>
      <td>
        <Link href={`/${name}`}>
          <a>{name}</a>
        </Link>
      </td>
      {values.map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  );
};

export default TableRow;
