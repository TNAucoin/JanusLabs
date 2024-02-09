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

  const enqueueJob = useCallback(async jobIds => {
    return await jc.post(`/enqueue`, { job_ids: jobIds, queue_partition: 1 });
  }, []);

  return (
    <JanusContext.Provider value={{ createJob, enqueueJob }}>
      {children}
    </JanusContext.Provider>
  );
};

export const useJanus = () => React.useContext(JanusContext);
