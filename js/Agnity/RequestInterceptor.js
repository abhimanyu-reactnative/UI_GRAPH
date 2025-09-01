/**
 *  Intercepting all ajax requests 
 */

if(localStorage.length > 0 || localStorage.length <= 0  )
{
	$.ajaxSetup ({
	    beforeSend: function (xhr) {
		    var data = Agnity.getLocalStorage('user');
		    if(data != null)
		    {
		      xhr.setRequestHeader('Authorization', 'Bearer '+ data.sessionId);
		    }
	    },
	    statusCode:{
		     403: function(xhr, status, error) {
		    
		    	if(xhr.status === 403)
		    	{
		    	    Agnity.clearLocalStorage();
		    	    var path = document.location.pathname.split('/');
			    	if(path[path.length-1] != 'Login.html')
			    	{
			    		Agnity.doRedirect('./Login.html');
			    	}
		    	}
		     }
	    }
	});
}
