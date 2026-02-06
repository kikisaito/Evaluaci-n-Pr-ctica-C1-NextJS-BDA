import { pool } from '@/lib/db';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function CustomersReport({ searchParams }: Props) {

  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const limit = 5; // intente mostrar mas pero curiosamente si ponia 3 crasheaba XD
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    'SELECT * FROM vw_customer_value LIMIT $1 OFFSET $2',
    [limit, offset]
  );

  return (
    <div className="p-10 bg-white min-h-screen text-black">
      <Link href="/" className="text-blue-600 hover:underline">← Volver al Dashboard</Link>
      
      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">👥 Valor del Cliente</h1>
        <p className="text-gray-500 italic">Insight: Identificación de clientes frecuentes y lealtad.</p>
      </header>

      <div className="mb-8 p-6 bg-green-50 border border-green-100 rounded-xl">
        <p className="text-sm text-green-600 font-semibold uppercase">Cliente Top</p>
        <p className="text-2xl font-bold">{rows[0]?.cliente || 'Sin datos'}</p>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border-b">Cliente</th>
              <th className="p-4 border-b text-center">Órdenes</th>
              <th className="p-4 border-b text-right">Total Gastado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium">{row.cliente}</td>
                <td className="p-4 border-b text-center">{row.num_ordenes}</td>
                <td className="p-4 border-b text-right font-bold text-green-600">${row.total_gastado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex gap-4">
        <Link 
          href={`?page=${Math.max(1, page - 1)}`}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Anterior
        </Link>
        <span className="py-2">Página {page}</span>
        <Link 
          href={`?page=${page + 1}`}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Siguiente
        </Link>
      </div>
    </div>
  );
}