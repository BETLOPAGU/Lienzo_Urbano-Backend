import { Comment } from '../entities/comment.entity';
declare const CreateCommentInput_base: import("@nestjs/common").Type<Omit<Comment, "id" | "commentatorId">>;
export declare class CreateCommentInput extends CreateCommentInput_base {
}
export {};
