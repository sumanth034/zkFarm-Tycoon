import Head from 'next/head';
import { useState } from 'react';
import { generateProof } from '../zk/generateProof';

export default function Home() {
  const [farms, setFarms] = useState([]);
  const [roll, setRoll] = useState(null);
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const farmNames = ['Tomato Farm', 'Wheat Field', 'Dairy Shed', 'Chicken Coop', 'Corn Land', 'Pumpkin Patch'];

  const rollDice = async () => {
    setLoading(true);
    const result = Math.floor(Math.random() * 6) + 1;
    setRoll(result);
    const farmName = farmNames[result - 1];

    const newFarm = { name: farmName, timestamp: new Date().toLocaleTimeString() };
    setFarms([newFarm, ...farms]);

    const generated = await generateProof({ roll: result });
    setProof(generated);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>zkFarm Tycoon</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-green-200 to-yellow-100 p-8 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">🌾 zkFarm Tycoon</h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <button
              onClick={rollDice}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-full text-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Rolling...' : 'Grow Your Farm 🎲'}
            </button>

            <div className="mt-4">
              {roll && (
                <p className="text-xl font-semibold">
                  You rolled a <span className="text-green-700">{roll}</span> → You got a <strong>{farmNames[roll - 1]}</strong>!
                </p>
              )}
            </div>

            {proof && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg text-left text-sm">
                <p className="font-bold">ZK Proof:</p>
                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(proof, null, 2)}</pre>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Farm Collection</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {farms.map((farm, index) => (
                <li key={index} className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="font-bold">{farm.name}</p>
                  <p className="text-sm text-gray-500">Rolled at: {farm.timestamp}</p>
                </li>
              ))}
              {farms.length === 0 && <p className="text-gray-500">No farms yet. Roll the dice!</p>}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

// Home page component
