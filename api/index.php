<?php

$verb = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];


$prefix = "survey/api";
$ind = strpos($uri, $prefix);
$request = substr($uri, $ind + strlen($prefix));

if ($request == "/questions"){
  header('HTTP/1.1 200 OK');
  header('Content-Type: application/json');
  echo json_encode(Array("UX", "HTML", "CSS", "Javascript", "Server-side Scripting", "Databases"));
} else if ($request == "/results") {
    
  $dbhandle = new PDO("sqlite:survey.sqlite") or die("Failed to open DB");

  if (!$dbhandle) die ($error);

  if ($verb == "POST"){
    $inputs = file_get_contents("php://input");
    $oIn = json_decode($inputs);
    $thedata = Array(
        $oIn->name, 
        $oIn->b_db, 
        $oIn->b_script, 
        $oIn->b_js, 
        $oIn->b_html,
        $oIn->b_css,
        $oIn->b_ux,
        $oIn->g_db,
        $oIn->g_script,
        $oIn->g_js,
        $oIn->g_html,
        $oIn->g_css,
        $oIn->g_ux);
    $qry = $dbhandle->prepare("INSERT INTO skills VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $qry->execute($thedata);
    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
    echo json_encode($thedata);
  } else if ($verb == "GET") {
    
    $query = "SELECT count(name) as students,
          avg(base_db) as db, 
          avg(base_scripting) as scripting, 
          avg(base_js) as js, 
          avg(base_html) as html, 
          avg(base_css) as css, 
          avg(base_ux) as ux 
          from skills";
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
    echo json_encode($results[0]);
  
  } else {
    
    header('HTTP/1.1 404 Not Found');
  
  }
} else {
    
  header('HTTP/1.1 404 Not Found');

}

?>
