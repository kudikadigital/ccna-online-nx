// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Users, BookOpen, Award, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalAlunos: number;
  totalTurmas: number;
  leads: number;
  matriculados: number;
  receitaTotal: number;
  turmasAtivas: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAlunos: 0,
    totalTurmas: 0,
    leads: 0,
    matriculados: 0,
    receitaTotal: 0,
    turmasAtivas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total de Alunos',
      value: stats.totalAlunos,
      icon: Users,
      color: 'from-blue-500 to-cyan-400',
      link: '/admin/alunos'
    },
    {
      title: 'Turmas Ativas',
      value: stats.turmasAtivas,
      icon: BookOpen,
      color: 'from-purple-500 to-violet-400',
      link: '/admin/turmas'
    },
    {
      title: 'Leads',
      value: stats.leads,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-400',
      link: '/admin/alunos?tipo=LEAD'
    },
    {
      title: 'Matriculados',
      value: stats.matriculados,
      icon: Award,
      color: 'from-orange-500 to-amber-400',
      link: '/admin/alunos?tipo=MATRICULADO'
    },
    {
      title: 'Receita Total',
      value: `${stats.receitaTotal.toLocaleString('pt-AO')} AOA`,
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-400',
      link: '/admin/relatorios/financeiro'
    },
    {
      title: 'Próximas Turmas',
      value: '3',
      icon: Calendar,
      color: 'from-pink-500 to-rose-400',
      link: '/admin/turmas?status=AGENDADA'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Visão geral do sistema de gestão de turmas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              href={stat.link}
              className="group block"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">{stat.title}</p>
                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Ver detalhes →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Ações Rápidas */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 text-white">
        <h2 className="text-2xl font-black mb-6">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/turmas/nova"
            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6 text-center hover:bg-blue-600/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="font-bold">Nova Turma</p>
          </Link>

          <Link
            href="/admin/alunos/importar"
            className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 text-center hover:bg-green-600/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <p className="font-bold">Importar Alunos</p>
          </Link>

          <Link
            href="/admin/instrutores"
            className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-500/30 rounded-xl p-6 text-center hover:bg-purple-600/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <p className="font-bold">Gestão de Instrutores</p>
          </Link>

          <Link
            href="/admin/relatorios"
            className="bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/30 rounded-xl p-6 text-center hover:bg-orange-600/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="font-bold">Relatórios</p>
          </Link>
        </div>
      </div>
    </div>
  );
}