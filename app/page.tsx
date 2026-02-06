import Link from 'next/link';

export default function Home() {
  const reportes = [
    { id: 1, nombre: 'Ventas Diarias', path: '/reports/sales', desc: 'Ingresos y tickets por día.' },
    { id: 2, nombre: 'Inventario', path: '/reports/inventory', desc: 'Productos en riesgo de stock.' },
    { id: 3, nombre: 'Ranking', path: '/reports/ranking', desc: 'Top productos por ingresos.' },
    { id: 4, nombre: 'Clientes', path: '/reports/customers', desc: 'Valor y gasto por cliente.' },
    { id: 5, nombre: 'Pagos', path: '/reports/payments', desc: 'Mezcla de métodos de pago.' },
  ];

  return (
    <main className="p-10 bg-gray-50 min-h-screen text-black font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-12">☕ Analytics Cafetería UP</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportes.map((rep) => (
            <Link key={rep.id} href={rep.path} className="group">
              <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm group-hover:shadow-md group-hover:border-blue-500 transition-all">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">
                  {rep.nombre}
                </h2>
                <p className="text-gray-500 mt-2 text-sm">{rep.desc}</p>
                <div className="mt-4 text-blue-500 font-semibold text-xs uppercase tracking-widest">
                  Ver reporte →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}