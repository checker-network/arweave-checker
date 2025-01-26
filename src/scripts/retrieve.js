import Arweave from 'arweave'
import fs from 'fs'
import arweaveNodes from '../data/arweave-nodes.json' assert { type: 'json' }
import randomsTxs from '../data/random-transactions.json' assert { type: 'json' }

const fetchData = async () => {
  let output = []
  for (let randomTx of randomsTxs) {
    const { txId } = randomTx
    for (let arNode of arweaveNodes) {
      const arweave = Arweave.init(arNode)
      try {
        const tx = await arweave.transactions.get(txId)
        output = [
          ...output,
          { txId, node: arNode, result: { status: 'success', data: tx } },
        ]
      } catch (err) {
        output = [
          ...output,
          { txId, node: arNode, result: { status: 'error', data: err } },
        ]
      }
    }
  }

  // Write to a JSON file
  const jsonString = JSON.stringify(output, null, 2)
  fs.writeFile(
    './src/data/arweave-retrieve-transaction-output.json',
    jsonString,
    (err) => {
      if (err) {
        console.error('Error writing to file:', err)
        return
      }
      console.log('Array has been written to output file')
    },
  )
}

fetchData()
