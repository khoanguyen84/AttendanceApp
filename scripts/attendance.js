class Student{
    constructor(id, fullname, avatar, status){
        this.id = id;
        this.fullname = fullname;
        this.avatar = avatar;
        this.status = status;
    }
}

const statusList = ["P", "A", "L"];
const defaultAvatar = 'assets/images/noavatar.jpg';
const attendance_data = "attendance_data";

var students = [];

function init(){
    if(localStorage.getItem(attendance_data) == null){
        students = [
            new Student(1, "Khanh Hoàng", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/200.jpg", "P"),
            new Student(2, "Lộc Lê", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/300.jpg", "A"),
            new Student(3, "Bình Trần", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/210.jpg", "L"),
            new Student(4, "Hướng Trần", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/110.jpg", "P"),
            new Student(5, "Tài Võ", "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/150.jpg", "A")
        ];
        localStorage.setItem(attendance_data, JSON.stringify(students));
    }
    else{
        students = JSON.parse(localStorage.getItem(attendance_data));
    }
}

function renderStudent(){
    let htmls = students.map(function(student, index){
        return `
            <div class="card">
                <img class="card-image" src="${student.avatar}" alt="">
                <h4 class="card-name">${student.fullname}</h4>
                <div class="card-attendence">
                    <button onclick="changeStatus(${student.id}, 'P')" class="btn-attendence ${student.status=='P'? 'active-p' : ''}">P</button>
                    <button onclick="changeStatus(${student.id}, 'A')" class="btn-attendence ${student.status=='A'? 'active-a' : ''}">A</button>
                    <button onclick="changeStatus(${student.id}, 'L')" class="btn-attendence ${student.status=='L'? 'active-l' : ''}">L</button>
                </div>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="editStudent(${student.id})">Edit</button>
                    <button class="btn btn-warning" onclick="removeStudent(${student.id})">Remove</button>
                </div>
            </div>
        `
    });
    document.querySelector('.student-list').innerHTML = htmls.join("");
}

function changeAvatar(){
    let avatarUrl = document.querySelector('#avatar').value;
    let avatarImage = document.querySelector('#avatar-img');
    if(avatarUrl.trim() != '' && avatarUrl != null){
        avatarImage.setAttribute("src", avatarUrl);
    }
    else{
        avatarImage.setAttribute("src", defaultAvatar);
    }
}

function addStudent(){
    let fullname = document.querySelector("#fullname").value;
    if(fullname == '' || fullname == null){
        alert('Fullname is required!');
        return;
    }
    let avatar = document.querySelector('#avatar').value;
    avatar = avatar == null || avatar.trim() == '' ? defaultAvatar : avatar;
    let status = statusList[0];
    let id = findLastStudentId() + 1;

    let student = new Student(id, fullname, avatar, status);

    students.push(student);
    localStorage.setItem(attendance_data, JSON.stringify(students));
    clearForm();
    renderStudent();
}

function findLastStudentId(){
    let max = 0;
    for(let i = 0; i < students.length; i++){
        if(students[i].id > max){
            max = students[i].id;
        }
    }   
    return max;
}

function getStudentById(studentId){
    let student = students.find(function(std){
        return std.id == studentId;
    })
    return student;
}

function getPositionById(studentId){
    let position = students.findIndex(function(std){
        return std.id == studentId;
    })
    return position;
}

function clearForm(){
    document.querySelector("#fullname").value = null;
    document.querySelector('#avatar').value = null;
    document.querySelector('#avatar-img').setAttribute('src', defaultAvatar);
}

function changeStatus(studentId, status){
    let student = getStudentById(studentId);
    student.status = status;
    localStorage.setItem(attendance_data, JSON.stringify(students));
    renderStudent();
}

function removeStudent(studentId){
    let student = getStudentById(studentId);
    let confirmed = window.confirm(`Are you sure to remove ${student.fullname}?`);
    if(confirmed){
        let position = getPositionById(studentId);
        students.splice(position, 1);
        localStorage.setItem(attendance_data, JSON.stringify(students));
        renderStudent();
    }

}

function editStudent(studentId){
    let student = getStudentById(studentId);
    document.querySelector('#btnAdd').classList.add('d-none');
    document.querySelector('#btnSave').classList.remove('d-none');
    document.querySelector('#btnCancel').classList.remove('d-none');

    document.querySelector('#studentId').value = student.id;
    document.querySelector("#fullname").value = student.fullname;
    document.querySelector('#avatar').value = student.avatar;
    document.querySelector('#avatar-img').setAttribute('src', student.avatar);
}

function cancel(){
    clearForm();
    document.querySelector('#btnAdd').classList.remove('d-none');
    document.querySelector('#btnSave').classList.add('d-none');
    document.querySelector('#btnCancel').classList.add('d-none');
    document.querySelector('#studentId').value = 0;
}

function saveStudent(){
    let studentId = Number(document.querySelector('#studentId').value);
    let oldStudent = getStudentById(studentId);
    let fullname = document.querySelector("#fullname").value;
    if(fullname == '' || fullname == null){
        alert('Fullname is required!');
        return;
    }
    let avatar = document.querySelector('#avatar').value;
    avatar = avatar == null || avatar.trim() == '' ? defaultAvatar : avatar;

    oldStudent.fullname = fullname;
    oldStudent.avatar = avatar;
    localStorage.setItem(attendance_data, JSON.stringify(students));
    renderStudent();
    cancel();
}

function main(){
    init();
    renderStudent();
}

main();