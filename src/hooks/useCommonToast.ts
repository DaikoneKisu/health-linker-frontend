import { useIonToast } from "@ionic/react";

/**
 * Provides an easy way to show toasts of a common format
 */
export function useCommonToast() {
  const [presentToast] = useIonToast();

  function showToast(message: string, status: "success" | "error") {
    presentToast({
      message,
      duration: 1500,
      position: "top",
      color: status === "success" ? "success" : "danger",
    });
  }

  return [showToast] as const;
}