import { motion } from "framer-motion";
import { useNotificationStore } from "../../../store/notification/notification.store";
import cn from "clsx";

export function Notification() {
  const { message, type } = useNotificationStore();

  return (
    !!message && (
      <motion.div
        className="fixed z-50 w-full h-full left-0 top-0 flex items-center justify-center bg-[#0A2A39]/70"
        initial={{ opacity: 0, zoom: 1 }}
        animate={{ opacity: 1, zoom: 1.1 }}
        exit={{opacity: 0, zoom: 1}}
        transition={{duration: 0.5,}}
      >
        <div
          className={cn(
            "py-3 px-4 top-4 right-4 w-max text-xl shadow-2xl rounded-lg text-white",
            {
              "bg-gradient-to-b from-[#011F08] to-[#079933]": type === "win",
              "bg-gradient-to-b from-[#69040D] to-[#C90819]": type === "lose",
              "bg-gradient-to-b from-primary-top to-primary-bottom":
                type === "info",
            },
          )}
        >
          {message}
        </div>
      </motion.div>
    )
  );
}
