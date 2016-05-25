<?php

	include 'config.php';
	$upload_dir = 'myuploads';
	function insert_data($ar)
	{
		$obj=new DB();
		$key="(f_name , f_size, f_link,f_type,d_date)";
		$val="('{$ar['fname']}', '{$ar['fsize']}','{$ar['flink']}','{$ar['ftype']}','{$ar['fdate']}')";
		mysqli_query($obj->connection(),"INSERT INTO  file_upload ".$key." VALUES ".$val);
		//mysqli_close($obj->con);
	}

	if (!empty($_FILES))
	{
		$tempFile = $_FILES['file_param_received_in_server']['tmp_name'];
		// using DIRECTORY_SEPARATOR constant is a good practice, it makes your code portable.
		$targetPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . $upload_dir . DIRECTORY_SEPARATOR;  
		// Adding timestamp with image's name so that files with same name can be uploaded easily.
		$fname =  $targetPath.time().'-'. $_FILES['file_param_received_in_server']['name'];  
		$file_name=time().'-'. $_FILES['file_param_received_in_server']['name'];
		$ftype=$_FILES["file"]["type"];
		$fsize=($_FILES["file"]["size"] / 1024);
		$tmpname=$_FILES["file"]["tmp_name"];
		$flink='http://localhost/dragdrop%20file%20upload/myuploads/'.$file_name;
		$arr= array('fname'=>$file_name,
		'fsize'=>$fsize,
		'flink'=>$flink,
		'ftype'=>$ftype,
		'fdate'=>date('Y-m-d h:i:s'));
		insert_data($arr);
		move_uploaded_file($tempFile,$fname); 
		echo $file_name;
	}

?>