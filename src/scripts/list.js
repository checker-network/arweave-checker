import fs from 'node:fs/promises'

const IP_ADDRESS_REGEX = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/

const getNodes = async () => {
  // TODO: Find a publicly documented API
  const docs = []
  let maxPage = Infinity
  for (let page = 0; page < maxPage; page++) {
    const res = await fetch(
      `https://api.viewblock.io/arweave/nodes?page=${page + 1}&network=mainnet`,
      {
        headers: {
          Origin: 'https://viewblock.io',
        },
      },
    )
    const body = await res.json()
    if (maxPage === Infinity) {
      maxPage = body.pages
    }
    docs.push(...body.docs)
  }
  const nodes = [
    {
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    },
    ...docs
      .map((doc) => doc.id)
      .filter(Boolean)
      .map((addr) => {
        const [host, port] = addr.split(':')
        const protocol = IP_ADDRESS_REGEX.test(host) ? 'http' : 'https'
        return {
          host,
          port: port ? Number(port) : protocol === 'http' ? 80 : 443,
          protocol,
        }
      }),
  ]
  nodes.sort((a, b) => a.host.localeCompare(b.host))
  console.log(`Found ${nodes.length} nodes`)
  return nodes
}

const nodes = await getNodes()
await fs.writeFile(
  './src/data/arweave-nodes.json',
  JSON.stringify(nodes, null, 2),
)
