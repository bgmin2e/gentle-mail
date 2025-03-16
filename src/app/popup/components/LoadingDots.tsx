import React, { useState, useEffect } from "react";

export const LoadingDots: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const [loadingDots, setLoadingDots] = useState<string>(".");

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots((dots) => (dots.length >= 3 ? "." : dots + "."));
      }, 300);
    } else {
      setLoadingDots(".");
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return <div>{loadingDots}</div>;
};
