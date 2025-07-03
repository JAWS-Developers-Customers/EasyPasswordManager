// loadingContext.tsx

import { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';
import { LoadingScreenGlobal } from '../screens/other/LoadingScreen';
import { lastExecutiondata } from '../api/api.base';
import { LoadingContextProps } from '../types/loadingContext.types';

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

interface LoadingProviderProps {
    children: ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [globalLoading, setGlobalLoading] = useState<boolean>(false);
    const loadingTimeoutRef = useRef<NodeJs.Timeout | undefined>();
    const [percentage, setPercentage] = useState<string>("");
    const [addInfo, setAddInfo] = useState<string>("");

    const setLoadingStatus = (status: boolean, timeout = true, percentage = "", addInfo = "") => {
        if (status && timeout) {
            // Cancella eventuali timeout attivi prima di impostarne uno nuovo
            if (loadingTimeoutRef) {
                clearTimeout(loadingTimeoutRef.current);
            }

            // Imposta un nuovo timeout
            const timeoutId = setTimeout(() => {
                window.location.href = `/500?process_id=${lastExecutiondata.request_id}&error_code=${lastExecutiondata.error_code}`;
            }, 10000);

            loadingTimeoutRef.current = timeoutId;
        } else {
            // Cancella il timeout esistente se presente
            if (loadingTimeoutRef) {
                clearTimeout(loadingTimeoutRef.current);
            }
        }

        // Imposta lo stato di caricamento
        /*setTimeout(() => {
            if(!status) {*/
        setGlobalLoading(status);
        setPercentage(percentage);
        setAddInfo(addInfo)
        /* }
     }, status ? 0 : 200);*/
    }

    return (
        <LoadingContext.Provider value={{ setLoadingStatus, loading: globalLoading, percentage }}>
            {globalLoading && <LoadingScreenGlobal percentage={percentage} addInfo={addInfo} />}
            <div style={{ display: globalLoading ? "none" : "block" }}>
                {children}
            </div>
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;