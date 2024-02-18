"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeUrn = exports.serializeWork = exports.serializePassage = exports.parseWork = exports.parsePassage = void 0;
function parsePassage(passage) {
    if (passage) {
        const [passageFrom, passageTo] = passage.split('-');
        const [fromRef, fromSubRef] = passageFrom.split('@');
        const ret = {
            from: {
                ref: fromRef,
                subRef: fromSubRef,
            },
        };
        let to = {};
        if (passageTo) {
            const [toRef, toSubRef] = passageTo.split('@');
            to.ref = toRef;
            to.subRef = toSubRef;
        }
        return ret;
    }
}
exports.parsePassage = parsePassage;
function parseWork(workComponent) {
    const [textGroup, work, version, exemplar] = workComponent.split('.');
    return {
        exemplar,
        textGroup,
        version,
        work,
    };
}
exports.parseWork = parseWork;
function parseUrn(rawUrn) {
    const [urn, cts, ctsNamespace, work, passage] = rawUrn.split(':');
    return {
        cts,
        ctsNamespace,
        passage: parsePassage(passage),
        urn,
        work: parseWork(work),
    };
}
exports.default = parseUrn;
function serializePassage(passage) {
    let passageString = '';
    if (passage) {
        const { from, to } = passage;
        const fromRef = from.ref;
        const fromSubRef = from.subRef ? `@${from.subRef}` : '';
        const fromString = `${fromRef}${fromSubRef}`;
        let toRef = '';
        let toSubRef = '';
        if (to) {
            toRef = to.ref;
            toSubRef = to.subRef ? `@${to.subRef}` : '';
        }
        const toString = toRef.length > 0 ? `-${toRef}${toSubRef}` : '';
        passageString = `:${fromString}${toString}`;
    }
    return passageString;
}
exports.serializePassage = serializePassage;
function serializeWork(workComponent) {
    const { exemplar, textGroup, version, work } = workComponent;
    let workString = textGroup;
    if (work) {
        workString += `.${work}`;
        if (version) {
            workString += `.${version}`;
            if (exemplar) {
                workString += `.${exemplar}`;
            }
        }
    }
    return workString;
}
exports.serializeWork = serializeWork;
function serializeUrn(urnObj) {
    const { cts, ctsNamespace, passage, urn, work: workComponent } = urnObj;
    const workString = serializeWork(workComponent);
    const passageString = serializePassage(passage);
    return `${urn}:${cts}:${ctsNamespace}:${workString}${passageString}`;
}
exports.serializeUrn = serializeUrn;
