import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { Release, ReleaseLoadMatch } from '../FinancialEvidenceTypes';
declare class ReleaseEntity extends FinancialEvidenceEntityBase<Release> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: ReleaseEntity): ReleaseEntity;
    load(this: any, reqmatch?: ReleaseLoadMatch, ctrl?: Control): Promise<ReleaseEntity>;
}
export { ReleaseEntity };
