const ourList = document.getElementById ("todo-items");

//add a new placeholder to the list
var newItem = document.createElement("li");
newItem.append ("doodie")
ourList.appendChild(newItem);

//access the API to get tasks
fetch("http://localhost:3001/api/tasks/").then(async (res)=> {
    console.log ("Success!",res)
    const tasks = await res.json();

    //clear out placeholders
    ourList.innerHTML = ""

    //add each task to the list
    tasks.forEach((task) => {
        var newItem = document.createElement("li");
        newItem.append (task.name);
        ourList.appendChild(newItem);
    })
}).catch((e) => {
    console.log ("Failure!",e)
});
