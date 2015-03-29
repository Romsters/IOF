$(document).ready(function(){
    $('.submit', '.create-student-form').bind('click', function(){
        var student = $('.student', '.create-student-form').val();
        if(!student || !student.length || !student.length > 10){
            alert('Данные введены не корректно!');
            return;
        }
        $.ajax({
            url: "/admin/createStudent",
            dataType: "json",
            method: "POST",
            data: {
                student: student
            }
        }).success(function(data){
           if(data.error){
               alert(data.error);
           }
           window.location.reload(true);
        }).error(function(data){
            alert('Ошибка...Перезагрузите страницу...');
        });
    });

    $('.remove-student-btn', '.list-students').bind('click', function(){
        var studentToDeleteParent = $(this).closest('.list-students-item'),
            studentToDelete = $('.student-name', studentToDeleteParent)[0].innerText;

        if(!studentToDelete){
            alert('Ошибка...Перезагрузите страницу...');
            return;
        }
        $.ajax({
            url: "/admin/deleteStudent",
            dataType: "json",
            method: "POST",
            data: {
                student: studentToDelete
            }
        }).success(function(data){
            if(data.error){
                alert(data.error);
            }
            window.location.reload(true);
        }).error(function(data){
            alert('Ошибка...Перезагрузите страницу...');
        });
    });
});
