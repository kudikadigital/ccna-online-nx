// components/DeleteLeadButton.tsx
"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteLeadButtonProps {
  id: string;
}

export function DeleteLeadButton({ id }: DeleteLeadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;

    setLoading(true);
    
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Lead excluído com sucesso!");
        // Recarregar a página após exclusão
        setTimeout(() => window.location.reload(), 1000);
      } else {
        throw new Error("Falha ao excluir lead");
      }
    } catch (error) {
      toast.error("Erro ao excluir lead");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg border border-red-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      title="Excluir lead"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Trash2 size={14} />
      )}
    </button>
  );
}