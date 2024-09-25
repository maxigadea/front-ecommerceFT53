import { IErrorsProps, ILoginProps, IRegisterErrors, IRegisterProps } from "@/interfaces/types";

export function validateLoginForm(values: ILoginProps) {
    const errors: IErrorsProps = {}

    if(values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    }

    return errors;
};

export function validateRegisterForm(values: IRegisterProps) {
    const errors: IRegisterErrors = {}

    if(values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    }

    return errors;
};