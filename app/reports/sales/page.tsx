import { pool } from '@/lib/db';
import Link from 'next/link';
export const dynamic = 'force-dynamic';

export default async function SalesReport() {
  const { rows } = await pool.query('SELECT * FROM vw_sales_daily');

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <Link href="/" className="text-blue-600 hover:underline">← Volver al Dashboard</Link>
      
      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-bold"> Reporte de Ventas Diarias</h1>
        <p className="text-gray-500 italic">Análisis de ingresos y tickets (Matrícula: 243831)</p>
      </header>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border-b">Fecha de Venta</th>
              <th className="p-4 border-b">Total Tickets</th>
              <th className="p-4 border-b">Ingreso (MXN)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 border-b">{new Date(row.sale_date).toLocaleDateString()}</td>
                <td className="p-4 border-b">{row.total_tickets}</td>
                <td className="p-4 border-b font-bold text-green-600">${row.total_revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}