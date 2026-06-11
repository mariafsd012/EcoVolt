export default function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Funcionários
          </h2>

          <p className="text-3xl font-bold mt-2">
            42
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Equipamentos
          </h2>

          <p className="text-3xl font-bold mt-2">
            15
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Consumo
          </h2>

          <p className="text-3xl font-bold mt-2">
            780 kWh
          </p>
        </div>

      </div>

    </div>
  );
}