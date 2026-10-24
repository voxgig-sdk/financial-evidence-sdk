
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FinancialEvidence',
        slug: "financial-evidence",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://agents.seiche.info/v1/research",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        agent_query: {
        },
  
        agent_review: {
        },
  
        dataset: {
        },
  
        funding_review: {
        },
  
        query: {
        },
  
        release: {
        },
  
        source: {
        },
  
        start: {
        },
  
        workflow: {
        },
  
    }
  }


  entity = {
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "agent-query"
                }
              ],
              "parts": [
                "api",
                "v1",
                "agent-query"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "dataset",
                    "orig": "dataset",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "money_markets"
                  },
                  {
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "entity",
                    "orig": "entity",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 25
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0
                  },
                  {
                    "name": "previous_revision",
                    "orig": "previous_revision",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "dataset"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "agent-review"
                }
              ],
              "parts": [
                "api",
                "v1",
                "agent-review"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "bank",
                    "orig": "bank",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 10
                  },
                  {
                    "name": "previous_revision",
                    "orig": "previous_revision",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "datasets"
                }
              ],
              "parts": [
                "api",
                "v1",
                "datasets"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "funding-review"
                }
              ],
              "parts": [
                "api",
                "v1",
                "funding-review"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "query": {
      "fields": [
        {
          "name": "absence_policy",
          "title": "Absence Policy",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "carrier_verification",
          "title": "Carrier Verification",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "dataset",
          "title": "Dataset",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "diagnostics",
          "title": "Diagnostics",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "evidence_status",
          "title": "Evidence Status",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "limit",
          "title": "Limit",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "next_offset",
          "title": "Next Offset",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "offset",
          "title": "Offset",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "results",
          "title": "Results",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "returned_rows",
          "title": "Returned Rows",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "schema",
          "title": "Schema",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sources",
          "title": "Sources",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "status_semantics",
          "title": "Status Semantics",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "total_rows",
          "title": "Total Rows",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "transport_status",
          "title": "Transport Status",
          "type": "`$STRING`",
          "req": true
        }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "query"
                }
              ],
              "parts": [
                "api",
                "v1",
                "query"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "dataset",
                    "orig": "dataset",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "money_markets",
                    "field": true
                  },
                  {
                    "name": "end_date",
                    "orig": "end_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "entity",
                    "orig": "entity",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 200,
                    "field": true
                  },
                  {
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 0,
                    "field": true
                  },
                  {
                    "name": "start_date",
                    "orig": "start_date",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "dataset"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "release"
                }
              ],
              "parts": [
                "api",
                "v1",
                "release"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "source": {
      "fields": [
        {
          "name": "absence_policy",
          "title": "Absence Policy",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "carrier_verification",
          "title": "Carrier Verification",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "dataset",
          "title": "Dataset",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "diagnostics",
          "title": "Diagnostics",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "evidence_status",
          "title": "Evidence Status",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "limit",
          "title": "Limit",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "next_offset",
          "title": "Next Offset",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "offset",
          "title": "Offset",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "results",
          "title": "Results",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "returned_rows",
          "title": "Returned Rows",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "schema",
          "title": "Schema",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sources",
          "title": "Sources",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "status_semantics",
          "title": "Status Semantics",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "total_rows",
          "title": "Total Rows",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "transport_status",
          "title": "Transport Status",
          "type": "`$STRING`",
          "req": true
        }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "sources"
                }
              ],
              "parts": [
                "api",
                "v1",
                "sources"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "start"
                }
              ],
              "parts": [
                "api",
                "v1",
                "start"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "api"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "workflow"
                }
              ],
              "parts": [
                "api",
                "v1",
                "workflow"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "selection",
                    "orig": "selection",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "USD"
                  },
                  {
                    "name": "workflow",
                    "orig": "workflow",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true,
                    "example": "funding"
                  }
                ]
              },
              "select": {
                "exist": [
                  "selection",
                  "workflow"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

