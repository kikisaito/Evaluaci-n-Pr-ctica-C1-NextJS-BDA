'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { fetchPayments } from '@/app/services/api';

export default function PaymentsReport() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments().then(data => {
      setRows(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Cargando...</div>;
  }

  return (
    <div className="p-10 bg-white min-h-screen text-black font-sans">
      <Link href="/" className="text-blue-600 hover:underline">← Volver al Dashboard</Link>

      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">Mezcla de Pagos</h1>
        <p className="text-gray-500 italic">Insight: Distribución de ingresos por método de pago.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {rows.map((row: any, i: number) => (
          <div key={i} className="p-6 border rounded-2xl shadow-sm bg-gray-50 text-center">
            <h3 className="text-gray-500 uppercase text-xs font-bold">{row.metodo_pago}</h3>
            <p className="text-2xl font-black mt-2">${row.monto_total}</p>
            <p className="text-blue-600 font-bold mt-1">{row.porcentaje}% del total</p>
          </div>
        ))}
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border-b">Método</th>
              <th className="p-4 border-b text-center">Transacciones</th>
              <th className="p-4 border-b text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 border-b font-bold">{row.metodo_pago}</td>
                <td className="p-4 border-b text-center">{row.transacciones}</td>
                <td className="p-4 border-b text-right text-gray-700">${row.monto_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}