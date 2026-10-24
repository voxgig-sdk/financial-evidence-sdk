# FinancialEvidence Golang SDK



The Golang SDK for the FinancialEvidence API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AgentQuery(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/financial-evidence-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/financial-evidence-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/financial-evidence-sdk/go=../financial-evidence-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/financial-evidence-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single agentQuery — the value is the entity; Data() reads its record.
    agentQuery, err := client.AgentQuery(nil).Load(map[string]any{"dataset": "example_dataset"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(agentQuery.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
datasets, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = datasets
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

datasets, err := client.Dataset(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range datasets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewFinancialEvidenceSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewFinancialEvidenceSDK

```go
func NewFinancialEvidenceSDK(options map[string]any) *FinancialEvidenceSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *FinancialEvidenceSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### FinancialEvidenceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AgentQuery` | `(data map[string]any) FinancialEvidenceEntity` | Create an AgentQuery entity instance. |
| `AgentReview` | `(data map[string]any) FinancialEvidenceEntity` | Create an AgentReview entity instance. |
| `Dataset` | `(data map[string]any) FinancialEvidenceEntity` | Create a Dataset entity instance. |
| `FundingReview` | `(data map[string]any) FinancialEvidenceEntity` | Create a FundingReview entity instance. |
| `Query` | `(data map[string]any) FinancialEvidenceEntity` | Create a Query entity instance. |
| `Release` | `(data map[string]any) FinancialEvidenceEntity` | Create a Release entity instance. |
| `Source` | `(data map[string]any) FinancialEvidenceEntity` | Create a Source entity instance. |
| `Start` | `(data map[string]any) FinancialEvidenceEntity` | Create a Start entity instance. |
| `Workflow` | `(data map[string]any) FinancialEvidenceEntity` | Create a Workflow entity instance. |

### Entity interface (FinancialEvidenceEntity)

All entities implement the `FinancialEvidenceEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    agentQuery, err := client.AgentQuery(nil).Load(map[string]any{"dataset": "example"}, nil)
    if err != nil { /* handle */ }
    // agentQuery is the entity; agentQuery.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `"absence_policy"` |  |
| `"carrier_verification"` |  |
| `"dataset"` |  |
| `"description"` |  |
| `"diagnostics"` |  |
| `"evidence_status"` |  |
| `"limit"` |  |
| `"next_offset"` |  |
| `"offset"` |  |
| `"results"` |  |
| `"returned_rows"` |  |
| `"schema"` |  |
| `"sources"` |  |
| `"status_semantics"` |  |
| `"total_rows"` |  |
| `"transport_status"` |  |

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
| `"absence_policy"` |  |
| `"carrier_verification"` |  |
| `"dataset"` |  |
| `"description"` |  |
| `"diagnostics"` |  |
| `"evidence_status"` |  |
| `"limit"` |  |
| `"next_offset"` |  |
| `"offset"` |  |
| `"results"` |  |
| `"returned_rows"` |  |
| `"schema"` |  |
| `"sources"` |  |
| `"status_semantics"` |  |
| `"total_rows"` |  |
| `"transport_status"` |  |

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

Create an instance: `agentQuery := client.AgentQuery(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
agentQuery, err := client.AgentQuery(nil).Load(map[string]any{"dataset": "dataset"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentQuery.(sdk.Entity).Data()) // the loaded entity's record
```


### AgentReview

Create an instance: `agentReview := client.AgentReview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
agentReview, err := client.AgentReview(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agentReview.(sdk.Entity).Data()) // the loaded entity's record
```


### Dataset

Create an instance: `dataset := client.Dataset(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Example: List

```go
datasets, err := client.Dataset(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range datasets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### FundingReview

Create an instance: `fundingReview := client.FundingReview(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
fundingReview, err := client.FundingReview(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(fundingReview.(sdk.Entity).Data()) // the loaded entity's record
```


### Query

Create an instance: `query := client.Query(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `absence_policy` | `string` |  |
| `carrier_verification` | `string` |  |
| `dataset` | `string` |  |
| `description` | `string` |  |
| `diagnostics` | `[]any` |  |
| `evidence_status` | `string` |  |
| `limit` | `int` |  |
| `next_offset` | `any` |  |
| `offset` | `int` |  |
| `results` | `[]any` |  |
| `returned_rows` | `int` |  |
| `schema` | `string` |  |
| `sources` | `[]any` |  |
| `status_semantics` | `string` |  |
| `total_rows` | `int` |  |
| `transport_status` | `string` |  |

#### Example: List

```go
querys, err := client.Query(nil).List(map[string]any{"dataset": "example"}, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range querys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Release

Create an instance: `release := client.Release(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
release, err := client.Release(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(release.(sdk.Entity).Data()) // the loaded entity's record
```


### Source

Create an instance: `source := client.Source(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `absence_policy` | `string` |  |
| `carrier_verification` | `string` |  |
| `dataset` | `string` |  |
| `description` | `string` |  |
| `diagnostics` | `[]any` |  |
| `evidence_status` | `string` |  |
| `limit` | `int` |  |
| `next_offset` | `any` |  |
| `offset` | `int` |  |
| `results` | `[]any` |  |
| `returned_rows` | `int` |  |
| `schema` | `string` |  |
| `sources` | `[]any` |  |
| `status_semantics` | `string` |  |
| `total_rows` | `int` |  |
| `transport_status` | `string` |  |

#### Example: List

```go
sources, err := client.Source(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range sources.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Start

Create an instance: `start := client.Start(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
start, err := client.Start(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(start.(sdk.Entity).Data()) // the loaded entity's record
```


### Workflow

Create an instance: `workflow := client.Workflow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
workflow, err := client.Workflow(nil).Load(map[string]any{"selection": "selection", "workflow": "workflow"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(workflow.(sdk.Entity).Data()) // the loaded entity's record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/financial-evidence-sdk/go/
├── financial-evidence.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/financial-evidence-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
dataset := client.Dataset(nil)
dataset.List(nil, nil)

// dataset.Data() now returns the dataset data from the last list
// dataset.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
