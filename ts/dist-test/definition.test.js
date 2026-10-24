"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "agent_query",
        "accessor": "AgentQuery",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/agent-query",
        "args": [],
        "select": {
            "dataset": "money_markets",
            "end_date": "",
            "entity": "",
            "limit": 25,
            "offset": 0,
            "previous_revision": "",
            "start_date": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "dataset",
            "entity",
            "start_date",
            "end_date",
            "limit",
            "offset",
            "previous_revision"
        ],
        "queryArgs": [
            {
                "name": "dataset",
                "wire": "dataset"
            },
            {
                "name": "end_date",
                "wire": "end_date"
            },
            {
                "name": "entity",
                "wire": "entity"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "previous_revision",
                "wire": "previous_revision"
            },
            {
                "name": "start_date",
                "wire": "start_date"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "agent_review",
        "accessor": "AgentReview",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/agent-review",
        "args": [],
        "select": {
            "bank": "",
            "limit": 10,
            "previous_revision": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "bank",
            "limit",
            "previous_revision"
        ],
        "queryArgs": [
            {
                "name": "bank",
                "wire": "bank"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "previous_revision",
                "wire": "previous_revision"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "dataset",
        "accessor": "Dataset",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/datasets",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {}
        ],
        "idField": "id"
    },
    {
        "entity": "funding_review",
        "accessor": "FundingReview",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/funding-review",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "query",
        "accessor": "Query",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/query",
        "args": [],
        "select": {
            "dataset": "money_markets",
            "end_date": "",
            "entity": "",
            "limit": 200,
            "offset": 0,
            "start_date": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "dataset",
            "entity",
            "start_date",
            "end_date",
            "limit",
            "offset"
        ],
        "queryArgs": [
            {
                "name": "dataset",
                "wire": "dataset"
            },
            {
                "name": "end_date",
                "wire": "end_date"
            },
            {
                "name": "entity",
                "wire": "entity"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "start_date",
                "wire": "start_date"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "schema": "x",
            "dataset": "x",
            "description": "x",
            "results": [
                {
                    "dataset": "x",
                    "product": "x",
                    "entity_id": "x",
                    "entity_name": "x",
                    "metric": "x",
                    "value": 1,
                    "unit": "x",
                    "as_of": "x",
                    "source_status": "x",
                    "availability": "x",
                    "source_url": "x",
                    "source_field": "x",
                    "observation_url": "x",
                    "retrieved_at": "x",
                    "content_sha256": "x",
                    "published_at": "x",
                    "knowledge_time": "x",
                    "rights_status": "x",
                    "context": "x",
                    "transport_status": "x",
                    "evidence_status": "x",
                    "financial_authority": "x",
                    "carrier_verification": "x"
                }
            ],
            "total_rows": 1,
            "returned_rows": 1,
            "offset": 1,
            "limit": 1,
            "next_offset": 1,
            "transport_status": "x",
            "status_semantics": "x",
            "evidence_status": "x",
            "carrier_verification": "x",
            "absence_policy": "x",
            "diagnostics": [
                {
                    "dataset": "x",
                    "product": "x",
                    "entity_id": "x",
                    "entity_name": "x",
                    "metric": "x",
                    "value": 1,
                    "unit": "x",
                    "as_of": "x",
                    "source_status": "x",
                    "availability": "x",
                    "source_url": "x",
                    "source_field": "x",
                    "observation_url": "x",
                    "retrieved_at": "x",
                    "content_sha256": "x",
                    "published_at": "x",
                    "knowledge_time": "x",
                    "rights_status": "x",
                    "context": "x",
                    "transport_status": "x",
                    "evidence_status": "x",
                    "financial_authority": "x",
                    "carrier_verification": "x"
                }
            ],
            "sources": [
                {}
            ]
        },
        "idField": "id"
    },
    {
        "entity": "release",
        "accessor": "Release",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/release",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "source",
        "accessor": "Source",
        "op": "list",
        "method": "GET",
        "path": "/api/v1/sources",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "schema": "x",
            "dataset": "x",
            "description": "x",
            "results": [
                {
                    "dataset": "x",
                    "product": "x",
                    "entity_id": "x",
                    "entity_name": "x",
                    "metric": "x",
                    "value": 1,
                    "unit": "x",
                    "as_of": "x",
                    "source_status": "x",
                    "availability": "x",
                    "source_url": "x",
                    "source_field": "x",
                    "observation_url": "x",
                    "retrieved_at": "x",
                    "content_sha256": "x",
                    "published_at": "x",
                    "knowledge_time": "x",
                    "rights_status": "x",
                    "context": "x",
                    "transport_status": "x",
                    "evidence_status": "x",
                    "financial_authority": "x",
                    "carrier_verification": "x"
                }
            ],
            "total_rows": 1,
            "returned_rows": 1,
            "offset": 1,
            "limit": 1,
            "next_offset": 1,
            "transport_status": "x",
            "status_semantics": "x",
            "evidence_status": "x",
            "carrier_verification": "x",
            "absence_policy": "x",
            "diagnostics": [
                {
                    "dataset": "x",
                    "product": "x",
                    "entity_id": "x",
                    "entity_name": "x",
                    "metric": "x",
                    "value": 1,
                    "unit": "x",
                    "as_of": "x",
                    "source_status": "x",
                    "availability": "x",
                    "source_url": "x",
                    "source_field": "x",
                    "observation_url": "x",
                    "retrieved_at": "x",
                    "content_sha256": "x",
                    "published_at": "x",
                    "knowledge_time": "x",
                    "rights_status": "x",
                    "context": "x",
                    "transport_status": "x",
                    "evidence_status": "x",
                    "financial_authority": "x",
                    "carrier_verification": "x"
                }
            ],
            "sources": [
                {}
            ]
        },
        "idField": "id"
    },
    {
        "entity": "start",
        "accessor": "Start",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/start",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "workflow",
        "accessor": "Workflow",
        "op": "load",
        "method": "GET",
        "path": "/api/v1/workflow",
        "args": [],
        "select": {
            "selection": "USD",
            "workflow": "funding"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "workflow",
            "selection"
        ],
        "queryArgs": [
            {
                "name": "selection",
                "wire": "selection"
            },
            {
                "name": "workflow",
                "wire": "workflow"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map