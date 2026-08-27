"use client";

import { useState } from "react";
import { Sparkles, Truck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SHIPMENTS, type Shipment } from "@/lib/mock/shipments";

type ColumnKey = "unassigned" | "planned" | "assigned" | "in_transit" | "delivered";

type DispatchCard = {
  id: string;
  customer: string;
  route: string;
  vehicle: string;
  driver: string;
  eta: string;
};

const COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: "unassigned", label: "Unassigned" },
  { key: "planned", label: "Planned" },
  { key: "assigned", label: "Assigned" },
  { key: "in_transit", label: "In Transit" },
  { key: "delivered", label: "Delivered" },
];

function mapStatusToColumn(status: Shipment["status"]): ColumnKey {
  switch (status) {
    case "draft":
    case "booked":
      return "unassigned";
    case "planned":
      return "planned";
    case "assigned":
    case "pickup":
      return "assigned";
    case "in_transit":
    case "delayed":
      return "in_transit";
    default:
      return "delivered";
  }
}

function toCard(s: Shipment): DispatchCard {
  return {
    id: s.id,
    customer: s.customer,
    route: `${s.origin} → ${s.destination}`,
    vehicle: s.vehicle,
    driver: s.driver,
    eta: s.eta,
  };
}

function initialBoard(): Record<ColumnKey, DispatchCard[]> {
  const board: Record<ColumnKey, DispatchCard[]> = {
    unassigned: [],
    planned: [],
    assigned: [],
    in_transit: [],
    delivered: [],
  };
  for (const s of SHIPMENTS) {
    if (s.status === "cancelled") continue;
    board[mapStatusToColumn(s.status)].push(toCard(s));
  }
  return board;
}

export default function DispatchBoardPage() {
  const [board, setBoard] = useState<Record<ColumnKey, DispatchCard[]>>(initialBoard);
  const [dragging, setDragging] = useState<{ id: string; from: ColumnKey } | null>(null);
  const [matching, setMatching] = useState<string | null>(null);

  function onDrop(target: ColumnKey) {
    if (!dragging) return;
    setBoard((prev) => {
      const card = prev[dragging.from].find((c) => c.id === dragging.id);
      if (!card) return prev;
      return {
        ...prev,
        [dragging.from]: prev[dragging.from].filter((c) => c.id !== dragging.id),
        [target]: [...prev[target], card],
      };
    });
    setDragging(null);
  }

  function aiMatch(card: DispatchCard) {
    setMatching(card.id);
    setTimeout(() => {
      setBoard((prev) => ({
        ...prev,
        unassigned: prev.unassigned.filter((c) => c.id !== card.id),
        assigned: [
          ...prev.assigned,
          { ...card, vehicle: card.vehicle !== "—" ? card.vehicle : "DE-4827", driver: card.driver !== "—" ? card.driver : "Markus Weber", eta: "17:25" },
        ],
      }));
      setMatching(null);
    }, 900);
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold">Dispatch Board</h1>
      <p className="mb-6 text-sm text-white/50">
        Drag shipments between stages, or use AI Match to assign vehicle and driver automatically.
      </p>

      <div className="grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-3 lg:grid-cols-5">
        {COLUMNS.map((col) => (
          <div
            key={col.key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(col.key)}
            className="min-w-[220px] rounded-xl border border-white/10 bg-white/[0.02] p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-white/50">{col.label}</h2>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/50">
                {board[col.key].length}
              </span>
            </div>

            <div className="space-y-2">
              {board[col.key].map((card) => (
                <Card
                  key={card.id}
                  draggable
                  onDragStart={() => setDragging({ id: card.id, from: col.key })}
                  className="cursor-grab space-y-2 p-3 active:cursor-grabbing"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{card.id}</span>
                    {col.key === "in_transit" && <Badge tone="info">{card.eta}</Badge>}
                  </div>
                  <p className="text-xs text-white/60">{card.customer}</p>
                  <p className="text-xs text-white/40">{card.route}</p>
                  {card.vehicle !== "—" && (
                    <p className="flex items-center gap-1 text-xs text-white/50">
                      <Truck className="h-3 w-3" /> {card.vehicle} · {card.driver}
                    </p>
                  )}
                  {col.key === "unassigned" && (
                    <button
                      onClick={() => aiMatch(card)}
                      disabled={matching === card.id}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 py-1.5 text-xs text-blue-300 hover:bg-blue-500/20 disabled:opacity-50"
                    >
                      <Sparkles className="h-3 w-3" />
                      {matching === card.id ? "Matching..." : "AI Match"}
                    </button>
                  )}
                </Card>
              ))}
              {board[col.key].length === 0 && (
                <p className="py-6 text-center text-xs text-white/20">No shipments</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
