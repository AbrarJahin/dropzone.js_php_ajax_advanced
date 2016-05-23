Dropzone.autoDiscover = false;

jQuery(document).ready(function()
{
	var $myDropZone	=	$("div#my-awesome-dropzone").dropzone(
						{
							url					: "file-upload.php",
							method				: 'POST',
							//parallelUploads		: 3, 		//Max no of AJAX calls
							autoProcessQueue	: false, 	//Will process manually after all done
							maxFiles			: 10,	
							maxFilesize			: 1, 		// MB
							addRemoveLinks		: true,
							thumbnail: function (file, response)
							{
								$(".dz-progress").remove();	//Remove the progress bar
							},
							success: function (file, response)
							{
								var imgName = response;
								file.previewElement.classList.add("dz-success");
								console.log("Successfully uploaded :" + imgName);
								$(".dz-progress").remove();
							},
							error: function (file, response)
							{
								file.previewElement.classList.add("dz-error");
							}
						});

	$("#dropzone_form").submit(function(e)
	{
		e.preventDefault(e);
		$myDropZone[0].dropzone.processQueue();
		var files = $('#my-awesome-dropzone').get(0).dropzone.getAcceptedFiles();
		console.log(files);
	});
});