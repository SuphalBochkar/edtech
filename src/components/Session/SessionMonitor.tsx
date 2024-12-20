"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionExpiredModal } from "./SessionExpiredModal";
import { checkSessionValidity } from "@/actions/sessionActions";

export function SessionMonitor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const sessionCheckerRef = useRef<NodeJS.Timeout>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      if (status === "authenticated" && session?.user?.id) {
        try {
          const { valid } = await checkSessionValidity();

          if (!valid) {
            setShowModal(true);
            await signOut({ redirect: false });
          }
        } catch (error) {
          console.error("Error checking session:", error);
        }
      }
    };

    // Initial check
    checkSession();

    // Set up interval for subsequent checks
    sessionCheckerRef.current = setInterval(checkSession, 20000);

    return () => {
      if (sessionCheckerRef.current) {
        clearInterval(sessionCheckerRef.current);
      }
    };
  }, [session, status]);

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    showModal && (
      <SessionExpiredModal isOpen={true} onClose={handleModalClose} />
    )
  );
}
