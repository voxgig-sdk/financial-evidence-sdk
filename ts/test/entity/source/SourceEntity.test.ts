

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


describe('SourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FINANCIAL_EVIDENCE_TEST_LIVE=TRUE.
  afterEach(liveDelay('FINANCIAL_EVIDENCE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FinancialEvidenceSDK.test()
    const ent = testsdk.Source()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('source hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of FinancialEvidenceSDK.test(offline).Source().stream('list')) { }
    }, /offline/)

    for await (const _item of FinancialEvidenceSDK.test(offline).Source()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = FinancialEvidenceSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Source().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of FinancialEvidenceSDK.test().Source().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new FinancialEvidenceSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Source().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Source().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FinancialEvidenceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Source().list({"absence_policy":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FINANCIAL_EVIDENCE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'source.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"absence_policy":{"a":true,"h":"Absence Policy","n":"absence_policy","r":true,"t":"`$STRING`","key$":"absence_policy","index$":0},"carrier_verification":{"a":true,"h":"Carrier Verification","n":"carrier_verification","r":true,"t":"`$STRING`","key$":"carrier_verification","index$":1},"dataset":{"a":true,"h":"Dataset","n":"dataset","r":true,"t":"`$STRING`","key$":"dataset","index$":2},"description":{"a":true,"h":"Description","n":"description","r":true,"t":"`$STRING`","key$":"description","index$":3},"diagnostics":{"a":true,"h":"Diagnostics","n":"diagnostics","r":true,"t":"`$ARRAY`","key$":"diagnostics","index$":4},"evidence_status":{"a":true,"h":"Evidence Status","n":"evidence_status","r":true,"t":"`$STRING`","key$":"evidence_status","index$":5},"limit":{"a":true,"h":"Limit","n":"limit","r":true,"t":"`$INTEGER`","key$":"limit","index$":6},"next_offset":{"a":true,"h":"Next Offset","n":"next_offset","r":true,"t":"`$ANY`","key$":"next_offset","index$":7},"offset":{"a":true,"h":"Offset","n":"offset","r":true,"t":"`$INTEGER`","key$":"offset","index$":8},"results":{"a":true,"h":"Results","n":"results","r":true,"t":"`$ARRAY`","key$":"results","index$":9},"returned_rows":{"a":true,"h":"Returned Rows","n":"returned_rows","r":true,"t":"`$INTEGER`","key$":"returned_rows","index$":10},"schema":{"a":true,"h":"Schema","n":"schema","r":true,"t":"`$STRING`","key$":"schema","index$":11},"sources":{"a":true,"h":"Sources","n":"sources","r":true,"t":"`$ARRAY`","key$":"sources","index$":12},"status_semantics":{"a":true,"h":"Status Semantics","n":"status_semantics","r":true,"t":"`$STRING`","key$":"status_semantics","index$":13},"total_rows":{"a":true,"h":"Total Rows","n":"total_rows","r":true,"t":"`$INTEGER`","key$":"total_rows","index$":14},"transport_status":{"a":true,"h":"Transport Status","n":"transport_status","r":true,"t":"`$STRING`","key$":"transport_status","index$":15}},"name":"source","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/v1/sources","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/v1/sources","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"v1"},{"lit":"sources"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"source","name__orig":"source","Name":"Source","name_":"source","name-":"source","NAME":"SOURCE","index$":6}, {"active":true,"entity":"source","key$":"BasicSourceFlow","kind":"basic","name":"BasicSourceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"source_ref01"}}],"index$":0}]}, 'Source', {"GET /api/v1/sources":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let source_ref01_data = Object.values(setup.data.existing.source)[0] as any

    // LIST
    const source_ref01_ent = client.Source()
    const source_ref01_match: any = {}

    const source_ref01_list = (await source_ref01_ent.list(source_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/source/SourceTestData.json')

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
    ['source01','source02','source03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FINANCIAL_EVIDENCE_TEST_SOURCE_ENTID': idmap,
    'FINANCIAL_EVIDENCE_TEST_LIVE': 'FALSE',
    'FINANCIAL_EVIDENCE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FINANCIAL_EVIDENCE_TEST_SOURCE_ENTID']

  const live = 'TRUE' === env.FINANCIAL_EVIDENCE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FINANCIAL_EVIDENCE_TEST_SOURCE_ENTID']
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
  
