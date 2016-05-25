Dropzone.autoDiscover = false;

jQuery(document).ready(function()
{
	var $myDropZone	=	$("div#drag_drop_image_upload_div").dropzone(
						{
							url					: "file-upload.php",
							method				: 'POST',
							acceptedFiles		: 'image/*',
							dictDefaultMessage	: 'Drop images or click here to upload image',	//Default message shown in the drop div
							//uploadMultiple		: true,
							//parallelUploads		: 3,									//No of perallel file upload
							paramName			: 'file_param_received_in_server',			//Parameter will be received in Server Side
							headers				: {											//Pass extra variables on the time of processing
														"param1": "header value",
														"param2": "header value 2"
													},
							autoProcessQueue	: false, 								//Will process manually after all done
							maxFiles			: 10,									//Max no of files to be uploaded
							maxFilesize			: 1, 									// In MB
							dictFileTooBig		: 'Bigger than 1 MB image is not allowed',
							//dictMaxFilesExceeded: 'File size should be less than 1 MB',
							addRemoveLinks		: true,									//Enabling remove Link
							dictRemoveFile		: 'Remove This Image',
							dictCancelUpload	: 'Cancel Upload this Image',
							//dictCancelUploadConfirmation : true,						//Cancel upload confirmation
    						dictInvalidFileType	: 'Only image uploading allowed',
    						dictResponseError	: 'Server Error',
    						dictFallbackMessage	: 'Your Browser is Not Supported, Please Update Your Browser',
							init:function()
							{
								this.on("removedfile", function(file)	//Delete Function Implementation if needed
								{
									//alert('Removing '+ file.name);
									/*$.ajax(
									{
										type: 'POST',
										url: 'upload/delete',
										data: {id: file.name},
										dataType: 'html',
										success: function(data)
										{
											var rep = JSON.parse(data);
											if(rep.code == 200)
											{
												photo_counter--;
												$("#photoCounter").text( "(" + photo_counter + ")");
											}

										}
									});*/
								});
							},/*
							accept: function(file, done)
							{
								$(".dz-progress").remove();
							},*/
							success: function (file, response)
							{
								var imgName = response;
								file.previewElement.classList.add("dz-success");
								console.log("Successfully uploaded :" + imgName);
								$(".dz-progress").hide();
							}/*,
							error: function (file, response)
							{
								file.previewElement.classList.add("dz-error");
							}*/
						});

	$("#dropzone_form").submit(function(e)
	{
		e.preventDefault(e);
		$myDropZone[0].dropzone.processQueue();
		var files = $('#drag_drop_image_upload_div').get(0).dropzone.getAcceptedFiles();
		console.log(files);
	});
});


// https://tuts.codingo.me/laravel-5-1-and-dropzone-js-auto-image-uploads-with-removal-links
// https://arjunphp.com/how-to-use-dropzone-js-laravel-5/
// http://www.dropzonejs.com/#installation
// http://stackoverflow.com/questions/23956963/sending-additional-parameter-with-dropzone-js