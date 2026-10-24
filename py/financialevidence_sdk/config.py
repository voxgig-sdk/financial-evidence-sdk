# FinancialEvidence SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FinancialEvidence",
            "slug": "financial-evidence",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://agents.seiche.info/v1/research",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "agent_query": {},
                "agent_review": {},
                "dataset": {},
                "funding_review": {},
                "query": {},
                "release": {},
                "source": {},
                "start": {},
                "workflow": {},
            },
        },
        "entity": {
      "agent_query": {
        "fields": [],
        "name": "agent_query",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/agent-query",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "agent-query",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "agent-query",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "dataset",
                      "orig": "dataset",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "money_markets",
                    },
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                    {
                      "name": "entity",
                      "orig": "entity",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 25,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "previous_revision",
                      "orig": "previous_revision",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "agent_review": {
        "fields": [],
        "name": "agent_review",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/agent-review",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "agent-review",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "agent-review",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "bank",
                      "orig": "bank",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "previous_revision",
                      "orig": "previous_revision",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                  ],
                },
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dataset": {
        "fields": [],
        "name": "dataset",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/datasets",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "datasets",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "datasets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "funding_review": {
        "fields": [],
        "name": "funding_review",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/funding-review",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "funding-review",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "funding-review",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "query": {
        "fields": [
          {
            "name": "absence_policy",
            "title": "Absence Policy",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "carrier_verification",
            "title": "Carrier Verification",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "dataset",
            "title": "Dataset",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "diagnostics",
            "title": "Diagnostics",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "evidence_status",
            "title": "Evidence Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "next_offset",
            "title": "Next Offset",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "offset",
            "title": "Offset",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "returned_rows",
            "title": "Returned Rows",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "schema",
            "title": "Schema",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sources",
            "title": "Sources",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "status_semantics",
            "title": "Status Semantics",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "total_rows",
            "title": "Total Rows",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "transport_status",
            "title": "Transport Status",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "query",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/query",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "query",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "query",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "dataset",
                      "orig": "dataset",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "money_markets",
                      "field": True,
                    },
                    {
                      "name": "end_date",
                      "orig": "end_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                    {
                      "name": "entity",
                      "orig": "entity",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 200,
                      "field": True,
                    },
                    {
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                      "field": True,
                    },
                    {
                      "name": "start_date",
                      "orig": "start_date",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "dataset",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "release": {
        "fields": [],
        "name": "release",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/release",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "release",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "release",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "source": {
        "fields": [
          {
            "name": "absence_policy",
            "title": "Absence Policy",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "carrier_verification",
            "title": "Carrier Verification",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "dataset",
            "title": "Dataset",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "diagnostics",
            "title": "Diagnostics",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "evidence_status",
            "title": "Evidence Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "limit",
            "title": "Limit",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "next_offset",
            "title": "Next Offset",
            "type": "`$ANY`",
            "req": True,
          },
          {
            "name": "offset",
            "title": "Offset",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "results",
            "title": "Results",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "returned_rows",
            "title": "Returned Rows",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "schema",
            "title": "Schema",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sources",
            "title": "Sources",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "status_semantics",
            "title": "Status Semantics",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "total_rows",
            "title": "Total Rows",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "transport_status",
            "title": "Transport Status",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "name": "source",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/sources",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "sources",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "sources",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "start": {
        "fields": [],
        "name": "start",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/start",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "start",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "start",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "workflow": {
        "fields": [],
        "name": "workflow",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/v1/workflow",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "workflow",
                  },
                ],
                "parts": [
                  "api",
                  "v1",
                  "workflow",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "selection",
                      "orig": "selection",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "USD",
                    },
                    {
                      "name": "workflow",
                      "orig": "workflow",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "funding",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "selection",
                    "workflow",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
