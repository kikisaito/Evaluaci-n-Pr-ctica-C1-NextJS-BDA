import { pool } from '@/lib/db';
import Link from 'next/link';

export default async function SalesReport() {

  const { rows } = await pool.query('SELECT * FROM vw_sales_daily');

  return (
    <div className="p-10 bg-white min-h-screen">
      <Link href="/" className="text-blue-500 hover:underline">← Volver al Dashboard</Link>
      
      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800"> Reporte de Ventas Diarias</h1>
        <p className="text-gray-500 italic">Insight: Análisis de ingresos y tickets por jornada.</p>
      </header>

    
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-sm text-blue-600 font-semibold uppercase">Venta Total</p>
          <p className="text-3xl font-bold">${rows[0]?.total_ventas || 0}</p>
        </div>
      </div>

      
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 border-b">Fecha</th>
              <th className="p-4 border-b">Tickets</th>
              <th className="p-4 border-b">Venta Total</th>
              <th className="p-4 border-b">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 border-b">{new Date(row.fecha).toLocaleDateString()}</td>
                <td className="p-4 border-b">{row.total_tickets}</td>
                <td className="p-4 border-b font-bold">${row.total_ventas}</td>
                <td className="p-4 border-b text-gray-600">${row.ticket_promedio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}