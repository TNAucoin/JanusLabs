import React, { useCallback, useMemo } from 'react';
import axios from 'axios';

const JanusContext = React.createContext({});

export const JanusProvider = ({ children }) => {
  const jc = useMemo(
    () =>
      axios.create({
        baseURL: 'http://localhost:8001/api/v1',
        timeout: 1000,
      }),
    []
  );
  const createJob = useCallback(async priority => {
    return await jc.post('/job', { priority });
  }, []);

  return (
    <JanusContext.Provider value={{ createJob }}>
      {children}
    </JanusContext.Provider>
  );
};

export const useJanus = () => React.useContext(JanusContext);
