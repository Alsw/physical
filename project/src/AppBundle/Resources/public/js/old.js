  var action;
    $(function(){
      $("tbody").on('click', "[name=delete]", function(event) {
        event.preventDefault();
        var thisTr = $(this).parent().parent();
        thisTr.remove();
        var id = thisTr.children().eq(0).text();
        $.ajax({
         url: 'index.php?controller=user&action=del',
         type: 'POST',
         dataType: 'json',
         data: {id: id},
        })
        .done(function(data) {
         if (data.status == "1") {
          layer.msg('已删除', {time: 1000, icon:1});
         }
        });
      });
      $("tbody").on('click', "[name=update]", function(event) {
        event.preventDefault();
        var id = $(this).parent().parent().children('td:first').text();
        console.log(id);
        $.ajax({
          url: 'index.php?controller=user&action=modify',
          type: 'POST',
          dataType: 'json',
          data: {id: id},
        })
        .done(function(data) {
          if (data.status == "1") {
            $("input[name=id]").val(data.data.id);
            $("input[name=username]").val(data.data.username);
            $("input[name=sex]").val(data.data.sex);
            $("input[name=age]").val(data.data.age);
            $("textarea[name=introduce]").val(data.data.introduce);
            action = 'modify';
            $("#myModalLabel").text('修改用户信息');
            // $("#addArea").show();
          }
        });
      });
      $('#addBtn').on('click', function(event) {
        action = 'add';
        $("#myModalLabel").text('添加用户信息');
      });
      $('#submitBtn').on('click', function(event) {
        event.preventDefault();
        $('#addModal').modal('hide')
        $.ajax({
          url: 'index.php?controller=user&action='+action,
          type: 'POST',
          dataType: 'json',
          data: $('#addForm').serialize(),
        })
        .done(function(data) {
          if (data.status == "1") {
            if (action == 'add') {
              var html = 
              '<tr>'+
                '<td>'+data.data.id+'</td>'+
                '<td>'+data.data.username+'</td>'+
                '<td>'+data.data.sex+'</td>'+
                '<td>'+data.data.age+'</td>'+
                '<td>'+data.data.introduce+'</td>'+
                '<td>'+
                  '<button name="update" class="btn btn-info" data-toggle="modal" data-target="#addModal">'+
                    '修改'+
                  '</button>'+
                  '<button name="delete" class="btn btn-danger">删除</button>'+
                '</td>'+
              '</tr>';
              $("table tbody").append(html);
              layer.msg('添加用户成功', {time: 2000, icon:1});
            } else if (action == 'modify') {
              $("tbody tr").each(function() {
                 if ($(this).children().eq(0).text() == data.data.id) {
                  $(this).children().eq(1).text(data.data.username);
                  $(this).children().eq(2).text(data.data.sex);
                  $(this).children().eq(3).text(data.data.age);
                  $(this).children().eq(4).text(data.data.introduce);
                 }
              });
              layer.msg('修改用户成功', {time: 1000, icon:1});             
            }
          } else if (data.status == "0") {
            layer.msg('失败', {time: 1000, icon:2});
          }
        });     
      });
    });