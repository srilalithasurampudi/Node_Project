function processMessage(symbol, company, quantity) {
    symbol = symbol.trim();
    const stockLookupTable = {
      AAPL: { regularPrice: 100, abcIncPrice: 90, xyzIncPrice: 95 },
      IBM: { regularPrice: 120, abcIncPrice: 110, xyzIncPrice: 112 },
    };
    let result = -1;
    if (stockLookupTable.hasOwnProperty(symbol)) {
        if (company === "ABC Inc")
        result = stockLookupTable[symbol].abcIncPrice * quantity;
        else if (company === "XYZ Inc")
        result = stockLookupTable[symbol].xyzIncPrice * quantity;
        else {
            result = stockLookupTable[symbol].regularPrice * quantity;
        }
    } 
    return result;
  }
  
  module.exports = {
    processMessage,
  };
  