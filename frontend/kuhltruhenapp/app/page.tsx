import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md border-b border-purple-500">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">🧊 Kühltruhnen App</h1>
          <div className="text-gray-300 text-sm">Manage your freezer & pantry</div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Welcome to Your Kitchen Manager
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Keep track of what's in your refrigerator and pantry. Never forget
            about expiring food again!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Kuhlschrank Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition transform hover:scale-105">
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4">❄️</div>
                <h3 className="text-3xl font-bold text-white mb-3">Refrigerator</h3>
                <p className="text-blue-100 text-lg mb-6">
                  Track items in your fridge with expiration dates and categories.
                  Never waste food again!
                </p>
                <ul className="text-blue-100 space-y-2 mb-6">
                  <li>✓ Track quantity and expiration dates</li>
                  <li>✓ Organize by category (Fruit, Vegetables, Meat, etc.)</li>
                  <li>✓ Quick edit and delete options</li>
                </ul>
              </div>
              <Link
                href="/kuhlschrank"
                className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition text-center"
              >
                Manage Refrigerator →
              </Link>
            </div>
          </div>

          {/* Vorrat Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition transform hover:scale-105">
            <div className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="text-5xl mb-4">📦</div>
                <h3 className="text-3xl font-bold text-white mb-3">Pantry/Stock</h3>
                <p className="text-green-100 text-lg mb-6">
                  Track your pantry inventory with target quantities and current stock levels.
                </p>
                <ul className="text-green-100 space-y-2 mb-6">
                  <li>✓ Set target quantities for items</li>
                  <li>✓ Track current stock levels</li>
                  <li>✓ Easy inventory management</li>
                </ul>
              </div>
              <Link
                href="/vorrat"
                className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-green-50 transition text-center"
              >
                Manage Pantry →
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 border border-purple-500">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Application Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <h4 className="text-lg font-bold text-white mb-2">Create & Manage</h4>
              <p className="text-gray-300">
                Add, edit, and delete items with ease using our intuitive interface.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📅</div>
              <h4 className="text-lg font-bold text-white mb-2">Track Expiration</h4>
              <p className="text-gray-300">
                Keep track of expiration dates to minimize food waste.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-lg font-bold text-white mb-2">Organize Inventory</h4>
              <p className="text-gray-300">
                Categorize items and maintain target quantities effortlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p>Built with Next.js, React, TypeScript, and Tailwind CSS</p>
          <p className="text-sm mt-2">Backend: Spring Boot with PostgreSQL</p>
        </div>
      </div>
    </div>
  );
}
