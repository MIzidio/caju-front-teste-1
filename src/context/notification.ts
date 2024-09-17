import { createContext, useContext } from "react";

export interface NotificationProps {
  message: string;
  type: "success" | "error";
}

interface NotificationContextType {
  setNotification: ({ message, type}: NotificationProps) => void
}

export const NotificationContext = createContext<NotificationContextType>({
  setNotification: () => {}
});

export const useNotification = (): NotificationContextType => {
  const { setNotification } = useContext(NotificationContext);
  return { setNotification };
};