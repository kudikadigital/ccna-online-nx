"use client";
import { deleteLead } from "@/app/admin/dashboard/actions";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

export function DeleteLeadButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja eliminar este lead?")) return;

    setIsDeleting(true);
    try {
      const result = await deleteLead(id);
      if (!result.success) alert(result.error);
    } catch (err) {
      alert("Erro ao conectar com o servidor.");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 bg-slate-800 rounded-lg hover:bg-red-600 text-white transition-all disabled:opacity-50"
      title="Eliminar Lead"
    >
      {isDeleting ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} />
      )}
    </button>
  );
}