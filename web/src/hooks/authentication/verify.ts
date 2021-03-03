import { useState } from "react";
import {StatusError} from "@area-common/types";
import {serviceUnavailableStatus, unknownErrorStatus} from "../../constants/status";

async function apiVerify(
    username: string,
    id: string,
    setLoading: (loading: boolean) => void,
    setVerified: (verified: boolean) => void,
    setError: (error: any) => void
) {
    setLoading(true);
    setVerified(false);
    setError(undefined);

    try {
        const queries = `username=${username}&id=${id}`;
        const url = `/api/server/authentication/verify?${queries}`;
        const response = await fetch(url);

        const result = await (async () => {
            try {
                return await response.json();
            } catch (e) {
                return unknownErrorStatus;
            }
        })();

        setLoading(false);

        if (response.status !== 200) {
            return setError(result);
        }

        localStorage.setItem("jwt", result["data"]);

        return setVerified(true);
    } catch (err) {
        setLoading(false);

        console.error(err);

        err = serviceUnavailableStatus;

        return setError(err);
    }
}

export function useVerify() {
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<StatusError>();

    const verify = async (username: string, id: string) => {
        await apiVerify(username, id, setLoading, setVerified, setError);
    };

    return { loading, verified, error, verify };
}
