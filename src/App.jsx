import React, { useState, useEffect } from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import { motion } from 'framer-motion'

import {
  FileJson,
  ShieldCheck,
  Database,
  ArrowRightLeft,
  CheckCircle,
  AlertTriangle,
  Copy,
  Wand2,
  Minimize2,
  Trash2,
  Download,
  Upload,
  Code2
} from 'lucide-react'

export default function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-6">

        <div className="max-w-7xl mx-auto">

          <header className="mb-12">

            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              JsonForge
            </h1>

            <p className="text-gray-400 mt-4 text-2xl">
              Modern Developer Toolkit
            </p>

          </header>

          <div className="sticky top-0 z-50 bg-[#0d1117] py-4 mb-10 flex flex-wrap gap-4">

            <NavLinkButton
              to="/json-validator"
              text="JSON Validator"
              icon={<FileJson size={20} />}
            />

            <NavLinkButton
              to="/jwt-decoder"
              text="JWT Decoder"
              icon={<ShieldCheck size={20} />}
            />

            <NavLinkButton
              to="/sql-formatter"
              text="SQL Formatter"
              icon={<Database size={20} />}
            />

            <NavLinkButton
              to="/sql-to-mongo"
              text="SQL → Mongo"
              icon={<ArrowRightLeft size={20} />}
            />

          </div>

          <Routes>

            <Route
              path="/"
              element={<JsonValidator />}
            />

            <Route
              path="/json-validator"
              element={<JsonValidator />}
            />

            <Route
              path="/jwt-decoder"
              element={<JwtDecoder />}
            />

            <Route
              path="/sql-formatter"
              element={<SqlFormatter />}
            />

            <Route
              path="/sql-to-mongo"
              element={<SqlToMongo />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  )
}

function NavLinkButton({ to, text, icon }) {

  return (

    <Link
      to={to}
      className="px-5 md:px-6 py-3 md:py-4 text-base md:text-lg rounded-2xl border transition flex items-center gap-3 font-semibold bg-[#161b22] border-gray-700 hover:bg-[#1f2937]"
    >
      {icon}
      {text}
    </Link>
  )
}

function Card({ title, description, children }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
    >

      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-400 mb-8 text-lg md:text-xl">
        {description}
      </p>

      {children}

    </motion.div>
  )
}

function ActionButton({ text, icon, onClick }) {

  return (
    <button
      onClick={onClick}
      className="bg-cyan-500 hover:bg-cyan-400 text-black text-base md:text-lg font-bold px-4 md:px-5 py-3 md:py-4 rounded-2xl transition flex items-center justify-center gap-2"
    >
      {icon}
      {text}
    </button>
  )
}

function Status({ message, success }) {

  if (!message) return null

  return (
    <div
      className={`mt-6 p-5 rounded-2xl flex items-center gap-3 text-base md:text-lg ${
        success
          ? 'bg-green-500/10 border border-green-500 text-green-400'
          : 'bg-red-500/10 border border-red-500 text-red-400'
      }`}
    >

      {success
        ? <CheckCircle size={22} />
        : <AlertTriangle size={22} />
      }

      <span>{message}</span>

    </div>
  )
}

function JsonValidator() {

  const [jsonInput, setJsonInput] = useState('')
  const [message, setMessage] = useState('')
  const [isValid, setIsValid] = useState(null)
  const [lineCount, setLineCount] = useState(1)

  useEffect(() => {

    const saved = localStorage.getItem('jsonforge-history')

    if (saved) {
      setJsonInput(saved)
      updateLineCount(saved)
    }

  }, [])

  const updateLineCount = (text) => {
    setLineCount(text.split('\n').length)
  }

  const handleChange = (e) => {

    const value = e.target.value

    setJsonInput(value)

    localStorage.setItem('jsonforge-history', value)

    updateLineCount(value)
  }

  const validateJson = () => {

    try {

      JSON.parse(jsonInput)

      setMessage('Valid JSON')
      setIsValid(true)

    } catch (error) {

      setMessage(error.message)
      setIsValid(false)
    }
  }

  const beautifyJson = () => {

    try {

      const parsed = JSON.parse(jsonInput)

      const formatted = JSON.stringify(parsed, null, 4)

      setJsonInput(formatted)

      setMessage('JSON beautified successfully')
      setIsValid(true)

    } catch (error) {

      setMessage(error.message)
      setIsValid(false)
    }
  }

  const minifyJson = () => {

    try {

      const parsed = JSON.parse(jsonInput)

      const minified = JSON.stringify(parsed)

      setJsonInput(minified)

      setMessage('JSON minified successfully')
      setIsValid(true)

    } catch (error) {

      setMessage(error.message)
      setIsValid(false)
    }
  }

  const clearAll = () => {

    setJsonInput('')
    setMessage('')
    setIsValid(null)
    setLineCount(1)

    localStorage.removeItem('jsonforge-history')
  }

  const copyJson = async () => {

    await navigator.clipboard.writeText(jsonInput)

    setMessage('Copied to clipboard')
    setIsValid(true)
  }

  const downloadJson = () => {

    const blob = new Blob([jsonInput], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')

    a.href = url
    a.download = 'jsonforge.json'

    a.click()

    URL.revokeObjectURL(url)
  }

  const uploadJson = (event) => {

    const file = event.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {

      const content = e.target.result

      setJsonInput(content)

      updateLineCount(content)
    }

    reader.readAsText(file)
  }

  const generateCSharp = () => {

    try {

      const parsed = JSON.parse(jsonInput)

      let code = 'public class Root\n{\n'

      Object.keys(parsed).forEach((key) => {
        code += `    public string ${capitalize(key)} { get; set; }\n`
      })

      code += '}'

      setJsonInput(code)

      setMessage('C# class generated')
      setIsValid(true)

    } catch (error) {

      setMessage(error.message)
      setIsValid(false)
    }
  }

  const generateTypescript = () => {

    try {

      const parsed = JSON.parse(jsonInput)

      let code = 'interface Root {\n'

      Object.keys(parsed).forEach((key) => {
        code += `    ${key}: string;\n`
      })

      code += '}'

      setJsonInput(code)

      setMessage('TypeScript interface generated')
      setIsValid(true)

    } catch (error) {

      setMessage(error.message)
      setIsValid(false)
    }
  }

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  return (

    <div className="flex justify-center">

      <div className="w-full max-w-5xl bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">

        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

          <div className="flex items-center gap-3">

            <FileJson className="text-cyan-400" size={30} />

            <h2 className="text-3xl md:text-4xl font-bold">
              JSON Editor
            </h2>

          </div>

          <div className="text-base md:text-lg text-gray-400">
            {lineCount} lines
          </div>

        </div>

        <textarea
          value={jsonInput}
          onChange={handleChange}
          placeholder="Paste your JSON here..."
          className="w-full min-h-[300px] h-[55vh] bg-[#0d1117] border border-gray-500 rounded-2xl p-5 md:p-6 font-mono text-base md:text-lg resize-none outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">

          <ActionButton text="Validate" icon={<CheckCircle size={20} />} onClick={validateJson} />
          <ActionButton text="Beautify" icon={<Wand2 size={20} />} onClick={beautifyJson} />
          <ActionButton text="Minify" icon={<Minimize2 size={20} />} onClick={minifyJson} />
          <ActionButton text="Copy" icon={<Copy size={20} />} onClick={copyJson} />
          <ActionButton text="Clear" icon={<Trash2 size={20} />} onClick={clearAll} />
          <ActionButton text="Download" icon={<Download size={20} />} onClick={downloadJson} />

          <label className="bg-cyan-500 hover:bg-cyan-400 text-black text-base md:text-lg font-bold px-4 md:px-5 py-3 md:py-4 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer">

            <Upload size={20} />

            Upload

            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={uploadJson}
            />

          </label>

          <ActionButton text="JSON → C#" icon={<Code2 size={20} />} onClick={generateCSharp} />
          <ActionButton text="JSON → TS" icon={<Database size={20} />} onClick={generateTypescript} />

        </div>

        <Status message={message} success={isValid} />

      </div>

    </div>
  )
}

function JwtDecoder() {

  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')

  const decodeToken = () => {

    try {

      const parts = token.split('.')

      const decodedHeader = JSON.parse(atob(parts[0]))
      const decodedPayload = JSON.parse(atob(parts[1]))

      setHeader(JSON.stringify(decodedHeader, null, 4))
      setPayload(JSON.stringify(decodedPayload, null, 4))

    } catch {

      setHeader('Invalid JWT')
      setPayload('Invalid JWT')
    }
  }

  const clearJwt = () => {
    setToken('')
    setHeader('')
    setPayload('')
  }

  return (
    <Card
      title="JWT Decoder"
      description="Decode JWT tokens instantly"
    >

      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste JWT token here..."
        className="w-full min-h-[250px] h-[45vh] bg-[#0d1117] border border-gray-700 rounded-2xl p-6 font-mono text-base md:text-lg resize-none outline-none"
      />

      <div className="flex gap-4 mt-6 mb-8 flex-wrap">

        <ActionButton
          text="Decode JWT"
          icon={<ShieldCheck size={20} />}
          onClick={decodeToken}
        />

        <ActionButton
          text="Clear"
          icon={<Trash2 size={20} />}
          onClick={clearJwt}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <textarea
          value={header}
          readOnly
          placeholder="JWT Header"
          className="w-full min-h-[250px] h-[45vh] bg-[#0d1117] border border-gray-700 rounded-2xl p-6 font-mono text-base md:text-lg resize-none outline-none"
        />

        <textarea
          value={payload}
          readOnly
          placeholder="JWT Payload"
          className="w-full min-h-[250px] h-[45vh] bg-[#0d1117] border border-gray-700 rounded-2xl p-6 font-mono text-base md:text-lg resize-none outline-none"
        />

      </div>

    </Card>
  )
}

function SqlFormatter() {

  const [sql, setSql] = useState('')
  const [result, setResult] = useState('')

  const formatSql = () => {

    let formatted = sql

    formatted = formatted.replace(/select/gi, 'SELECT')
    formatted = formatted.replace(/from/gi, 'FROM')
    formatted = formatted.replace(/where/gi, 'WHERE')
    formatted = formatted.replace(/order by/gi, 'ORDER BY')
    formatted = formatted.replace(/group by/gi, 'GROUP BY')

    formatted = formatted
      .replace(/ FROM /g, '\nFROM ')
      .replace(/ WHERE /g, '\nWHERE ')
      .replace(/ ORDER BY /g, '\nORDER BY ')
      .replace(/ GROUP BY /g, '\nGROUP BY ')

    setResult(formatted)
  }

  const clearSql = () => {
    setSql('')
    setResult('')
  }

  return (
    <Card
      title="SQL Formatter"
      description="Beautify SQL queries"
    >

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="Paste SQL query here..."
          className="w-full min-h-[300px] h-[55vh] bg-[#0d1117] border border-gray-700 rounded-2xl p-6 font-mono text-base md:text-lg resize-none outline-none"
        />

        <textarea
          value={result}
          readOnly
          placeholder="Formatted SQL output"
          className="w-full min-h-[300px] h-[55vh] bg-[#0d1117] border border-gray-700 rounded-2xl p-6 font-mono text-base md:text-lg resize-none outline-none"
        />

      </div>

      <div className="flex gap-4 mt-6 flex-wrap">

        <ActionButton
          text="Format SQL"
          icon={<Database size={20} />}
          onClick={formatSql}
        />

        <ActionButton
          text="Clear"
          icon={<Trash2 size={20} />}
          onClick={clearSql}
        />

      </div>

    </Card>
  )
}

function SqlToMongo() {

  const [sql, setSql] = useState('')
  const [mongo, setMongo] = useState('')

  const convertQuery = () => {

    try {

      const tableMatch = sql.match(/FROM\s+(\w+)/i)

      const whereMatch = sql.match(
        /WHERE\s+(\w+)\s*(=|>|<|>=|<=)\s*(\d+)/i
      )

      if (!tableMatch || !whereMatch) {
        throw new Error('Unsupported query')
      }

      const table = tableMatch[1]
      const field = whereMatch[1]
      const operator = whereMatch[2]
      const value = whereMatch[3]

      const operators = {
        '=': '$eq',
        '>': '$gt',
        '<': '$lt',
        '>=': '$gte',
        '<=': '$lte'
      }

      const mongoOperator = operators[operator]

      const result = `db.${table}.find({
  ${field}: { ${mongoOperator}: ${value} }
})`

      setMongo(result)

    } catch (error) {

      setMongo(error.message)
    }
  }

  const clearMongo = () => {
    setSql('')
    setMongo('')
  }

  return (
    <Card
      title="SQL → Mongo Converter"
      description="Convert SQL queries into MongoDB queries"
    >

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="SELECT * FROM Users WHERE Age > 18"
          className="w-full min-h-[300px] h-[55vh] bg-[#0d1117] border border-gray-700 rounded-2xl p-6 font-mono text-base md:text-lg resize-none outline-none"
        />

        <textarea
          value={mongo}
          readOnly
          placeholder="Mongo query output"
          className="w-full min-h-[300px] h-[55vh] bg-[#0d1117] border border-gray-700 rounded-2xl p-6 font-mono text-base md:text-lg resize-none outline-none"
        />

      </div>

      <div className="flex gap-4 mt-6 flex-wrap">

        <ActionButton
          text="Convert"
          icon={<ArrowRightLeft size={20} />}
          onClick={convertQuery}
        />

        <ActionButton
          text="Clear"
          icon={<Trash2 size={20} />}
          onClick={clearMongo}
        />

      </div>

    </Card>
  )
}