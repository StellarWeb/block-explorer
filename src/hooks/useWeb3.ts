import { useEffect, useState } from "react";
import Web3 from "web3";

function useWeb3() {
  const [web3, setWeb3] = useState<Web3 | undefined>();

  useEffect(() => {
    const setWeb3Instance = async () => {
      const rpcUrl = "http://23.108.57.128:8545";
      const web3Instance = new Web3(rpcUrl);

      setWeb3(web3Instance);
    };
    setWeb3Instance();
  }, []);

  return {
    web3,
  };
}

export default useWeb3;
