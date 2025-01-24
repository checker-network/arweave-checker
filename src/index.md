---
toc: false
---

```js
const arweavePingResults = FileAttachment(
  './data/arweave-ping-output.json',
).json()
const arweaveTxRetrieveResults = FileAttachment(
  './data/arweave-retrieve-transactions-output.json',
).json()
```

```js
const simpleArweavePingResults = arweavePingResults.map((item) => ({
  host: item.host,
  alive: item.alive,
}))
const simpleArweaveTxRetrieveResults = arweaveTxRetrieveResults.map((item) => ({
  txId: item.txId,
  host: item.node.host,
  retrievalStatus: item.result.status,
}))
console.log('simpleArweaveTxRetrieveResults', simpleArweaveTxRetrieveResults)
```

<div class="hero">
  <div><a href="https://checker.network" ><img src="media/checker-with-bbox.png" alt="Checker Logo" width="100" /></a></div>
  <h1>Arweave Checker</h1>
</div>

<div class="grid grid-cols-2">
</div>

<div class="grid grid-cols-2">
  <div>
    <h4>Arweave Retrievability Success Rate</h4>
  <div class="card" style="padding: 0;">
    ${Plot.plot({
    marginBottom: 100,
    x: {label: null, tickRotate: 90},
    y: {grid: true},
    color: {scheme: "accent", legend: "swatches", label: "Success", width: 2000},
    marks: [
      Plot.barY(simpleArweaveTxRetrieveResults, Plot.groupX({y: "count"}, {x: "retrievalStatus", fill: "retrievalStatus"})),
      Plot.ruleY([0])
    ]
  })}
  </div>
  </div>
  <div>
  <h4>Arweave Node Availability</h4>
  <div class="card" style="padding: 0;">
    ${Plot.plot({
      marginBottom: 100,
      x: {label: null, tickRotate: 90},
      y: {grid: true},
      color: {scheme: "accent", legend: "swatches", label: "Alive", width: 2000},
      marks: [
        Plot.barY(simpleArweavePingResults, Plot.groupX({y: "count"}, {x: "alive", fill: "alive"})),
        Plot.ruleY([0])
      ]
  })}
  </div>
  </div>
</div>

---

<h4>Arweave Node Status</h4>

```js
const search = view(
  Inputs.search(simpleArweavePingResults, {
    placeholder: 'Search Arweave Nodes…',
  }),
)
```

<div class="card" style="padding: 0;">
  ${Inputs.table(search, {rows: 16, format: {miner_id: id => htl.html`<a href=./provider/${id} target=_blank>${id}</a>`}})}
</div>

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

.observablehq-header {
  position: absolute;
}

</style>
