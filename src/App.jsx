import React, { useState, useEffect } from 'react'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
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
  Code2,
  Mail,
  FileText
} from 'lucide-react'

const SEO_DATA = {
  '/': {
    title: 'JsonForge – Free JSON Validator, JWT Decoder & SQL Formatter',
    description: 'Free online developer tools. Validate JSON, decode JWT tokens, format SQL queries and convert SQL to MongoDB. Fast, free and works in your browser.',
  },
  '/json-validator': {
    title: 'JSON Validator & Beautifier Online – JsonForge',
    description: 'Validate, beautify, minify and convert JSON online for free. Generate TypeScript interfaces and C# classes from JSON instantly.',
  },
  '/jwt-decoder': {
    title: 'JWT Decoder Online – Decode JWT Tokens Free | JsonForge',
    description: 'Decode JWT tokens online for free. Instantly view JWT header and payload without any server. 100% client-side and secure.',
  },
  '/sql-formatter': {
    title: 'SQL Formatter & Beautifier Online – JsonForge',
    description: 'Format and beautify SQL queries online for free. Clean up messy SQL with proper indentation and capitalization instantly.',
  },
  '/sql-to-mongo': {
    title: 'SQL to MongoDB Query Converter Online – JsonForge',
    description: 'Convert SQL queries to MongoDB queries online for free. Supports SELECT, WHERE, comparison operators and more.',
  },
}

function SEOHead() {

  const location = useLocation()

  const seo = SEO_DATA[location.pathname] || SEO_DATA['/']

  useEffect(() => {

    document.title = seo.title

    document.querySelector('meta[name="description"]')
      ?.setAttribute('content', seo.description)

    document.querySelector('meta[property="og:title"]')
      ?.setAttribute('content', seo.title)

    document.querySelector('meta[property="og:description"]')
      ?.setAttribute('content', seo.description)

    document.querySelector('meta[property="og:url"]')
      ?.setAttribute('content', `https://usejsonforge.com${location.pathname}`)

    document.querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', seo.title)

    document.querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', seo.description)

    const canonicalEl = document.getElementById('canonical-url')
    if (canonicalEl) {
      canonicalEl.setAttribute('href', `https://usejsonforge.com${location.pathname}`)
    }

  }, [location.pathname, seo])

  return null
}

export default function App() {

  return (

    <BrowserRouter>

      <SEOHead />

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

            <Route path="/" element={<JsonValidator />} />
            <Route path="/json-validator" element={<JsonValidator />} />
            <Route path="/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/sql-formatter" element={<SqlFormatter />} />
            <Route path="/sql-to-mongo" element={<SqlToMongo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

          </Routes>

          <footer className="mt-20 border-t border-gray-800 pt-8 pb-10">

  <div className="flex flex-col md:flex-row items-center justify-between gap-6">

    <div>
      <h3 className="text-xl font-bold text-cyan-400">
        JsonForge
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        Free online developer tools
      </p>
    </div>

    <div className="flex items-center gap-6 text-sm md:text-base">

      <Link
        to="/contact"
        className="text-gray-400 hover:text-cyan-400 transition"
      >
        Contact
      </Link>

      <Link
        to="/privacy"
        className="text-gray-400 hover:text-cyan-400 transition"
      >
        Privacy Policy
      </Link>

      <Link
        to="/terms"
        className="text-gray-400 hover:text-cyan-400 transition"
      >
        Terms of Service
      </Link>

    </div>

  </div>

</footer>

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

  /*
==========================================
DETECT STORED PROCEDURE
==========================================
*/

let sqlToProcess = sql.trim()


if (/^CREATE\s+PROCEDURE/i.test(sqlToProcess)) {

  /*
  EXTRAER SELECT / INSERT / UPDATE / DELETE
  */

  const bodyMatch = sqlToProcess.match(
    /BEGIN\s+([\s\S]*?)\s+END/i
  )

  if (bodyMatch) {

    sqlToProcess = bodyMatch[1]
     .replace(/SET\s+NOCOUNT\s+ON;?/gi, '')
     .replace(/GO/gi, '')
     .replace(/\r/g, '')
     .trim()

    sqlToProcess = sqlToProcess.trim()
  }
}

  try {

    /*
    ==========================================
    SELECT
    ==========================================
    */

    if (/^SELECT/i.test(sqlToProcess)) {

      const tableMatch = sqlToProcess.match(/FROM\s+(\w+)/i)

      if (!tableMatch) {
        throw new Error('Table not found')
      }

      const table = tableMatch[1]

      /*
      ==========================================
      DETECT JOIN
      ==========================================
      */

      const hasJoin = /JOIN/i.test(sqlToProcess)

      if (hasJoin) {

        const joinMatch = sqlToProcess.match(
        /JOIN\s+(\w+)(?:\s+\w+)?\s+ON\s+([\w\.]+)\s*=\s*([\w\.]+)/i
        )

        const whereMatch = sqlToProcess.match(
         /WHERE\s+([\s\S]*?)(?:ORDER BY|GROUP BY|$)/i
        )

        const orderMatch = sqlToProcess.match(
        /ORDER BY\s+(?:\w+\.)?(\w+)\s+(ASC|DESC)?/i
       )

        const groupMatch = sqlToProcess.match(/GROUP BY\s+(\w+)/i)

        let pipeline = []

        /*
        ==========================================
        LOOKUP
        ==========================================
        */

        if (joinMatch) {

          const foreignTable = joinMatch[1]

          const leftField = joinMatch[2]
            .split('.')
            .pop()
            .trim()

          const rightField = joinMatch[3]
            .split('.')
            .pop()
            .trim()

          pipeline.push(`{
  $lookup: {
    from: "${foreignTable}",
    localField: "${leftField}",
    foreignField: "${rightField}",
    as: "${foreignTable.toLowerCase()}"
  }
}`)
        }

        /*
        ==========================================
        WHERE
        ==========================================
        */

        if (whereMatch) {

          const whereClause = whereMatch[1]

          const mongoConditions = parseConditions(whereClause)

          pipeline.push(`{
  $match: {
    ${mongoConditions}
  }
}`)
        }

        /*
        ==========================================
        GROUP BY
        ==========================================
        */

        if (groupMatch) {

          const groupField = groupMatch[1]

          pipeline.push(`{
  $group: {
    _id: "$${groupField}",
    total: { $sum: 1 }
  }
}`)
        }

        /*
        ==========================================
        ORDER BY
        ==========================================
        */

        if (orderMatch) {

          const field = orderMatch[1]

          const direction =
            orderMatch[2]?.toUpperCase() === 'DESC'
              ? -1
              : 1

          pipeline.push(`{
  $sort: {
    ${field}: ${direction}
  }
}`)
        }

        const result =
`db.${table}.aggregate([
${pipeline.join(',\n')}
])`

        setMongo(result)

        return
      }

      /*
      ==========================================
      SIMPLE SELECT
      ==========================================
      */

      let mongoQuery = `db.${table}.find(`

      const whereMatch = sqlToProcess.match(
       /WHERE\s+([\s\S]*?)(?:ORDER BY|GROUP BY|$)/i
      )

      const orderMatch = sqlToProcess.match(/ORDER BY\s+(\w+)\s+(ASC|DESC)?/i)

      const limitMatch = sqlToProcess.match(/TOP\s+(\d+)/i)

      if (whereMatch) {

        const mongoConditions = parseConditions(whereMatch[1])

        mongoQuery += `{\n  ${mongoConditions}\n}`

      } else {

        mongoQuery += '{}'
      }

      mongoQuery += ')'

      /*
      ==========================================
      ORDER BY
      ==========================================
      */

      if (orderMatch) {

        const field = orderMatch[1]

        const direction =
          orderMatch[2]?.toUpperCase() === 'DESC'
            ? -1
            : 1

        mongoQuery += `.sort({ ${field}: ${direction} })`
      }

      /*
      ==========================================
      LIMIT
      ==========================================
      */

      if (limitMatch) {

        mongoQuery += `.limit(${limitMatch[1]})`
      }

      setMongo(mongoQuery)

      return
    }

    /*
    ==========================================
    INSERT
    ==========================================
    */

    if (/^INSERT/i.test(sqlToProcess)) {

      const insertMatch = sqlToProcess.match(
        /INSERT\s+INTO\s+(\w+)\s*\((.+)\)\s*VALUES\s*\((.+)\)/i
      )

      if (!insertMatch) {
        throw new Error('Invalid INSERT syntax')
      }

      const table = insertMatch[1]

      const fields = insertMatch[2]
        .split(',')
        .map(f => f.trim())

      const values = insertMatch[3]
        .split(',')
        .map(v => v.trim().replace(/'/g, ''))

      const document = {}

      fields.forEach((field, index) => {

        const value = values[index]

        document[field] =
          isNaN(value)
            ? value
            : Number(value)
      })

      const result =
`db.${table}.insertOne(
${JSON.stringify(document, null, 2)}
)`

      setMongo(result)

      return
    }

    /*
    ==========================================
    UPDATE
    ==========================================
    */

    if (/^UPDATE/i.test(sqlToProcess)) {

      const updateMatch = sqlToProcess.match(
      /UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+)/i
      )

      if (!updateMatch) {
        throw new Error('Invalid UPDATE syntax')
      }

      const table = updateMatch[1]

      const setClause = updateMatch[2]

      const whereClause = updateMatch[3]

      const updates = {}

      setClause
      .split(',')
      .filter(x => x.trim())
      .forEach(item => {

        const parts = item.split('=')

        const field = parts[0]
        const value = parts.slice(1).join('=')

        updates[field.trim()] =
          value.trim().replace(/'/g, '')
      })

      const mongoConditions = parseConditions(whereClause)

      const result =
`db.${table}.updateOne(
  {
    ${mongoConditions}
  },
  {
    $set: ${JSON.stringify(updates, null, 4)}
  }
)`

      setMongo(result)

      return
    }

    /*
    ==========================================
    DELETE
    ==========================================
    */

    if (/^DELETE/i.test(sqlToProcess)) {

      const deleteMatch = sqlToProcess.match(
        /DELETE\s+FROM\s+(\w+)\s+WHERE\s+(.+)/i
      )

      if (!deleteMatch) {
        throw new Error('Invalid DELETE syntax')
      }

      const table = deleteMatch[1]

      const mongoConditions = parseConditions(deleteMatch[2])

      const result =
`db.${table}.deleteOne({
  ${mongoConditions}
})`

      setMongo(result)

      return
    }

    throw new Error('Unsupported SQL syntax')

  } catch (error) {

    setMongo(error.message)
  }
}

/*
==========================================
PARSE CONDITIONS
==========================================
*/

function parseConditions(whereClause) {

  if (!whereClause) return '{}'

  whereClause = whereClause
    .replace(/;/g, '')
    .trim()

  const andParts = []

let tempClause = whereClause

const betweenRegex = /(\w+\s+BETWEEN\s+\d+\s+AND\s+\d+)/gi

const betweenMatches = tempClause.match(betweenRegex)

if (betweenMatches) {

  betweenMatches.forEach(match => {

    andParts.push(match)

    tempClause = tempClause.replace(match, '')
  })
}

tempClause
  .split(/\s+AND\s+/i)
  .map(x => x.trim())
  .filter(x => x)
  .forEach(x => andParts.push(x))

  const conditionMap = {}

  andParts.forEach((part) => {

    part = part.trim()

    /*
    ==========================================
    BETWEEN
    ==========================================
    */

    const betweenMatch = part.match(
      /(?:\w+\.)?(\w+)\s+BETWEEN\s+(\d+)\s+AND\s+(\d+)/i
    )

    if (betweenMatch) {

      const field = betweenMatch[1]

      conditionMap[field] = {
        ...(conditionMap[field] || {}),
        $gte: Number(betweenMatch[2]),
        $lte: Number(betweenMatch[3])
      }

      return
    }

    /*
    ==========================================
    LIKE
    ==========================================
    */

    const likeMatch = part.match(
      /(?:\w+\.)?(\w+)\s+LIKE\s+'%(.+)%'/i
    )

    if (likeMatch) {

      const field = likeMatch[1]

      conditionMap[field] = {
        $regex: likeMatch[2],
        $options: 'i'
      }

      return
    }

    /*
    ==========================================
    IN
    ==========================================
    */

    const inMatch = part.match(
      /(?:\w+\.)?(\w+)\s+IN\s+\((.+)\)/i
    )

    if (inMatch) {

      const field = inMatch[1]

      const values = inMatch[2]
        .split(',')
        .map(v => v.trim().replace(/'/g, ''))

      conditionMap[field] = {
        $in: values
      }

      return
    }

    /*
    ==========================================
    NORMAL OPERATORS
    ==========================================
    */

    const normalMatch = part.match(
      /(?:\w+\.)?(\w+)\s*(>=|<=|!=|=|>|<)\s*('?[^']+'?|\d+(\.\d+)?)/i
    )

    if (normalMatch) {

      const field = normalMatch[1]

      const operator = normalMatch[2]

      let value = normalMatch[3]

      const operators = {
        '=': '$eq',
        '!=': '$ne',
        '>': '$gt',
        '<': '$lt',
        '>=': '$gte',
        '<=': '$lte'
      }

      const mongoOperator = operators[operator]

      if (isNaN(value.replace(/'/g, ''))) {

        value = value.replace(/'/g, '')

      } else {

        value = Number(value.replace(/'/g, ''))
      }

      conditionMap[field] = {
        ...(conditionMap[field] || {}),
        [mongoOperator]: value
      }
    }

  })

  return Object.entries(conditionMap)
    .map(([field, value]) =>
`"${field}": ${JSON.stringify(value, null, 2)}`
    )
    .join(',\n')
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
