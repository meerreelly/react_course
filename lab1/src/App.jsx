import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Typography from './components/TypographyComponent'
import Link from './components/Link'
import Card from './components/Card'
import Button from './components/Button'
import Image from './components/Image'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Typography variant="div">
        <Link href="https://vite.dev" target="_blank">
          <Image src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
        <Link href="https://react.dev" target="_blank">
          <Image src={reactLogo} className="logo react" alt="React logo" />
        </Link>
    </Typography>
    <Typography variant="h1">Vite + React</Typography>
      <Card>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <Typography variant="p">
          Edit <code>src/App.jsx</code> and save to test HMR
        </Typography>
      </Card>
      <Card>
        <Typography variant="p" className="read-the-docs">
          Click on the Vite and React logos to learn more
        </Typography>
      </Card>
    </>
  )
}

export default App
