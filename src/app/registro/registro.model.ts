export class Registro{
    sort(arg0: (a: Registro, b: Registro) => number): Registro[] {
        throw new Error('Method not implemented.');
      }
      title: string;
      text: string;
      likes: number;
      dislikes: number;
  
      constructor(title:string,text:string,likes?:number,dislikes?:number){
          this.title = title;
          this.text = text;
          this.likes=likes || 0;
          this.dislikes=dislikes || 0;
      }
  
      positibe():void{
          this.likes += 1;
      }
  
      negative():void{
          this.likes -= 1;
      }
}