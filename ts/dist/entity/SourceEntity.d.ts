import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { Source, SourceListMatch } from '../FinancialEvidenceTypes';
declare class SourceEntity extends FinancialEvidenceEntityBase<Source> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: SourceEntity): SourceEntity;
    list(this: any, reqmatch?: SourceListMatch, ctrl?: Control): Promise<SourceEntity[]>;
}
export { SourceEntity };
