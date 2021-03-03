import { useApi } from "../api";

export function useSignIn() {
    const { data, error, fetch } = useApi();

    const signIn = (username: string, password: string) => {
        fetch(
            `/api/server/authentication/signin`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            },
            (data: any) => {
                localStorage.setItem("jwt", data["data"]);
            }
        );
    };

    return { signedIn: !!data, error, signIn };
}
