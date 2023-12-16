import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{
  title: string = "";

  questions: any;
  questionSelected: any;

  answers:string[] = [];
  answerSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

    ngOnInit(): void{
      if(quizz_questions){
        this.finished = false
        this.title = quizz_questions.title;

        this.questions = quizz_questions.questions;
        this.questionSelected = this.questions[this.questionIndex];

        this.questionIndex = 0;
        this.questionMaxIndex = this.questions.length;
      }
    }

    playerChoose(value:string){
      this.answers.push(value);
      this.nextStep();
    }

    async nextStep(){
      this.questionIndex += 1;

      if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex];
      }else{
        const finalAnswer:string = await this.checkResult(this.answers);
        this.finished = true;
        this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
        console.log(this.answers);
      }
    }

    async checkResult(answers:string[]){

      const result = answers.reduce((previous, current, i, answersList)=>{
        //Compara e retorna o item com maior ocorrência no Array
        if(
          answersList.filter(answer => answer === previous).length >
          answersList.filter(answer => answer === current).length
        ){
          return previous;
        } else{
          return current;
        }
      });
        return result;
    }
}
