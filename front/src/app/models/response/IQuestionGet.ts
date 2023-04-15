import {IQuestion} from "../IQuestion";
import {GUID} from "../DTO/GUID";
export {IQuestion};

export interface IQuestionGet{
  normalQuestionsCount: number;
  roflQuestionsFrequency: number;
  usedQuestions: GUID[];
}
