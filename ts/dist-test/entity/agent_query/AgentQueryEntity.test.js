"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AgentQueryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FINANCIAL_EVIDENCE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FINANCIAL_EVIDENCE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FinancialEvidenceSDK.test();
        const ent = testsdk.AgentQuery();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.FinancialEvidenceSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.AgentQuery().load({ "dataset": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FINANCIAL_EVIDENCE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'agent_query.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "agent_query", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/v1/agent-query", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "money_markets", "k": "query", "n": "dataset", "or": "dataset", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "", "k": "query", "n": "end_date", "or": "end_date", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "", "k": "query", "n": "entity", "or": "entity", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 25, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "ex": "", "k": "query", "n": "previous_revision", "or": "previous_revision", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": "", "k": "query", "n": "start_date", "or": "start_date", "r": false, "t": "`$STRING`", "index$": 6 }] }, "k": "http", "m": "GET", "o": "/api/v1/agent-query", "q": { "exist": ["dataset"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "v1" }, { "lit": "agent-query" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "agent_query", "name__orig": "agent_query", "Name": "AgentQuery", "name_": "agent_query", "name-": "agent-query", "NAME": "AGENT_QUERY", "index$": 0 }, { "active": true, "entity": "agent_query", "key$": "BasicAgentQueryFlow", "kind": "basic", "name": "BasicAgentQueryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "agent_query_ref01", "srcdatavar": "agent_query_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-agent_query_ref01" } }], "index$": 0 }] }, 'AgentQuery', { "GET /api/v1/agent-query": { "protocol": "http", "parameters": [{ "name": "dataset", "in": "query", "required": true, "schema": { "enum": ["money_markets", "money_market_history", "capital_markets", "bank_risk", "market_liquidity", "china_economy", "source_health"], "type": "string", "title": "Dataset" }, "example": "money_markets", "index$": 0 }, { "name": "entity", "in": "query", "required": false, "schema": { "type": "string", "maxLength": 100, "default": "", "title": "Entity" }, "index$": 1 }, { "name": "start_date", "in": "query", "required": false, "schema": { "type": "string", "default": "", "title": "Start Date" }, "index$": 2 }, { "name": "end_date", "in": "query", "required": false, "schema": { "type": "string", "default": "", "title": "End Date" }, "index$": 3 }, { "name": "limit", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 100, "minimum": 1, "default": 25, "title": "Limit" }, "index$": 4 }, { "name": "offset", "in": "query", "required": false, "schema": { "type": "integer", "maximum": 100000, "minimum": 0, "default": 0, "title": "Offset" }, "index$": 5 }, { "name": "previous_revision", "in": "query", "required": false, "schema": { "type": "string", "maxLength": 64, "pattern": "^(?:[0-9a-f]{64})?$", "default": "", "title": "Previous Revision" }, "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let agent_query_ref01_data = Object.values(setup.data.existing.agent_query)[0];
        // LOAD
        const agent_query_ref01_ent = client.AgentQuery();
        const agent_query_ref01_match_dt0 = {};
        const agent_query_ref01_data_dt0 = (await agent_query_ref01_ent.load(agent_query_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != agent_query_ref01_data_dt0);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/agent_query/AgentQueryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FinancialEvidenceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['agent_query01', 'agent_query02', 'agent_query03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FINANCIAL_EVIDENCE_TEST_AGENT_QUERY_ENTID': idmap,
        'FINANCIAL_EVIDENCE_TEST_LIVE': 'FALSE',
        'FINANCIAL_EVIDENCE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FINANCIAL_EVIDENCE_TEST_AGENT_QUERY_ENTID'];
    const live = 'TRUE' === env.FINANCIAL_EVIDENCE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FINANCIAL_EVIDENCE_TEST_AGENT_QUERY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FinancialEvidenceSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FINANCIAL_EVIDENCE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AgentQueryEntity.test.js.map