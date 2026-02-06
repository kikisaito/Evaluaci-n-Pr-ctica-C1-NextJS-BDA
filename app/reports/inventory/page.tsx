import { pool } from '@/lib/db';
import Link from 'next/link';

export default async function InventoryReport() {
  const { rows } = await pool.query('SELECT * FROM vw_inventory_risk');

  return (
    <div className="p-10 bg-white min-h-screen text-black font-sans">
      <Link href="/" className="text-blue-600 hover:underline">← Volver al Dashboard</Link>
      
      <header className="mt-6 mb-8">
        <h1 className="text-3xl font-bold">:3 Riesgo de Inventario</h1>
        <p className="text-gray-500 italic">Insight: Identificación de productos con existencias críticas.</p>
      </header>


      <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded shadow-sm">
        <h3 className="text-red-800 font-bold uppercase text-xs">Productos en Riesgo</h3>
        <p className="text-4xl font-black text-red-900 mt-2">{rows.length}</p>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 border-b">Producto</th>
              <th className="p-4 border-b">Stock Actual</th>
              <th className="p-4 border-b">Estado de Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium">{row.producto}</td>
                <td className="p-4 border-b">{row.stock} unidades</td>
                <td className="p-4 border-b">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    row.nivel_alerta === 'Agotado' || row.nivel_alerta === 'Riesgo Crítico' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {row.nivel_alerta}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}