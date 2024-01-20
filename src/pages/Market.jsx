import React, { useEffect, useRef } from "react";

const Market = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      title: "Hisseler",
      tabs: [
        {
          title: "Endeks",
          symbols: [
            {
              s: "FOREXCOM:SPXUSD",
              d: "S&P 500",
            },
            {
              s: "FOREXCOM:NSXUSD",
              d: "US 100",
            },
            {
              s: "FOREXCOM:DJI",
              d: "Dow 30",
            },
            {
              s: "INDEX:NKY",
              d: "Nikkei 225",
            },
            {
              s: "INDEX:DEU40",
              d: "DAX Index",
            },
            {
              s: "FOREXCOM:UKXGBP",
              d: "UK 100",
            },
          ],
          originalTitle: "Indices",
        },
        {
          title: "Vadeli",
          symbols: [
            {
              s: "CME_MINI:ES1!",
              d: "S&P 500",
            },
            {
              s: "CME:6E1!",
              d: "Euro",
            },
            {
              s: "COMEX:GC1!",
              d: "Gold",
            },
            {
              s: "NYMEX:CL1!",
              d: "WTI Crude Oil",
            },
            {
              s: "NYMEX:NG1!",
              d: "Gas",
            },
            {
              s: "CBOT:ZC1!",
              d: "Corn",
            },
          ],
          originalTitle: "Futures",
        },
        {
          title: "Tahvil",
          symbols: [
            {
              s: "CBOT:ZB1!",
              d: "T-Bond",
            },
            {
              s: "CBOT:UB1!",
              d: "Ultra T-Bond",
            },
            {
              s: "EUREX:FGBL1!",
              d: "Euro Bund",
            },
            {
              s: "EUREX:FBTP1!",
              d: "Euro BTP",
            },
            {
              s: "EUREX:FGBM1!",
              d: "Euro BOBL",
            },
          ],
          originalTitle: "Bonds",
        },
        {
          title: "Döviz",
          symbols: [
            {
              s: "FX:USDTRY",
              d: "EUR to TR",
            },
            {
              s: "FX:GBPUSD",
              d: "GBP to USD",
            },
            {
              s: "FX:USDJPY",
              d: "USD to JPY",
            },
            {
              s: "FX:USDCHF",
              d: "USD to CHF",
            },
            {
              s: "FX:AUDUSD",
              d: "AUD to USD",
            },
            {
              s: "FX:USDCAD",
              d: "USD to CAD",
            },
          ],
          originalTitle: "Forex",
        },
      ],
      width: 1200,
      height: 800,
      showChart: true,
      showFloatingTooltip: false,
      locale: "en",
      plotLineColorGrowing: "#2962FF",
      plotLineColorFalling: "#2962FF",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      showSymbolLogo: true,
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
      colorTheme: "light",
    });
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current && containerRef.current.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container"
      style={{
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default Market;
