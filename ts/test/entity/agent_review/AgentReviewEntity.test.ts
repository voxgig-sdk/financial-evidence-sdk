

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FinancialEvidenceSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AgentReviewEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_EVIDENCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_EVIDENCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialEvidenceSDK.test()
    const ent = testsdk.AgentReview()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FinancialEvidenceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AgentReview().load({"bank":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_EVIDENCE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'agent_review.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"agent_review","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/v1/agent-review","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"","k":"query","n":"bank","or":"bank","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"","k":"query","n":"previous_revision","or":"previous_revision","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/api/v1/agent-review","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"agent-review"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"agent_review","name__orig":"agent_review","Name":"AgentReview","name_":"agent_review","name-":"agent-review","NAME":"AGENT_REVIEW","index$":1}, {"active":true,"entity":"agent_review","key$":"BasicAgentReviewFlow","kind":"basic","name":"BasicAgentReviewFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"agent_review_ref01","srcdatavar":"agent_review_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-agent_review_ref01"}}],"index$":0}]}, 'AgentReview', {"GET /api/v1/agent-review":{"protocol":"http","parameters":[{"name":"bank","in":"query","required":false,"schema":{"type":"string","maxLength":100,"default":"","title":"Bank"},"index$":0},{"name":"limit","in":"query","required":false,"schema":{"type":"integer","maximum":25,"minimum":1,"default":10,"title":"Limit"},"index$":1},{"name":"previous_revision","in":"query","required":false,"schema":{"type":"string","maxLength":64,"pattern":"^(?:[0-9a-f]{64})?$","default":"","title":"Previous Revision"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let agent_review_ref01_data = Object.values(setup.data.existing.agent_review)[0] as any

    // LOAD
    const agent_review_ref01_ent = client.AgentReview()
    const agent_review_ref01_match_dt0: any = {}
    const agent_review_ref01_data_dt0 = (await agent_review_ref01_ent.load(agent_review_ref01_match_dt0)).data()
    assert(null != agent_review_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/agent_review/AgentReviewTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FinancialEvidenceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['agent_review01','agent_review02','agent_review03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_EVIDENCE_TEST_AGENT_REVIEW_ENTID': idmap,
    'FINANCIAL_EVIDENCE_TEST_LIVE': 'FALSE',
    'FINANCIAL_EVIDENCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FINANCIAL_EVIDENCE_TEST_AGENT_REVIEW_ENTID']

  const live = 'TRUE' === env.FINANCIAL_EVIDENCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_EVIDENCE_TEST_AGENT_REVIEW_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FinancialEvidenceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
