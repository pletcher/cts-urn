// http://cite-architecture.github.io/ctsurn_spec/
declare interface PassageRef {
  ref: string,
  subRef?: string,
}

declare interface Passage {
  from: PassageRef,
  to?: PassageRef,
}

declare interface WorkComponent {
  exemplar?: string,
  textGroup: string,
  version?: string,
  work?: string,
}

declare interface URN {
  cts: string,
  ctsNamespace: string,
  passage?: Passage,
  urn: string,
  work: WorkComponent,
}

export function parsePassage(passage?: string): Passage | undefined {
  if (passage) {
    const [passageFrom, passageTo] = passage.split('-')
    const [fromRef, fromSubRef] = passageFrom.split('@')

    const ret = {
      from: {
        ref: fromRef,
        subRef: fromSubRef,
      },
    }

    let to: { ref?: string, subRef?: string } = {}
    if (passageTo) {
      const [toRef, toSubRef] = passageTo.split('@')
      to.ref = toRef
      to.subRef = toSubRef
    }

    return ret
  }
}

export function parseWork(workComponent: string): WorkComponent {
  const [textGroup, work, version, exemplar] = workComponent.split('.')

  return {
    exemplar,
    textGroup,
    version,
    work,
  }
}

export function parseUrn(rawUrn: string): URN {
  const [urn, cts, ctsNamespace, work, passage] = rawUrn.split(':')

  return {
    cts,
    ctsNamespace,
    passage: parsePassage(passage),
    urn,
    work: parseWork(work),
  }
}

export function serializePassage(passage?: Passage): string {
  let passageString = ''
  if (passage) {
    const { from, to } = passage
    const fromRef = from.ref
    const fromSubRef = from.subRef ? `@${from.subRef}` : ''
    const fromString = `${fromRef}${fromSubRef}`

    let toRef = ''
    let toSubRef = ''

    if (to) {
      toRef = to.ref
      toSubRef = to.subRef ? `@${to.subRef}` : ''
    }

    const toString = toRef.length > 0 ? `-${toRef}${toSubRef}` : ''

    passageString = `:${fromString}${toString}`
  }

  return passageString
}

export function serializeWork(workComponent: WorkComponent): string {
  const { exemplar, textGroup, version, work } = workComponent

  let workString = textGroup
  if (work) {
    workString += `.${work}`

    if (version) {
      workString += `.${version}`

      if (exemplar) {
        workString += `.${exemplar}`
      }
    }
  }

  return workString
}

export function serializeUrn(urnObj: URN): string {
  const { cts, ctsNamespace, passage, urn, work: workComponent } = urnObj
  const workString = serializeWork(workComponent)
  const passageString = serializePassage(passage)

  return `${urn}:${cts}:${ctsNamespace}:${workString}${passageString}`
}