import { pool } from '@/lib/db';

export default async function Page() {
  // Consultamos la vista que creamos en Postgres
  const { rows } = await pool.query('SELECT * FROM vw_sales_daily');

  return (
    <main className="p-10 font-sans bg-white min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-4">☕ Avance: Analytics Cafetería</h1>
      <p className="mb-8 text-gray-600">Matrícula: 243831 - Jaitovich Jimenez</p>

      <div className="border rounded-lg shadow-md overflow-hidden">
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
    </main>
  );
}