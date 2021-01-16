
type DiffKind =
    "N" /** indicates a newly added property/element*/ |
    "D" /** indicates a property/element was deleted*/ |
    "E" /** indicates a property/element was edited */ |
    "A" /** indicates a property/element was edited */

/**
 * Diff
 */
export interface Diff {
    kind: DiffKind;
    path: string[];
    index?: number;
    lhs?: string | object;
    rhs?: string | object;
    item?: {
        kind?: DiffKind;
        lhs?: string | object;
        rhs?: string | object;
    };
}