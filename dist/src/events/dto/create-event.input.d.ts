import { Event } from '../entities/event.entity';
declare const CreateEventInput_base: import("@nestjs/common").Type<Omit<Event, "id" | "userId">>;
export declare class CreateEventInput extends CreateEventInput_base {
}
export {};
