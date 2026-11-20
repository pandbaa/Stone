import { motion } from "framer-motion";
import { useNotificationStore } from "../../../store/notification/notification.store";
import cn from "clsx";

export function Notification() {
  const { message, type } = useNotificationStore();

  return (
    !!message && (
      <div className="fixed z-50 w-full left-0 top-0">
        <motion.div
          className={cn(
            "py-3 px-4 top-4 right-4 mx-auto w-max text-xl shadow-2xl rounded-lg text-white",
            {
              "bg-gradient-to-b from-[#011F08] to-[#079933]": type === "win",
              "bg-gradient-to-b from-[#69040D] to-[#C90819]": type === "lose",
              "bg-gradient-to-b from-primary-top to-primary-bottom":
                type === "info",
            },
          )}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          transition={{
            type: "spring" as const,
            stiffness: 150,
            damping: 20,
            mass: 2,
          }}
        >
          {message}
        </motion.div>
      </div>
    )
  );
}
