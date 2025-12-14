import { statusStyles } from "@/types/defaults";
import { PermitStatus } from "@/types/enums";

export default function StatusBadge({ status }: { status: PermitStatus }) {
  return (
    <span
      className={`${statusStyles[status as PermitStatus].bg} ${
        statusStyles[status as PermitStatus].contrastText
      } text-xs font-medium px-1.5 py-0.5 rounded`}
    >
      {status}
    </span>
  );
}
