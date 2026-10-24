# FinancialEvidence PHP SDK Reference

Complete API reference for the FinancialEvidence PHP SDK.


## FinancialEvidenceSDK

### Constructor

```php
require_once __DIR__ . '/financialevidence_sdk.php';

$client = new FinancialEvidenceSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FinancialEvidenceSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = FinancialEvidenceSDK::test();
```


### Instance Methods

#### `AgentQuery($data = null)`

Create a new `AgentQueryEntity` instance. Pass `null` for no initial data.

#### `AgentReview($data = null)`

Create a new `AgentReviewEntity` instance. Pass `null` for no initial data.

#### `Dataset($data = null)`

Create a new `DatasetEntity` instance. Pass `null` for no initial data.

#### `FundingReview($data = null)`

Create a new `FundingReviewEntity` instance. Pass `null` for no initial data.

#### `Query($data = null)`

Create a new `QueryEntity` instance. Pass `null` for no initial data.

#### `Release($data = null)`

Create a new `ReleaseEntity` instance. Pass `null` for no initial data.

#### `Source($data = null)`

Create a new `SourceEntity` instance. Pass `null` for no initial data.

#### `Start($data = null)`

Create a new `StartEntity` instance. Pass `null` for no initial data.

#### `Workflow($data = null)`

Create a new `WorkflowEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): FinancialEvidenceUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AgentQueryEntity

```php
$agent_query = $client->AgentQuery();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentQuery()->load(["dataset" => "dataset"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentQueryEntity`

Create a new `AgentQueryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AgentReviewEntity

```php
$agent_review = $client->AgentReview();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->AgentReview()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgentReviewEntity`

Create a new `AgentReviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DatasetEntity

```php
$dataset = $client->Dataset();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Dataset()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DatasetEntity`

Create a new `DatasetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FundingReviewEntity

```php
$funding_review = $client->FundingReview();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->FundingReview()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FundingReviewEntity`

Create a new `FundingReviewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QueryEntity

```php
$query = $client->Query();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `absence_policy` | `string` | Yes |  |
| `carrier_verification` | `string` | Yes |  |
| `dataset` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `diagnostics` | `array` | Yes |  |
| `evidence_status` | `string` | Yes |  |
| `limit` | `int` | Yes |  |
| `next_offset` | `mixed` | Yes |  |
| `offset` | `int` | Yes |  |
| `results` | `array` | Yes |  |
| `returned_rows` | `int` | Yes |  |
| `schema` | `string` | Yes |  |
| `sources` | `array` | Yes |  |
| `status_semantics` | `string` | Yes |  |
| `total_rows` | `int` | Yes |  |
| `transport_status` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Query()->list(["dataset" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QueryEntity`

Create a new `QueryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReleaseEntity

```php
$release = $client->Release();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Release()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReleaseEntity`

Create a new `ReleaseEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SourceEntity

```php
$source = $client->Source();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `absence_policy` | `string` | Yes |  |
| `carrier_verification` | `string` | Yes |  |
| `dataset` | `string` | Yes |  |
| `description` | `string` | Yes |  |
| `diagnostics` | `array` | Yes |  |
| `evidence_status` | `string` | Yes |  |
| `limit` | `int` | Yes |  |
| `next_offset` | `mixed` | Yes |  |
| `offset` | `int` | Yes |  |
| `results` | `array` | Yes |  |
| `returned_rows` | `int` | Yes |  |
| `schema` | `string` | Yes |  |
| `sources` | `array` | Yes |  |
| `status_semantics` | `string` | Yes |  |
| `total_rows` | `int` | Yes |  |
| `transport_status` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Source()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SourceEntity`

Create a new `SourceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StartEntity

```php
$start = $client->Start();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Start()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StartEntity`

Create a new `StartEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WorkflowEntity

```php
$workflow = $client->Workflow();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Workflow()->load(["selection" => "selection", "workflow" => "workflow"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WorkflowEntity`

Create a new `WorkflowEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new FinancialEvidenceSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

