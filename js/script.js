Dropzone.autoDiscover = false;

jQuery(document).ready(function()
{
	var $myDropZone	=	$("div#my-awesome-dropzone").dropzone(
						{
							url					: "file-upload.php",
							method				: 'POST',
							acceptedFiles		: 'image/*',
							dictDefaultMessage	: 'Drop images or click here to upload image',	//Default message shown in the drop div
							//uploadMultiple		: true,
							//parallelUploads		: 3,									//No of perallel file upload
							//paramName			: 'file_param_received_in_server',			//Max no of parallel upload
							headers				: {											//Pass extra variables on the time of processing
														"param1": "header value",
														"param2": "header value 2"
													},
							autoProcessQueue	: false, 								//Will process manually after all done
							maxFiles			: 10,									//Max no of files to be uploaded
							maxFilesize			: 1, 									// In MB
							dictFileTooBig		: 'Image is bigger than 1 MB',
							//dictMaxFilesExceeded: 'File size should be less than 1 MB',
							addRemoveLinks		: true,									//Enabling remove Link
							dictRemoveFile		: 'Remove This Image',
							dictCancelUpload	: 'Cancel Upload this Image',
							//dictCancelUploadConfirmation : true,						//Cancel upload confirmation
    						dictInvalidFileType	: 'Please upload only Image Under 1 MB',
    						dictResponseError	: 'Server Error',
    						dictFallbackMessage	: 'Your Browser is Not Supported, Please Update Your Browser',
							init:function()
							{
								this.on("removedfile", function(file)	//Delete Function Implementation if needed
								{
									$.ajax(
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
									});

								});
							},
							success: function (file, response)
							{
								var imgName = response;
								file.previewElement.classList.add("dz-success");
								console.log("Successfully uploaded :" + imgName);
								$(".dz-progress").remove();
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
		var files = $('#my-awesome-dropzone').get(0).dropzone.getAcceptedFiles();
		console.log(files);
	});
});


// https://tuts.codingo.me/laravel-5-1-and-dropzone-js-auto-image-uploads-with-removal-links
// https://arjunphp.com/how-to-use-dropzone-js-laravel-5/
// http://www.dropzonejs.com/#installation
// http://stackoverflow.com/questions/23956963/sending-additional-parameter-with-dropzone-js