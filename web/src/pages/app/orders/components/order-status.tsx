type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

interface StatusStyle {
  text: string;
  color: string;
}

const orderStatusMap: Record<OrderStatus, StatusStyle> = {
  pending: { text: "Pendente", color: "bg-slate-400" },
  processing: { text: "Em preparo", color: "bg-amber-400" },
  delivering: { text: "Em entrega", color: "bg-amber-400" },
  delivered: { text: "Entregue", color: "bg-emerald-500" },
  canceled: { text: "Cancelado", color: "bg-rose-500" },
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
      />
      <span className="text-muted-foreground font-medium">
        {orderStatusMap[status].text}
      </span>
    </div>
  );
}
