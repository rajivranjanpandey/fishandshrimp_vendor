"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginButton() {
    const currentPendingStatsRef = useRef(false);
    const { pending } = useFormStatus();
    useEffect(() => {
        if (currentPendingStatsRef.current === true && pending === false) {
            alert('Invalid credentials');
        }
        currentPendingStatsRef.current = pending;
    }, [pending])
    return (
        <input
            type="submit"
            disabled={pending}
            value={pending ? "Authenticating ..." : "Sign In"}
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
    )
}