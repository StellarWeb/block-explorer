export const getUrlInSearch = (request: string) => {
  const requestStr = request.split("0x").join("");
  if (requestStr.length === 40) {
    return "/address/" + requestStr;
  } else if (requestStr.length === 64) {
    if (/[0-9a-zA-Z]{64}?/.test(requestStr)) {
      return "/txs/0x" + requestStr;
    } else if (/[0-9]{1,7}?/.test(requestStr)) {
      return "/block/" + requestStr;
    }
  } else if (parseInt(requestStr) > 0) {
    return "/block/" + requestStr;
  } else {
    return "/";
  }
};
