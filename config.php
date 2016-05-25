<?php
class DB
{
	var $host='localhost';
	var $username='root';
	var $pwd='';
	var $dbname='dropzone';
	function __construct()
	{
		$this->connection();
	}

	function connection()
	{
		$con=mysqli_connect($this->host,$this->username,$this->pwd,$this->dbname);

		// Check connection
		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}
		else
		{
			return $con;
		}
	}
}
?>