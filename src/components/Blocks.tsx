import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useWeb3 from "../hooks/useWeb3";

const Blocks = (): React.ReactElement => {
  const { web3 } = useWeb3();
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      try {
        const blockNumber = await web3?.eth.getBlockNumber();
        if (blockNumber === undefined) {
          return;
        }
        // console.log(blockNumber);
        let blocks = [];
        const count = blockNumber > 20 ? 20 : blockNumber;
        // console.log(count)
        for (var i = 0; i < count; i++) {
          const block = await web3?.eth.getBlock(blockNumber - i);
          // console.log(block)
          if (block !== undefined) {
            blocks.push(block);
          }
        }
        setBlocks(blocks);
        // console.log(blocks);
      } catch (e) {
        console.error("Unable to get blocks");
      }
    };
    getBlocks();
  }, [web3]);

  return (
    <section className="container">
      <Fragment>
        <br />
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Block Number</th>
              <th>Tx Hash</th>
              <th>Size</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {blocks !== undefined && blocks.length > 0 ? (
              blocks.map((tx) => (
                <tr key={tx.number}>
                  <td>
                    <Link to={`/block/${tx.number}`}>{tx.number}</Link>
                  </td>
                  <td>{tx.hash}</td>
                  <td>{tx.size}</td>
                  <td>{tx.timestamp}</td>
                </tr>
              ))
            ) : (
              <h4>No blocks found...</h4>
            )}
          </tbody>
        </table>
      </Fragment>
    </section>
  );
};

export default Blocks;
