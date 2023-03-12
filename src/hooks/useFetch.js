import React, { useEffect, useState } from 'react';
function useFetch(URL) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [URL]);
  return { data, isLoading };
}

export default useFetch;
