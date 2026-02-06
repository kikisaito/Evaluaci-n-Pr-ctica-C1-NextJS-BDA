import { pool } from '@/lib/db';
import Link from 'next/link';

export default async function RankingReport({ 
  searchParams 
}: { 
  searchParams: { search?: string, page?: string } 
}) {
  const search = searchParams.search || '';
  const page = parseInt(searchParams.page || '1');
  const limit = 5;
  const offset = (page - 1) * limit;

  // Consulta con filtro de búsqueda (ILIKE) y paginación
  // Usamos la VIEW vw_top_products_ranked que tiene la Window Function (RANK) 
  //tu sabias q chingon es maching gone XD
  const { rows } = await pool.query(
    `SELECT * FROM vw_top_products_ranked 
     WHERE producto ILIKE $1 
     LIMIT $2 OFFSET $3`,
    [`%${search}%`, limit, offset]
  );

  return (
    <div className="p-10 bg-white min-h-screen text-black font-sans">
      <Link href="/" className="text-blue-600 hover:underline">← Volver al Dashboard</Link>
      
      <header className="mt-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold"> Ranking de Productos</h1>
          <p className="text-gray-500 italic">Insight: Productos más exitosos por ingresos y unidades.</p>
        </div>
        
        <form className="flex gap-2">
          <input 
            type="text" 
            name="search" 
            placeholder="Buscar producto..." 
            defaultValue={search}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Buscar
          </button>
        </form>
      </header>

      {/* KPI del Producto #1 */}
      <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm">
        <h3 className="text-yellow-700 font-bold uppercase text-xs tracking-widest">Producto Estrella</h3>
        <p className="text-3xl font-black text-gray-900 mt-1">
          {rows.find(r => r.ranking === 1)?.producto || '---'}
        </p>
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border-b">Rank</th>
              <th className="p-4 border-b">Producto</th>
              <th className="p-4 border-b text-center">Unidades</th>
              <th className="p-4 border-b text-right">Ingresos Totales</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any) => (
              <tr key={row.ranking} className="hover:bg-gray-50">
                <td className="p-4 border-b font-black text-blue-600">#{row.ranking}</td>
                <td className="p-4 border-b font-medium">{row.producto}</td>
                <td className="p-4 border-b text-center">{row.unidades_vendidas}</td>
                <td className="p-4 border-b text-right font-bold text-green-600">${row.ingresos_totales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">Mostrando página {page}</p>
        <div className="flex gap-2">
          <Link 
            href={`?search=${search}&page=${Math.max(1, page - 1)}`}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Anterior
          </Link>
          <Link 
            href={`?search=${search}&page=${page + 1}`}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Siguiente
          </Link>
        </div>
      </div>
    </div>
  );
}