
let words = [['Gato', 'cat'], ['Casa', 'house']];
let randoms = ['luke','jake','lynn','mommy','daddystinkybutt'];

let questions = [
    {
      title: 'gato',
      alternatives: ['dog', 'cat', 'bird', 'fish'],
      correctAnswer: 1
    },
    {
      title: 'ave',
      alternatives: ['mouse', 'hamster', 'lizard', 'bird'],
      correctAnswer: 3
    },
    {
      title: 'rata',
      alternatives: ['cat', 'fish', 'rat', 'shark'],
      correctAnswer: 2
    },
    {
      title: 'mosca',
      alternatives: ['fly', 'puma', 'fish', 'dog'],
      correctAnswer: 0
    }
  ];

let object = document.getElementById('title');
let button = document.getElementById('btn');
let score_button = document.getElementById('score');
let fail_button = document.getElementById('fail');
let message = document.getElementById('answer');
let load = document.getElementById('load');

let question = {
    question_word : 'Gato',
    alternatives : ['cat', 'dog', 'something', 'what'],
    correct_answer : 'something',
    correct_index : 0,
};

let app = {
    start: function(){
        let alternatives = document.querySelectorAll('.alternative');
        this.current_question_index = 0;
        this.score = 0;
        this.fail = 0;

        alternatives.forEach((element, index) => {
            element.addEventListener('click', () => {
                console.log('checking answer');
                this.check_answer(index);
            });
        });

        load.addEventListener('click', () =>{
            this.current_question_index += 1;
            this.load_question(this.current_question_index%questions.length);
        });

        this.load_question(this.current_question_index);
    },

    update_score: function(){
        score_button.textContent = 'correct : ' + this.score;
        fail_button.textContent = 'fail : ' + this.fail;
    },

    check_answer: function(index){
        if(this.current_question.correct_index == index){
            this.score += 1;
            console.log('correct answer: ', index);
            message.textContent = this.current_question.alternatives[index] + ' was correct!!!';
        } else {
            console.log('wrong answer: ', index);
            message.textContent = this.current_question.alternatives[index] + ' was incorrect!!!';
            this.fail += 1;
        }
        this.update_score();
    },

    show_question: function(q, randoms){
        object.textContent = q.question_word;
        let alternatives = document.querySelectorAll('.alternative');
        this.current_question = q
        // let correct = 0;
        // alternatives.forEach(function(element, index, alternatives){
        //     if(index == q.correct_index){
        //         element.textContent = q.correct_answer;
        //         correct = index;
                
        //     } else {
        //         element.textContent = randoms[q.alternatives[index]];
        //     }
        // });
        // this.current_question.correct_index = correct;

        message.textContent = '?';
        alternatives.forEach(function(element, index){
            element.textContent = q.alternatives[index];
        });
    },

    load_question: function(num_question){
        console.log('load question', num_question);
        question.question_word = questions[num_question].title;
        question.correct_index = questions[num_question].correctAnswer;
        question.alternatives  = questions[num_question].alternatives;
        // question.correct_index = get_rand_int(0,3);
        // question.alternatives[0] = get_rand_int(0, randoms.length -1);
        // question.alternatives[1] = get_rand_int(0, randoms.length -1);
        // question.alternatives[2] = get_rand_int(0, randoms.length -1);
        // question.alternatives[3] = get_rand_int(0, randoms.length -1);
        this.show_question(question, randoms, question);
    },
   
};

function get_rand_int(min, max){
    Math.ceil(min);
    Math.floor(max);
    return Math.floor(Math.random() * (max-min+1) + min);
};

app.start();

