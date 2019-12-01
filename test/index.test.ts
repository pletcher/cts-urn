import 'mocha'
import { expect } from 'chai'

import { parseUrn, serializeUrn } from '../src'

describe('parseUrn()', () => { 
  it('returns a fully parsed URN', () => {
    const testUrn = 'urn:cts:greekLit:tlg0012.tlg001.msA.thosJeff:1.2@οὐλομένην'
    const parsed = parseUrn(testUrn)

    expect(parsed.urn).to.equal('urn')
    expect(parsed.cts).to.equal('cts')
    expect(parsed.ctsNamespace).to.equal('greekLit')
    expect(parsed.work).to.deep.equal({
      exemplar: 'thosJeff',
      textGroup: 'tlg0012',
      version: 'msA',
      work: 'tlg001',
    })
    expect(parsed.passage).to.deep.equal({
      from: {
        ref: '1.2',
        subRef: 'οὐλομένην'
      },
    })
  })
})

describe('serializeUrn()', () => {
  it('returns a stringified URN', () => {
    const testUrn = {
      urn: 'urn',
      cts: 'cts',
      ctsNamespace: 'greekLit',
      work: {
        exemplar: 'thosJeff',
        textGroup: 'tlg0012',
        version: 'msA',
        work: 'tlg001',
      },
      passage: {
        from: {
          ref: '1.2',
          subRef: 'οὐλομένην'
        }
      }
    }
    const serialized = serializeUrn(testUrn)
    
    expect(serialized).to.equal('urn:cts:greekLit:tlg0012.tlg001.msA.thosJeff:1.2@οὐλομένην')
  })
})