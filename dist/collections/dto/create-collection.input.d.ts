import { Collection } from '../entities/collection.entity';
declare const CreateCollectionInput_base: import("@nestjs/common").Type<Omit<Collection, "id" | "userId">>;
export declare class CreateCollectionInput extends CreateCollectionInput_base {
}
export {};
