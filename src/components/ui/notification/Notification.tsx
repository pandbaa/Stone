import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export function Notification({ children }: Props) {
  return (
    <div className="fixed z-50 w-full left-0 top-0">
      <motion.div
        className="py-4 px-4 top-4 right-4 mx-auto w-max text-2xl shadow-2xl bg-gradient-to-r from-primary-top to-primary-bottom text-white rounded-lg"
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        transition={{
          type: "spring" as const,
          stiffness: 150,
          damping: 20,
          mass: 2,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
