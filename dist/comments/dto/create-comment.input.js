"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const comment_entity_1 = require("../entities/comment.entity");
let CreateCommentInput = class CreateCommentInput extends (0, graphql_1.OmitType)(comment_entity_1.Comment, [
    'id',
    'commentatorId',
]) {
};
CreateCommentInput = __decorate([
    (0, graphql_1.InputType)()
], CreateCommentInput);
exports.CreateCommentInput = CreateCommentInput;
//# sourceMappingURL=create-comment.input.js.map