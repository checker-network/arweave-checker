import ping from 'ping'
import fs from 'fs'

import nodesJson from '../data/arweave-nodes.json' assert { type: 'json' }

const hosts = nodesJson.map((config) => config.host)

const pingTest = async () => {
  let output = []

  for (let host of hosts) {
    let res = await ping.promise.probe(host)
    output = [res, ...output]
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
