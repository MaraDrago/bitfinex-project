import React from "react";
import TableRow from "./TableRow";

const SymbolsTable = ({ symbolsData }: { symbolsData: any[] }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Change</th>
          <th scope="col">Change Percent</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
        </tr>
      </thead>
      <tbody>
        {symbolsData.map((symbol, index) => (
          <TableRow key={index} name={symbol.name} symbol={symbol.data} />
        ))}
      </tbody>
    </table>
  );
};

export default SymbolsTable;
