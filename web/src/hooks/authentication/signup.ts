import { useState } from "react";

async function apiSignUp(
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string,
    setLoading: (loading: boolean) => void,
    setSignedUp: (signedUp: boolean) => void,
    setError: (error: any) => void
) {
    setLoading(true);
    setSignedUp(false);
    setError(undefined);

    try {
        const response = await fetch(`/api/server/authentication/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                confirmPassword: confirmPassword,
                email: email,
                firstName: firstName,
                lastName: lastName,
                custom: {
                    baseURL: `${window.location.origin}/authentication/verify`,
                    URL: `${window.location.origin}/authentication/verify?username=:username&id=:id`,
                },
            }),
        });

        const result = await (async () => {
            try {
                return await response.json();
            } catch (e) {
                return "unknownErrorStatus";
            }
        })();

        setLoading(false);

        if (response.status !== 200) {
            return setError(result);
        }

        return setSignedUp(true);
    } catch (err) {
        setLoading(false);

        console.error(err);

        err = "serviceUnavailableStatus";

        return setError(err);
    }
}

export function useSignUp() {
    const [loading, setLoading] = useState(false);
    const [signedUp, setSignedUp] = useState(false);
    const [error, setError] = useState<String>(); /* TODO: Use an error classe */

    const signUp = async (
        username: string,
        password: string,
        confirmPassword: string,
        email: string,
        firstName: string,
        lastName: string
    ) => {
        await apiSignUp(
            username,
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
            setLoading,
            setSignedUp,
            setError
        );
    };

    return { loading, signedUp, error, signUp };
}
