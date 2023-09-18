import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useWeb3 from "../hooks/useWeb3";

const Transaction = (): React.ReactElement => {
  const { web3 } = useWeb3();
  const [transaction, setTransaction] = useState<any>();
  const { txId } = useParams();

  useEffect(() => {
    const getTransaction = async () => {
      try {
        if (txId === undefined) {
          return;
        }

        const transaction = await web3?.eth.getTransaction(txId);
        setTransaction(transaction);
        console.log(transaction);
      } catch (e) {
        console.error("Unable to get blocks");
      }
    };
    getTransaction();
  }, [web3, txId]);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h1>
        Transaction
        <small>View information about an Ethereum transaction</small>
      </h1>

      {transaction !== undefined ? (
        <div id="tx-97785883" className="txdiv">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>
                  {transaction?.hash}
                  <span className="pull-right"></span>
                </th>
              </tr>
            </tbody>
          </table>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Summary</th>
              </tr>
              <tr>
                <td>Block Hash</td>
                <td>{transaction.blockHash}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{"Success"}</td>
              </tr>
              <tr>
                <td>Block</td>
                <td>
                  <Link to={`/block/${transaction.blockNumber}`}>
                    {transaction.blockNumber}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Timestamp</td>
                <td>{"Time"}</td>
              </tr>
              <tr>
                <td>From</td>
                <td>
                  <Link to={`/address/${transaction.from}`}>
                    {transaction.from}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>to</td>
                <td>
                  <Link to={`/address/${transaction.to}`}>
                    {transaction.to}
                  </Link>
                </td>
              </tr>
              <tr>
                <td>Value</td>
                <td>{transaction.value}</td>
              </tr>
              <tr>
                <td>Gas Used</td>
                <td>{transaction.gas}</td>
              </tr>
              <tr>
                <td>Gas Price</td>
                <td>{transaction.gasPrice}</td>
              </tr>
              <tr>
                <td>Nonce</td>
                <td>{transaction.nonce}</td>
              </tr>
              <tr>
                <td>Data</td>
                <td>{transaction.input}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Transaction Infos</div>
      )}
    </div>
  );
};

export default Transaction;
