import { FinancialEvidenceEntityBase } from '../FinancialEvidenceEntityBase';
import type { FinancialEvidenceSDK } from '../FinancialEvidenceSDK';
import type { Control } from '../types';
import type { Dataset, DatasetListMatch } from '../FinancialEvidenceTypes';
declare class DatasetEntity extends FinancialEvidenceEntityBase<Dataset> {
    constructor(client: FinancialEvidenceSDK, entopts: any);
    make(this: DatasetEntity): DatasetEntity;
    list(this: any, reqmatch?: DatasetListMatch, ctrl?: Control): Promise<DatasetEntity[]>;
}
export { DatasetEntity };
