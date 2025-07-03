export interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string, session: string, association_id: number) => void;
    logout: () => void;
    changeAssociation: () => void;
    token: string;
    session_id: string;
    user: User;
    association: Association;
    associationRole: string;
    validatingSession: boolean;
    auth: { token: string, session_id: string }
}
export interface User {
    email: string;
    id: number;
    name: string;
    profile_picture: string;
    role: string[];
    status: boolean;
    surname: string;
}
export interface Association {
    id: number;
    name: string;
}