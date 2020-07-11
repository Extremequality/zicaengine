<?php

$fv=file_get_contents("php://input");

$arr = explode('replace_____separator',$fv);

$logo = $arr[0];
$img = $arr[1];
$fv = $arr[2];

unlink('app/css/logo.gif');
//$logo = str_replace('data:image/png;base64,', '', $logo);
$logo = str_replace(' ', '+', $logo);
$data = base64_decode($logo);
$file = fopen("app/css/logo.gif", "wb") or die("Unable to open file!");
fwrite($file, $data);
fclose($file);

unlink('app/icon.png');
//$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = fopen("app/favicon.ico", "wb") or die("Unable to open file!");
fwrite($file, $data);
fclose($file);

$myfile = fopen("app/Game.game", "wb") or die("Unable to open file!");
fwrite($myfile, $fv);
fclose($myfile);

unlink('app/Game.zip');
	
new GoodZipArchive('app/',    'app/Game.zip');

// =========== https://github.com/ttodua/useful-php-scripts ========== 
//                                 USAGE:
//     new GoodZipArchive('path/to/input/folder',    'path/to/output_zip_file.zip') ;
// ======================================================================


class GoodZipArchive extends ZipArchive 
{
	//@author Nicolas Heimann
	public function __construct($a=false, $b=false) { $this->create_func($a, $b);  }
	
	public function create_func($input_folder=false, $output_zip_file=false)
	{
		if($input_folder !== false && $output_zip_file !== false)
		{
			$res = $this->open($output_zip_file, ZipArchive::CREATE);
			if($res === TRUE) 	{ $this->addDir($input_folder, basename($input_folder)); $this->close(); }
			else  				{ echo 'Could not create a zip archive. Contact Admin.'; }
		}
	}
	
    // Add a Dir with Files and Subdirs to the archive
    public function addDir($location, $name) {
        $this->addEmptyDir($name);
        $this->addDirDo($location, $name);
    }

    // Add Files & Dirs to archive 
    private function addDirDo($location, $name) {
        $name .= '/';         $location .= '/';
      // Read all Files in Dir
        $dir = opendir ($location);
        while ($file = readdir($dir))    {
            if ($file == '.' || $file == '..') continue;
          // Rekursiv, If dir: GoodZipArchive::addDir(), else ::File();
            $do = (filetype( $location . $file) == 'dir') ? 'addDir' : 'addFile';
            $this->$do($location . $file, $name . $file);
        }
    } 
}
?>