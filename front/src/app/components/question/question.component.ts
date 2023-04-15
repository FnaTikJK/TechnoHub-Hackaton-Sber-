import {Component, Input} from '@angular/core';
import {IQuestion} from "../../models/IQuestion";
import {ICategory} from "../../models/ICategory";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question!: IQuestion;
  constructor() {
    this.question = {
      id: "3",
      title: "Title",
      meaning: "Meaning",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris" +
        " a tellus a metus rhoncus vestibulum. Curabitur sollicitudin, dui ut" +
        "interdum cursus, ex libero laoreet enim, egestas rhoncus turpis leo at" +
        " tellus. Morbi est ligula, dignissim eget euismod ac, luctus a mauris." +
        " Donec nec nunc tristique enim condimentum sodales ac malesuada nibh." +
        " Fusce consectetur purus vitae orci dictum volutpat. Class aptent taciti" +
        " sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos." +
        " Etiam nec nisi in elit tristique iaculis eu et ipsum. Pellentesque nec" +
        " ex id dui convallis imperdiet. Donec molestie nunc lorem, ac auctor libero " +
        "iaculis at. Vivamus molestie posuere nisl, in tempor purus cursus non. Aliquam " +
        "ac enim ex. Fusce maximus ipsum in eros ultrices, sit amet interdum odio scelerisque. Phasellus nec dui turpis.",
      category: 4 as any as ICategory,
      image: ""
    }
  }
  public answerText?: string;
  answerQuestion(){
    console.log(this.answerText);
  }
}
