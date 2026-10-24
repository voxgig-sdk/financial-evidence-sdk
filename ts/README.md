# FinancialEvidence TypeScript SDK



The TypeScript SDK for the FinancialEvidence API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AgentQuery()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/financial-evidence-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/financial-evidence-sdk
npm install ./financial-evidence-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FinancialEvidenceSDK } from '@voxgig-sdk/financial-evidence-sdk'

const client = new FinancialEvidenceSDK()
```

### 3. Load an agentquery

`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const agentquery = await client.AgentQuery().load({ dataset: 'example_dataset' })
  console.log(agentquery.data())
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const datasets = await client.Dataset().list()
  console.log(datasets.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FinancialEvidenceSDK.test()

const datasets = await client.Dataset().list()
// datasets is an array of Dataset entities, one per mock record
console.log(datasets.map((dataset) => dataset.data()))
```

You can also use the instance method:

```ts
const client = new FinancialEvidenceSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Dataset()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FinancialEvidenceSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FINANCIAL_EVIDENCE_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### FinancialEvidenceSDK

#### Constructor

```ts
new FinancialEvidenceSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AgentQuery(data?)` | `AgentQueryEntity` | Create an AgentQuery entity instance. |
| `AgentReview(data?)` | `AgentReviewEntity` | Create an AgentReview entity instance. |
| `Dataset(data?)` | `DatasetEntity` | Create a Dataset entity instance. |
| `FundingReview(data?)` | `FundingReviewEntity` | Create a FundingReview entity instance. |
| `Query(data?)` | `QueryEntity` | Create a Query entity instance. |
| `Release(data?)` | `ReleaseEntity` | Create a Release entity instance. |
| `Source(data?)` | `SourceEntity` | Create a Source entity instance. |
| `Start(data?)` | `StartEntity` | Create a Start entity instance. |
| `Workflow(data?)` | `WorkflowEntity` | Create a Workflow entity instance. |
| `tester(testopts?, sdkopts?)` | `FinancialEvidenceSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FinancialEvidenceSDK.test(testopts?, sdkopts?)` | `FinancialEvidenceSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FinancialEvidenceSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### AgentQuery

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/agent-query`

#### AgentReview

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/agent-review`

#### Dataset

| Field | Description |
| --- | --- |

Operations: list.

API path: `/api/v1/datasets`

#### FundingReview

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/funding-review`

#### Query

| Field | Description |
| --- | --- |
| `absence_policy` |  |
| `carrier_verification` |  |
| `dataset` |  |
| `description` |  |
| `diagnostics` |  |
| `evidence_status` |  |
| `limit` |  |
| `next_offset` |  |
| `offset` |  |
| `results` |  |
| `returned_rows` |  |
| `schema` |  |
| `sources` |  |
| `status_semantics` |  |
| `total_rows` |  |
| `transport_status` |  |

Operations: list.

API path: `/api/v1/query`

#### Release

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/release`

#### Source

| Field | Description |
| --- | --- |
| `absence_policy` |  |
| `carrier_verification` |  |
| `dataset` |  |
| `description` |  |
| `diagnostics` |  |
| `evidence_status` |  |
| `limit` |  |
| `next_offset` |  |
| `offset` |  |
| `results` |  |
| `returned_rows` |  |
| `schema` |  |
| `sources` |  |
| `status_semantics` |  |
| `total_rows` |  |
| `transport_status` |  |

Operations: list.

API path: `/api/v1/sources`

#### Start

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/start`

#### Workflow

| Field | Description |
| --- | --- |

Operations: load.

API path: `/api/v1/workflow`



## Entities


### AgentQuery

Create an instance: `const agent_query = client.AgentQuery()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const agent_query = await client.AgentQuery().load({ dataset: 'dataset' })
```


### AgentReview

Create an instance: `const agent_review = client.AgentReview()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const agent_review = await client.AgentReview().load()
```


### Dataset

Create an instance: `const dataset = client.Dataset()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const datasets = await client.Dataset().list()
```


### FundingReview

Create an instance: `const funding_review = client.FundingReview()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const funding_review = await client.FundingReview().load()
```


### Query

Create an instance: `const query = client.Query()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `absence_policy` | `string` |  |
| `carrier_verification` | `string` |  |
| `dataset` | `string` |  |
| `description` | `string` |  |
| `diagnostics` | `any[]` |  |
| `evidence_status` | `string` |  |
| `limit` | `number` |  |
| `next_offset` | `any` |  |
| `offset` | `number` |  |
| `results` | `any[]` |  |
| `returned_rows` | `number` |  |
| `schema` | `string` |  |
| `sources` | `any[]` |  |
| `status_semantics` | `string` |  |
| `total_rows` | `number` |  |
| `transport_status` | `string` |  |

#### Example: List

```ts
const querys = await client.Query().list({ dataset: "example" })
```


### Release

Create an instance: `const release = client.Release()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const release = await client.Release().load()
```


### Source

Create an instance: `const source = client.Source()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `absence_policy` | `string` |  |
| `carrier_verification` | `string` |  |
| `dataset` | `string` |  |
| `description` | `string` |  |
| `diagnostics` | `any[]` |  |
| `evidence_status` | `string` |  |
| `limit` | `number` |  |
| `next_offset` | `any` |  |
| `offset` | `number` |  |
| `results` | `any[]` |  |
| `returned_rows` | `number` |  |
| `schema` | `string` |  |
| `sources` | `any[]` |  |
| `status_semantics` | `string` |  |
| `total_rows` | `number` |  |
| `transport_status` | `string` |  |

#### Example: List

```ts
const sources = await client.Source().list()
```


### Start

Create an instance: `const start = client.Start()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const start = await client.Start().load()
```


### Workflow

Create an instance: `const workflow = client.Workflow()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const workflow = await client.Workflow().load({ selection: 'selection', workflow: 'workflow' })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
financial-evidence/
├── src/
│   ├── FinancialEvidenceSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FinancialEvidenceSDK } from '@voxgig-sdk/financial-evidence-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const dataset = client.Dataset()
await dataset.list()

// dataset.data() now returns the dataset data from the last `list`
// dataset.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
