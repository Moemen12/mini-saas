export type SignupFields = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export type SignupActionState = {
    error: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        server?: string;
    } | null;
    fields: SignupFields;
    success: boolean;
};

export type SigninFields = {
    email?: string;
    password?: string;
};

export type SigninActionState = {
    error: {
        email?: string[];
        password?: string[];
        server?: string;
    } | null;
    fields: SigninFields;
    success: boolean;
};