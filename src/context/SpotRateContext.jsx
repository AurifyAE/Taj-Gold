// SpotRateContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const SpotRateContext = createContext();

export const SpotRateProvider = ({ children }) => {
  const [goldData, setGoldData] = useState({ bid: 0, ask: 0 });
  const [silverData, setSilverData] = useState({ bid: 0, ask: 0 });

  const calculateValues = (
    bid = 0,
    bidSpread = 0,
    askSpread = 0,
    offset = 0,
    precision = 2,
  ) => {
    const bidValue = Number(bid) + Number(bidSpread);
    const askValue = bidValue + Number(askSpread) + Number(offset);
    return {
      bid: bidValue.toFixed(precision),
      ask: askValue.toFixed(precision),
    };
  };

  const updateMarketData = (
    marketData,
    goldBidSpread = 0,
    goldAskSpread = 0,
    silverBidSpread = 0,
    silverAskSpread = 0,
  ) => {
    if (!marketData) {
      return;
    }

    const gold = marketData.Gold || marketData.GOLD || marketData.gold;
    const silver = marketData.Silver || marketData.SILVER || marketData.silver;

    if (gold && gold.bid) {
      const goldValues = calculateValues(
        gold.bid,
        goldBidSpread,
        goldAskSpread,
        0.5,
      );

      setGoldData({
        bid: goldValues?.bid,
        ask: goldValues?.ask,
        low: gold.low,
        high: gold.high,
      });
    }

    if (silver && silver.bid) {
      const silverValues = calculateValues(
        silver.bid,
        silverBidSpread,
        silverAskSpread,
        0.05,
        3,
      );

      setSilverData({
        bid: silverValues?.bid,
        ask: silverValues?.ask,
        low: silver.low,
        high: silver.high,
      });
    }
  };

  return (
    <SpotRateContext.Provider
      value={{ goldData, silverData, updateMarketData }}
    >
      {children}
    </SpotRateContext.Provider>
  );
};

export const useSpotRate = () => useContext(SpotRateContext);
