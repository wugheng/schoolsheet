let readlineSync = require('readline-sync');
// module.exports = () => {
//     Ondisplay();
// }
let sinon = require("sinon");
Ondisplay();

function Ondisplay(){
    let information=[];
    let index=0;
    while(index!==3){
        console.log(`1. 添加学生
2. 生成成绩单
3. 退出
`);
        index = readlineSync.question('请输入你的选择（1～3）：');
        if(index==='1'){
            let str=inputinf();
            let obj=revert(str);
            information.push(obj);
        }
        else if(index==='2'){
            let num=inputsch();
            print(information,num);
        }
        else if(index==='3'){
            return;
        }
    }
}

function inputinf() {
    let message = readlineSync.question('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：');
    let only=message.split(",");
    let reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(only[0])||!reg.test(only[1])||reg.test(only[2])||!reg.test(only[3])) {
        message=readlineSync.question('请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：');
        only=message.split(",");
    }
    let string='学生'+only[0]+'的成绩被添加';
    console.log(string);
    return only;
}

function inputsch() {
    let schoolnumber=readlineSync.question('请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
    let num=schoolnumber.split(",");
    for(let i=0;i<num.length;i++){
        let reg = /^[0-9]+.?[0-9]*$/;
        if(!reg.test(num[i])){
            schoolnumber=readlineSync.question('请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
            num=schoolnumber.split(",");
        }
    }
    return num;
}

function revert(string) {
    let marks={};
    marks.name=string[0];
    marks.schnumber=string[1];
    let sum=0,ave=0;
    for(let i=4;i<string.length;i++){
        let mark=string[i].split(":");
        if(mark[0]==="数学"){
            marks.math=mark[1];
        }
        else if(mark[0]==="语文"){
            marks.Chinese=mark[1];
        }
        else if(mark[0]==="英语"){
            marks.English=mark[1];
        }
        else{
            marks.technology=mark[1];
        }
        sum+=parseInt(mark[1]);
        marks.sum=sum;
        marks.ave=sum/4;
    }
    return marks;
}

function print(information,num){
    let allsum=0,allave=0;
    let realnum=[];
    let string='成绩单\n' +
        '姓名|数学|语文|英语|编程|平均分|总分 \n' +
        '========================\n';
    for(let i=0;i<information.length;i++){
        for(let j=0;j<num.length;j++){
            if(information[i].schnumber===num[j]){
                string+=information[i].name+'|'+information[i].math+'|'+information[i].Chinese+'|'+information[i].English+'|'+information[i].technology+'|'+information[i].ave.toString()+'|'+information[i].sum.toString()+'\n';
                allsum+=information[i].sum;
                realnum.push(information[i].sum);
            }
        }
    }
    allave=allsum/realnum.length;
    let arr=realnum.sort(function(a,b)
        {return a-b;}
    );
    let lowmiddle=Math.floor((arr.length-1)/2);
    let highmiddle=Math.ceil((arr.length-1)/2);
    let median= (Number(arr[lowmiddle])+Number(arr[highmiddle]))/2;
    string+='========================\n' +
        '全班总分平均数：'+allave.toString()+'\n' +
        '全班总分中位数：'+median.toString();
    console.log(string);
}