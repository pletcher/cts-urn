declare interface PassageRef {
    ref: string;
    subRef?: string;
}
declare interface Passage {
    from: PassageRef;
    to?: PassageRef;
}
declare interface WorkComponent {
    exemplar?: string;
    textGroup: string;
    version?: string;
    work?: string;
}
declare interface URN {
    cts: string;
    ctsNamespace: string;
    passage?: Passage;
    urn: string;
    work: WorkComponent;
}
export declare function parsePassage(passage?: string): Passage | undefined;
export declare function parseWork(workComponent: string): WorkComponent;
export declare function parseUrn(rawUrn: string): URN;
export declare function serializePassage(passage?: Passage): string;
export declare function serializeWork(workComponent: WorkComponent): string;
export declare function serializeUrn(urnObj: URN): string;
export {};
