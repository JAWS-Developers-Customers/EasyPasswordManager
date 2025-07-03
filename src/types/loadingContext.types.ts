export type LoadingContextProps = {
    setLoadingStatus: (status: boolean, timeout?: boolean, percentage?: string, addInfo?: string) => void;
    loading: boolean;
    percentage: string;
};