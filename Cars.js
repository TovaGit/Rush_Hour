let mat;
let userStorage
let newBoard;
let data
class Cars{
    constructor(id, boardTop, boardLeft, direction, sumSquares , picture)
    {
    this.id=id;
    this.boardTop=boardTop
    this.boardLeft=boardLeft
    this.direction=direction
    this.sumSquares=sumSquares
    this.picture=picture
}
}
class RedCar extends Cars
{
    constructor(id, boardTop, boardLeft, direction, sumSquares , picture){
    super(id, boardTop, boardLeft, direction, sumSquares , picture)
    }
 GoOut=()=>
 {
    localStorage.removeItem(JSON.parse(localStorage.getItem("userId")))
    window.location.href="winner.html"
 }
}
class Board
{
    constructor(cars,SizeOfSlot, AmountOfSlots,ExitPoint)
    {
        this.cars=cars
        this.SizeOfSlot=SizeOfSlot
        this.AmountOfSlots=AmountOfSlots
        this.ExitPoint=ExitPoint
    }
printBoard=()=>{
    let a=document.getElementById("board");
    let b=Math.sqrt(newBoard.AmountOfSlots)*newBoard.SizeOfSlot+"px";
    a.style.width=b;
    a.style.height=b;
    console.log(newBoard.cars)
    newBoard.cars.forEach(element=>{
    let car=document.createElement("button");
    car.setAttribute("id",element.id)
    car.classList.add("car")
    car.style.top=(element.boardTop*newBoard.SizeOfSlot)+"px";
    car.style.left =(element.boardLeft*newBoard.SizeOfSlot)+"px";
    if(element.direction==="across")
    {
        car.style.width=(element.sumSquares*newBoard.SizeOfSlot)+"px";
        car.style.height=newBoard.SizeOfSlot+"px";
    }
    else{
        car.style.height=(element.sumSquares*newBoard.SizeOfSlot)+"px";
        car.style.width=100+"px";
    }
    car.addEventListener("click",()=>{Selected(car)})
    car.style.backgroundImage="url("+element.picture+")";
    a.appendChild(car)})
}
checkWIn=(cars)=>{
    if(cars.id==="redCar")
    {
        if(cars.boardLeft==4)
        
        return true
    }
}
}
let name;
getUserName =async ()=>
 {
    let flag=false
    let name=document.getElementById("name").value
    const pwd=document.getElementById("pwd").value

    let res =await fetch("user.json")
    let data=await res.json();
    console.log( data);
    data.user.forEach(arr => {
        if(name===arr.name && pwd===arr.pwd)
        {
           flag=true
           localStorage.setItem("userId",pwd.toString())
           userStorage=pwd.toString()
        }
           
    });
    if(!flag)
    {
        alert("Sorry You Dont Have Permission To Enter This Game")
    }
    else
    {
        window.location.href="Board.html"
    }
    
 }
 StartGame=async()=>
 {
    let res =await fetch("Board.json")
    let data=await res.json();
    let newArrayCar = [];
    data.cars.forEach(arr => {
        if(arr.id!="red car")
        {
            let newCar = new Cars(arr.id, arr.boardTop, arr.boardLeft, arr.direction, arr.sumSquares, arr.picture)
            newArrayCar.push(newCar)
        }
        else
        {
            let newRedCar = new RedCar(arr.id, arr.boardTop, arr.boardLeft,arr.direction, arr.sumSquares, arr.picture)
            newArrayCar.push(newRedCar)
        }
    })
    newBoard = new Board(newArrayCar,data.SizeOfSlot,data.AmountOfSlots,data.ExitPoint);
    if (localStorage.getItem(localStorage.getItem("userId")) !== null)
   {
    loadSaveBoard();
    printMat();
    newBoard.printBoard();
   }
   else{
    printMat();
    newBoard.printBoard();
   }
}
    let selectedId;
    let carSelected;
    let tmp_car;
    Selected = (car) =>
    {
        let classSelected=document.getElementsByClassName("carSelected");
        if(classSelected[0])
        classSelected[0].classList.remove("carSelected")
        tmp_car=car;
        selectedId=car.id;
    newBoard.cars.forEach(element=>{
        if(element.id===selectedId)
        {   
            car.classList.add("carSelected")
            carSelected=element;
        }      
    })
    }
    moveUp=()=>
    {   
    if((carSelected.boardTop-1)>=0 && mat[carSelected.boardTop-1][carSelected.boardLeft ]===false && carSelected.direction==="along")
    {
        tmp_car.style.top=(carSelected.boardTop*newBoard.SizeOfSlot)-newBoard.SizeOfSlot+"px";
        mat[carSelected.boardTop-1][carSelected.boardLeft]=true;
        mat[carSelected.boardTop+(carSelected.sumSquares-1)][carSelected.boardLeft]=false;
        carSelected.boardTop=carSelected.boardTop-1;
    }
    }
    moveDown=()=>
    {
        if((carSelected.boardTop+1)<=5 && mat[carSelected.boardTop+carSelected.sumSquares][carSelected.boardLeft]===false && carSelected.direction==="along")
        {
            tmp_car.style.top=(carSelected.boardTop*newBoard.SizeOfSlot)+newBoard.SizeOfSlot+"px";
            mat[carSelected.boardTop+carSelected.sumSquares][carSelected.boardLeft]=true;
            mat[carSelected.boardTop][carSelected.boardLeft]=false;
            carSelected.boardTop=carSelected.boardTop+1;
        }
    }
    moveRight=()=>
    { 
        if(newBoard.checkWIn(carSelected)==true)
        {
            tmp_car.style.left=(carSelected.boardLeft*newBoard.SizeOfSlot)+newBoard.SizeOfSlot+"px";
           tmp_car=new RedCar(tmp_car.id, tmp_car.boardTop, tmp_car.boardLeft, tmp_car.direction, tmp_car.sumSquares , tmp_car.picture)
           tmp_car.GoOut();
        }
        else if((carSelected.boardLeft+1)<=5 && mat[carSelected.boardTop][carSelected.boardLeft+carSelected.sumSquares]===false && carSelected.direction==="across")
        {
            tmp_car.style.left=(carSelected.boardLeft*newBoard.SizeOfSlot)+newBoard.SizeOfSlot+"px";
            mat[carSelected.boardTop][carSelected.boardLeft +carSelected.sumSquares]=true;
            mat[carSelected.boardTop][carSelected.boardLeft]=false;
            carSelected.boardLeft=carSelected.boardLeft+1;
        }
    }
    moveLeft=()=>
    {
        if((carSelected.boardLeft-1)>=0 && mat[carSelected.boardTop][carSelected.boardLeft-1]===false && carSelected.direction==="across")
        {
            tmp_car.style.left=(carSelected.boardLeft*newBoard.SizeOfSlot)-newBoard.SizeOfSlot+"px";
            mat[carSelected.boardTop][carSelected.boardLeft-1]=true;
            mat[carSelected.boardTop][carSelected.boardLeft+carSelected.sumSquares-1]=false;
            carSelected.boardLeft=carSelected.boardLeft-1;
        }
    }

    SaveLocal  = () => {
        let tmp=localStorage.getItem("userId")
         let a= JSON.parse(tmp)
         userStorage=a
        let tmp_Storage=JSON.stringify(newBoard);
        let save=localStorage.setItem(userStorage,tmp_Storage)
        
    }
    loadSaveBoard=()=>
    {
       let stringObj = localStorage.getItem(localStorage.getItem("userId"));
       let a= JSON.parse(stringObj);
       newBoard.cars=a.cars
       return newBoard
    }
     StopLocal=()=>
    {
        window.location.href="stop.html"
    }
    printMat=()=>
    {
    mat = Array.from(Array(6), () => new Array(6).fill(false));
    newBoard.cars.forEach(element=>{
        if(element.direction==="along")
        {
            for(let i=element.boardTop;i<element.sumSquares+element.boardTop;i++)
            {
                mat[i][element.boardLeft]=true;
            }
        }
        else
        {
            for(let i=element.boardLeft;i<element.sumSquares+element.boardLeft;i++)
            {
                mat[element.boardTop][i]=true;
            }
        }
    })
    return mat
}