import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-16">
        {/* ASCII Art Banner */}
        <div className="font-mono justify-items-center text-xs md:text-sm text-blue-600 mb-16 overflow-x-auto border-b-2 border-gray-200 pb-8">
          <pre>
{`    ██████╗  ██████╗  ██████╗ ████████╗███████╗████████╗██████╗  ██████╗ ██████╗ 
    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗
    ██████╔╝██║   ██║██║   ██║   ██║   ███████╗   ██║   ██████╔╝███████║██████╔╝
    ██╔══██╗██║   ██║██║   ██║   ██║   ╚════██║   ██║   ██╔══██╗██╔══██║██╔═══╝ 
    ██████╔╝╚██████╔╝╚██████╔╝   ██║   ███████║   ██║   ██║  ██║██║  ██║██║     
    ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝`}
          </pre>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              React + Vite + Tailwind
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your development environment is ready. 
              Start building by editing <code className="bg-gray-100 px-2 py-1 font-mono text-sm">src/App.jsx</code>
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h2 className="text-2xl font-bold mb-3">Technology Stack</h2>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>React</span>
                    <span className="text-gray-400 font-mono text-sm">^18.3.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vite</span>
                    <span className="text-gray-400 font-mono text-sm">^5.4.11</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tailwind CSS</span>
                    <span className="text-gray-400 font-mono text-sm">^3.4.17</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-gray-300 pl-6">
                <h2 className="text-2xl font-bold mb-3">Available Commands</h2>
                <div className="space-y-3">
                  <div>
                    <div className="bg-gray-900 text-green-400 p-3 font-mono text-sm mb-1">
                      $ npm run dev
                    </div>
                    <p className="text-sm text-gray-500">Start development server</p>
                  </div>
                  <div>
                    <div className="bg-gray-900 text-green-400 p-3 font-mono text-sm mb-1">
                      $ npm run build
                    </div>
                    <p className="text-sm text-gray-500">Build for production</p>
                  </div>
                  <div>
                    <div className="bg-gray-900 text-green-400 p-3 font-mono text-sm mb-1">
                      $ npm run preview
                    </div>
                    <p className="text-sm text-gray-500">Preview production build</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Quick Start</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex">
                  <span className="font-bold mr-3">1.</span>
                  <span>Open <code className="bg-white px-2 py-1 font-mono text-sm">src/App.jsx</code> in your editor</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-3">2.</span>
                  <span>Modify the component and save</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-3">3.</span>
                  <span>See changes instantly with Hot Module Replacement</span>
                </li>
              </ol>
            </div>

            <div className="bg-gray-50 p-6 border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Project Structure</h3>
              <div className="font-mono text-sm text-gray-700 space-y-1">
                <div>index.html</div>
                <div>src/</div>
                <div className="pl-4">├── App.jsx</div>
                <div className="pl-4">├── App.css</div>
                <div className="pl-4">├── main.jsx</div>
                <div className="mt-3">public/</div>
                <div className="pl-4">└── vite.svg</div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 border border-blue-200">
              <h3 className="text-xl font-bold mb-2">Documentation</h3>
              <ul className="space-y-2 text-blue-700 underline">
                <li><a href="https://react.dev" target="_blank">React Docs</a></li>
                <li><a href="https://vitejs.dev" target="_blank">Vite Docs</a></li>
                <li><a href="https://tailwindcss.com" target="_blank">Tailwind Docs</a></li>
              </ul>
            </div>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t-2 border-gray-200 text-center text-gray-500">
          <p>Generated by Bootstrap CLI</p>
        </footer>
      </div>
    </div>
  )
}

export default App