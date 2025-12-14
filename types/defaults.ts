import { FacilityType, PermitStatus } from "@/types/enums";
import { QuestionMarkCircleIcon, ShoppingCartIcon, TruckIcon } from "@heroicons/react/24/solid";

export const statusStyles: Record<PermitStatus, { bg: string; fill: string; text: string; contrastText: string }> = {
  [PermitStatus.APPROVED]: {
    bg: "bg-green-600",
    fill: "fill-green-600",
    text: "text-green-600",
    contrastText: "text-white",
  },
  [PermitStatus.REQUESTED]: {
    bg: "bg-emerald-500",
    fill: "fill-emerald-500",
    text: "text-emerald-500",
    contrastText: "text-white",
  },
  [PermitStatus.EXPIRED]: { bg: "bg-red-400", fill: "fill-red-400", text: "text-red-400", contrastText: "text-white" },
  [PermitStatus.SUSPEND]: {
    bg: "bg-yellow-400",
    fill: "fill-yellow-400",
    text: "text-yellow-400",
    contrastText: "text-gray-800",
  },
  [PermitStatus.ISSUED]: {
    bg: "bg-teal-500",
    fill: "fill-teal-500",
    text: "text-teal-500",
    contrastText: "text-white",
  },
};

export const typeIcons: Record<FacilityType, typeof TruckIcon> = {
  [FacilityType.TRUCK]: TruckIcon,
  [FacilityType.CART]: ShoppingCartIcon,
  [FacilityType.OTHER]: QuestionMarkCircleIcon,
};
