import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

export const AnimatedContainer = ({ children }: Props) => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      ease: 'easeInOut',
      duration: 0.3,
    }}
  >
    {children}
  </motion.main>
);
