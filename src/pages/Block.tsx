import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Transactions from "../components/Transactions";
import useWeb3 from "../hooks/useWeb3";

const Block = (): React.ReactElement => {
  const { web3 } = useWeb3();
  const [block, setBlock] = useState<any>();
  const { blockNumber } = useParams();

  useEffect(() => {
    const getBlock = async () => {
      try {
        if (blockNumber === undefined) {
          return;
        }

        const block = await web3?.eth.getBlock(blockNumber);
        setBlock(block);
        console.log(block);
      } catch (e) {
        console.error("Unable to get blocks");
      }
    };
    getBlock();
  }, [web3, blockNumber]);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h1>
        Block
        <small>View information about an Ethereum Block</small>
      </h1>
      {block !== undefined && blockNumber !== undefined ? (
        <div>
          <div id="block-97785883" className="blockdiv">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>
                    {block.hash}
                    <span className="pull-right"></span>
                  </th>
                </tr>
              </tbody>
            </table>
            <div>
              <button className="btn btn-success cb">
                <span>{block.gasUsed} Gas Used</span>
              </button>
            </div>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Summary</th>
                </tr>
                <tr>
                  <td>Block Number</td>
                  <td>{blockNumber}</td>
                </tr>
                <tr>
                  <td>Received Time</td>
                  <td>{block.timestamp}</td>
                </tr>
                <tr>
                  <td>Difficulty</td>
                  <td>{block.difficulty}</td>
                </tr>
                <tr>
                  <td>Nonce</td>
                  <td>{block.nonce}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{block.size}</td>
                </tr>
                <tr>
                  <td>Miner</td>
                  <td>
                    <Link to={`/address/${block.miner}`}>{block.miner}</Link>
                  </td>
                </tr>
                <tr>
                  <td>Gas Limit</td>
                  <td>{block.gasLimit}</td>
                </tr>
                <tr>
                  <td>Data</td>
                  <td>{block.extraData}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>
            Transactions
            <small>contained in current block</small>
          </h2>
          <Transactions txIds={block.transactions} />
        </div>
      ) : (
        <h4>No block found...</h4>
      )}
    </div>
  );
};

export default Block;
