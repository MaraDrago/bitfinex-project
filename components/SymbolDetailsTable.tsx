import React from "react";

const SymbolDetailsTable = ({ name, data }: { name: string; data: any }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Last Price</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{name}</td>
          <td>{data.last_price}</td>
          <td>{data.high}</td>
          <td>{data.low}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SymbolDetailsTable;
