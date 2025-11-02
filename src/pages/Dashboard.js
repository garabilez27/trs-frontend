import React from "react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
        <h2 className="text-lg font-semibold mb-3">Dashboard Card 1</h2>
        <p>Some information here.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1">
        <h2 className="text-lg font-semibold mb-3">Dashboard Card 2</h2>
        <p>Some information here.</p>
      </div>
    </div>
  );
}
