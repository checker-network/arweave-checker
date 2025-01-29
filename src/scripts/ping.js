import fs from 'fs'
import nodes from '../data/arweave-nodes.json' assert { type: 'json' }

const PING_TIMEOUT = 10_000

const isAlive = async node => {
  try {
    const res = await fetch(
      `${node.protocol}://${node.host}:${node.port}/`,
      {
        signal: AbortSignal.timeout(PING_TIMEOUT)
      }
    )
    return res.ok
  } catch {
    return false
  }
}

const pingTest = async () => {
  const output = []

  for (let node of nodes) {
    output.push({
      ...node,
      alive: await isAlive(node)
    })
  }

  // Write to a JSON file
  const jsonString = JSON.stringify(output, null, 2)
  fs.writeFile('./src/data/arweave-ping-output.json', jsonString, (err) => {
    if (err) {
      console.error('Error writing to file:', err)
      return
    }
    console.log('Array has been written to output file')
  })
}

pingTest()
