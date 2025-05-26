'use client';

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import Loading from "./loading";

export default function RootLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  
  // Track navigation changes
  useEffect(() => {
    // Start loading and hide content
    setIsLoading(true);
    
    // After loading completes, show content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            transition={{ duration: 0.001 }}
            className="fixed inset-0 z-50"
          >
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={pathname}
            transition={{ duration: 0.001 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}