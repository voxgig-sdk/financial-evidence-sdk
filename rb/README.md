# FinancialEvidence Ruby SDK



The Ruby SDK for the FinancialEvidence API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AgentQuery` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/financial-evidence-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/financial-evidence-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-financial-evidence-sdk", path: "./financial-evidence-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "FinancialEvidence_sdk"

client = FinancialEvidenceSDK.new
```

### 3. Load an agentquery

```ruby
begin
  # load returns the ENTITY — call data_get for the AgentQuery record (raises on error).
  agentquery = client.AgentQuery.load({ "dataset" => "example_dataset" })
  puts agentquery.data_get
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  datasets = client.Dataset.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = FinancialEvidenceSDK.test

# list returns an Array of Dataset entities, one per mock record (raises on
# error); data_get reads each record.
datasets = client.Dataset.list()
datasets.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = FinancialEvidenceSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FINANCIAL_EVIDENCE_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### FinancialEvidenceSDK

```ruby
require_relative "FinancialEvidence_sdk"
client = FinancialEvidenceSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = FinancialEvidenceSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FinancialEvidenceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `AgentQuery` | `(data) -> AgentQueryEntity` | Create an AgentQuery entity instance. |
| `AgentReview` | `(data) -> AgentReviewEntity` | Create an AgentReview entity instance. |
| `Dataset` | `(data) -> DatasetEntity` | Create a Dataset entity instance. |
| `FundingReview` | `(data) -> FundingReviewEntity` | Create a FundingReview entity instance. |
| `Query` | `(data) -> QueryEntity` | Create a Query entity instance. |
| `Release` | `(data) -> ReleaseEntity` | Create a Release entity instance. |
| `Source` | `(data) -> SourceEntity` | Create a Source entity instance. |
| `Start` | `(data) -> StartEntity` | Create a Start entity instance. |
| `Workflow` | `(data) -> WorkflowEntity` | Create a Workflow entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`FinancialEvidenceError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### AgentQuery

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/agent-query`

#### AgentReview

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/agent-review`

#### Dataset

| Field | Description |
| --- | --- |

Operations: List.

API path: `/api/v1/datasets`

#### FundingReview

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: List.

API path: `/api/v1/query`

#### Release

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: List.

API path: `/api/v1/sources`

#### Start

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/start`

#### Workflow

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/api/v1/workflow`



## Entities


### AgentQuery

Create an instance: `agent_query = client.AgentQuery`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentQuery record (raises on error).
agent_query = client.AgentQuery.load({ "dataset" => "dataset" })
```


### AgentReview

Create an instance: `agent_review = client.AgentReview`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the AgentReview record (raises on error).
agent_review = client.AgentReview.load()
```


### Dataset

Create an instance: `dataset = client.Dataset`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of Dataset entities, one per record (raises on error).
datasets = client.Dataset.list
datasets.each { |item| puts item.data_get }
```


### FundingReview

Create an instance: `funding_review = client.FundingReview`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FundingReview record (raises on error).
funding_review = client.FundingReview.load()
```


### Query

Create an instance: `query = client.Query`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `absence_policy` | `String` |  |
| `carrier_verification` | `String` |  |
| `dataset` | `String` |  |
| `description` | `String` |  |
| `diagnostics` | `Array` |  |
| `evidence_status` | `String` |  |
| `limit` | `Integer` |  |
| `next_offset` | `Object` |  |
| `offset` | `Integer` |  |
| `results` | `Array` |  |
| `returned_rows` | `Integer` |  |
| `schema` | `String` |  |
| `sources` | `Array` |  |
| `status_semantics` | `String` |  |
| `total_rows` | `Integer` |  |
| `transport_status` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Query entities, one per record (raises on error).
querys = client.Query.list({ "dataset" => "example" })
querys.each { |item| puts item.data_get }
```


### Release

Create an instance: `release = client.Release`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Release record (raises on error).
release = client.Release.load()
```


### Source

Create an instance: `source = client.Source`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `absence_policy` | `String` |  |
| `carrier_verification` | `String` |  |
| `dataset` | `String` |  |
| `description` | `String` |  |
| `diagnostics` | `Array` |  |
| `evidence_status` | `String` |  |
| `limit` | `Integer` |  |
| `next_offset` | `Object` |  |
| `offset` | `Integer` |  |
| `results` | `Array` |  |
| `returned_rows` | `Integer` |  |
| `schema` | `String` |  |
| `sources` | `Array` |  |
| `status_semantics` | `String` |  |
| `total_rows` | `Integer` |  |
| `transport_status` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Source entities, one per record (raises on error).
sources = client.Source.list
sources.each { |item| puts item.data_get }
```


### Start

Create an instance: `start = client.Start`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Start record (raises on error).
start = client.Start.load()
```


### Workflow

Create an instance: `workflow = client.Workflow`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Workflow record (raises on error).
workflow = client.Workflow.load({ "selection" => "selection", "workflow" => "workflow" })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── FinancialEvidence_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`FinancialEvidence_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
dataset = client.Dataset
dataset.list()

# dataset.data_get now returns the dataset data from the last list
# dataset.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
