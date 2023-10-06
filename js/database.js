$(document).ready(function() {
    $('#scores-shown').DataTable({   
     "processing":true, 
     "ajax":"/api/submission/show-submissions",
     'order': [[0, 'asc']],
     'scrollY': '500px', 
     'scrollCollapse': true,
     'paging': false, 
     'fixedColumns': true,
     'search': {
         return: true,
     },
     "columns":[
       {"data":"rank"},
       {"data":"identifier", 
        'render': function(data, type, row){
             output = "<a href=docs/" + data['code'] + ">" + data['method'] + "</a>"
             return output
        }
       },
       {"data":"official_links", 
        'render': function(data, type, row){
             output = ''
             if (data['paper_url'].length > 0) {
                 output = output + '<a href=' + data['paper_url'] + '> <i class="fa fa-file-pdf-o"> pdf</i> </a>'
             }
             if (data['code_url'].length > 0) {
                 output = output + '<a href=' + data['code_url'] + '> <i class="fa fa-github"> code</i> </a>'
             }
             return output
        }
       },
       {"data":"error"
       },
       {"data":"date"},
       
     ],
     
   })
   
   function auth_checker(url, data){
    $.ajax({
        url:url,
        dataType:'json',
        method:'post',
        data:JSON.stringify(data),
        contentType:"application/json, charset=utf-8"

    }).done(function(r) {
        if(r.status == 'fail') {
            $('#message').html(r['errors'])
        }else{
            if (url == '/api/login') { 
                $('#message').html('<p>Success, redirecting</p>')
                window.location.href = '/'
            }else{
                $('#message').html('<p>Registered, you can <a href="/auth/login" class="text-info">login now</a></p>')
            }
        }
    }
    )
}

   $('#login').on('click', function() {
        $('#message').html('Logging in ...')
        inputs = document.getElementsByTagName('input')
        data_log = {}
        for(var x=0; x < inputs.length;x ++ ){
            data_log[
                inputs[x].name
            ] = inputs[x].value
        }
        auth_checker('/api/login', data_log)

    })
    $('#register').on('click', function() {
        $('#message').html('<p>registering ...')
        inputs = document.getElementsByTagName('input')
        data_reg = {}
        for(var x=0; x < inputs.length;x ++ ){
            data_reg[
                inputs[x].name
            ] = inputs[x].value
        }
        auth_checker('/api/add-account', data_reg)
        
    })

 })
 
 
 
