# Financial Evidence Research API

Start at /api/v1/start to choose a funding, institution or BTC liquidity review. Run the same task in a browser, REST client or MCP agent. Public reads need no API key. Seven dataset views preserve sources, observation dates, native units and missing values. Coverage and source permissions vary; research evidence does not authorize financial decisions.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 9 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AgentQuery

Results: Successful Response.

SDK operations: `load`.

### AgentReview

Results: Successful Response.

SDK operations: `load`.

### Dataset

Results: Successful Response.

SDK operations: `list`.

### FundingReview

Results: Successful Response.

SDK operations: `load`.

### Query

Results: Successful Response.

SDK operations: `list`.

### Release

Results: Successful Response.

SDK operations: `load`.

### Source

Results: Successful Response.

SDK operations: `list`.

### Start

Results: Successful Response.

SDK operations: `load`.

### Workflow

Results: Successful Response.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AgentQuery | `load` | `GET /api/v1/agent-query` | See reference |
| AgentReview | `load` | `GET /api/v1/agent-review` | See reference |
| Dataset | `list` | `GET /api/v1/datasets` | See reference |
| FundingReview | `load` | `GET /api/v1/funding-review` | See reference |
| Query | `list` | `GET /api/v1/query` | See reference |
| Release | `load` | `GET /api/v1/release` | See reference |
| Source | `list` | `GET /api/v1/sources` | See reference |
| Start | `load` | `GET /api/v1/start` | See reference |
| Workflow | `load` | `GET /api/v1/workflow` | See reference |

## Connect to the API

- API server: `https://agents.seiche.info/v1/research`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `financial-evidence_list`: List records for an entity. Supported entities: `dataset`, `query`, `source`.
- `financial-evidence_load`: Load one record for an entity. Supported entities: `agent_query`, `agent_review`, `funding_review`, `release`, `start`, `workflow`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

