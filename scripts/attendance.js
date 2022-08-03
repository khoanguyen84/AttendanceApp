class Student{
    constructor(id, fullname, avatar, status){
        this.id = id;
        this.fullname = fullname;
        this.avatar = avatar;
        this.status = status;
    }
}

const statusList = ["P", "A", "L"];

const students = [
    new Student(1, "Khanh Hoàng", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/200.jpg", "P"),
    new Student(2, "Lộc Lê", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/300.jpg", "A"),
    new Student(3, "Bình Trần", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/210.jpg", "L"),
    new Student(4, "Hướng Trần", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/110.jpg", "P"),
    new Student(5, "Tài Võ", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/150.jpg", "A")
]

function renderStudent(){
    let htmls = students.map(function(student, index){
        return `
            <div class="card">
                <img class="card-image" src="${student.avatar}" alt="">
                <h4 class="card-name">${student.fullname}</h4>
                <div class="card-attendence">
                    <button class="btn-attendence ${student.status=='P'? 'active-p' : ''}">P</button>
                    <button class="btn-attendence ${student.status=='A'? 'active-a' : ''}">A</button>
                    <button class="btn-attendence ${student.status=='L'? 'active-l' : ''}">L</button>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-warning">Remove</button>
                </div>
            </div>
        `
    });
    document.querySelector('.student-list').innerHTML = htmls.join("");
}

function main(){
    renderStudent();
}

main();