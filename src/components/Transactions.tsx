import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useWeb3 from "../hooks/useWeb3";

const Transactions = ({ txIds }: any): React.ReactElement => {
  const { web3 } = useWeb3();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        if (txIds === undefined) {
          return;
        }
        let transactions = [];
        for (var i = 0; i < txIds.length; i++) {
          const transaction = await web3?.eth.getTransaction(txIds[i]);
          if (transaction !== undefined) {
            transactions.push(transaction);
          }
        }
        setTransactions(transactions);
        console.log(transactions);
      } catch (e) {
        console.error("Unable to get blocks");
      }
    };
    getTransactions();
  }, [web3, txIds]);

  return (
    <section className="container">
      <Fragment>
        <br />
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Tx Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Gas</th>
              <th>Input</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {transactions !== undefined && transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.number}>
                  <td>
                    <Link to={`/tx/${tx.hash}`}>{tx.hash}</Link>
                  </td>
                  <td>
                    <Link to={`/address/${tx.from}`}>{tx.from}</Link>
                  </td>
                  <td>
                    <Link to={`/address/${tx.to}`}>{tx.to}</Link>
                  </td>
                  <td>{tx.gas}</td>
                  <td>{tx.input}</td>
                  <td>{tx.value}</td>
                </tr>
              ))
            ) : (
              <h4>No transactions found...</h4>
            )}
          </tbody>
        </table>
      </Fragment>
    </section>
  );
};

export default Transactions;
