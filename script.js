display_task();
document.getElementById("input-user").focus();
document.getElementById("add-task").addEventListener("click",store_input);
var up = 0,t_id="";

//delete all 
document.getElementById("delete-all").addEventListener("click",function(){
    localStorage.removeItem("todos");
    if(up==1) {
        up=0;
        document.getElementById("add-task").innerText="Add Task";
    }
    display_task();
    document.getElementById("input-user").value="";
    document.getElementById("input-user").focus();
});




function store_input() {
    var input_u = document.getElementById("input-user").value.trim();
    if(input_u == "") {
        alert("Enter Your Task");
    }
    else {
        var todo=[];
        var localstr = localStorage.getItem("todos");
        if(up!=1) {
            if(localstr != null && JSON.parse(localstr).length!=0) {
                todo = JSON.parse(localstr);
            }
    
            //date
            var now = new Date();
            var date = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear()+":"+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+":"+now.getMilliseconds();
    
            ele_obj = {
                task_id:date,
                task_data:input_u
            };
            
            todo.push(ele_obj);
        }
        else if(up==1){
            todo = JSON.parse(localstr);

            for(var i=0;i<todo.length;i++) {
                if(todo[i].task_id == t_id) {
                    todo[i].task_data = input_u;
                }
            }
            document.getElementById("add-task").innerText="Add Task";
            up=0;
        }

        localStorage.setItem("todos",JSON.stringify(todo));

        display_task();
        document.getElementById("input-user").value="";
    }
    document.getElementById("input-user").focus();
}

document.body.addEventListener('keypress', function(event) {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        store_input();
    }
});



function display_task() {
    var localstr = localStorage.getItem("todos");
    var elements="<tr id='firste'><th scope='col'>Task No.</th><th scope='col'>Task Name</th><th scope='col'>Edit Task</th><th scope='col'>Delete Task</th></tr>";
    if(localstr == null || JSON.parse(localstr).length==0) {
        empty_style(elements);
    }
    else {
        normal_style();
        var todo = JSON.parse(localstr);
        
        for(var i=0;i<todo.length;i++) {
            elements += "<tr><th scope='row'>"+(i+1)+"</th><td><span>"+todo[i].task_data+"</span><span class='hide_ele'>"+todo[i].task_id+"</span></td><td><span onclick='edit_task_data(this)' class='material-icons'>edit_note</span></td><td><span onclick='delect_element(this)' class='material-icons'>delete</span></td></tr>";
        }
        document.querySelector("table").innerHTML=elements;
    }
}

function edit_task_data(e) {
    var p_e = e.parentElement;
    var prev_e_s = p_e.previousElementSibling;
    var d1 = prev_e_s.firstElementChild.innerText;
    var d2 = prev_e_s.lastElementChild.innerText;

    document.getElementById("input-user").value=d1;
    document.getElementById("add-task").innerText="Update Task";
    up=1;
    t_id = d2;
}

function delect_element(e) {
    var p_e = e.parentElement;
    var main_p_e =  p_e.parentElement;
    var prev_e_s = main_p_e.children[1];
    var ele_id = prev_e_s.lastElementChild.innerText;
    
    var todo = JSON.parse(localStorage.getItem("todos"));

    for(var i=0;i<todo.length;i++) {
        if(todo[i].task_id == ele_id) {
            todo.splice(i,1);
        }
    }

    localStorage.setItem("todos",JSON.stringify(todo));

    if(up==1) {
        up=0;
        document.getElementById("add-task").innerText="Add Task";
        document.getElementById("input-user").value="";
    }
    document.getElementById("input-user").focus();
    display_task();
}




//empty table display style
function empty_style(helements) {
    //create empty element
    var empty_ele = helements+"<tr id='laste' class='bg-danger bg-gradient text-white'><th id='empty_e' colspan='4' style=background: 'red';>No Task Assigned</th></tr>";

    //add empty element
    document.querySelector("table").innerHTML=empty_ele;

    //remove existing class value in table element
    document.querySelector("table").classList.remove("table-dark", "table-striped", "table-hover");

    //add class value in table element
    document.querySelector("table").classList.add("table-borderless");

    //table header background-color and text color set
    document.querySelector("#firste").classList.add("bg-dark", "text-white");
}

//normal table display style
function normal_style() {

    document.querySelector("table").classList.remove("table-borderless");//remove table element class value : table-borderless

    document.querySelector("table").classList.add("table-dark", "table-striped", "table-hover");//add table element class value : "table-dark","table-striped","table-hover"
}