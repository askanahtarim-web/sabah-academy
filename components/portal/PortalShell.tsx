"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "@/components/portal/Dashboard";
import LoginForm from "@/components/portal/LoginForm";
import { EASE } from "@/lib/motion";

export default function PortalShell() {
  // Session lives in component state only — there is no auth backend here.
  const [email, setEmail] = useState<string | null>(null);

  return (
    <AnimatePresence mode="wait">
      {email === null ? (
        <motion.div
          key="login"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <LoginForm onLogin={setEmail} />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <Dashboard email={email} onLogout={() => setEmail(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
