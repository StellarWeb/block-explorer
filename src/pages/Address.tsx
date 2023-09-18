import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useWeb3 from "../hooks/useWeb3";

const Address = (): React.ReactElement => {
  const { web3 } = useWeb3();
  const [balance, setBalance] = useState<any>();
  const [balanceInEther, setBalanceInEther] = useState<any>();
  const { address } = useParams();

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (address === undefined) {
          return;
        }

        const balance = await web3?.eth.getBalance(address);
        if (balance === undefined) {
          return;
        }
        setBalance(balance);
        console.log(balance);
        const balanceInEther = await web3?.utils.fromWei(balance, "ether");
        if (balanceInEther === undefined) {
          return;
        }
        setBalanceInEther(balanceInEther);
        console.log(balanceInEther);
      } catch (e) {
        console.error("Unable to get blocks");
      }
    };
    getBalance();
  }, [web3, address]);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h1>
        Address
        <small>View information about an Ethereum Address</small>
      </h1>

      <div id="address-97785883" className="addressdiv">
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>
                {address} <span className="pull-right"></span>
              </th>
            </tr>
          </tbody>
        </table>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>Balance (Wei)</td>
              <td>{balance}</td>
            </tr>
            <tr>
              <td>Balance (Ether)</td>
              <td>{balanceInEther}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Address;
