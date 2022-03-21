import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, NEXON_TMI_KEY } from 'constants/env';

const useAxios = <T>(
  url: string,
  params?: object,
): {
  result: T | null;
  loading: boolean;
  error: Error | null;
} => {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios({
          method: 'get',
          url: API_BASE_URL + url,
          data: params,
          headers: {
            Authorization: NEXON_TMI_KEY,
          },
        });
        setLoading(false);
        setResult(response.data);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };
    fetch();
  }, [url]);

  return { result, loading, error };
};
export default useAxios;
