<?php
    header('Content-Type: application/json');

    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $item_in_page = @$_REQUEST['loadeditems'];
    $blocks_type = Array("11", "12", "21", "22");
    $color_type = Array('white', 'red');


    $events = Array();
    $events = Array(
       'loadeditems'     => (int)$item_in_page,
       'islastresultset' => !!($item_in_page > 50),
       'data'            => Array()
    );


    for ($i = 0; $i < 10; $i++):        

        $rand = rand(0, 3);
        $title = str_repeat("Title of this event <br />", $rand + 1);
 
        $events['data'][] = Array(
            'type'      => $blocks_type[$rand],
            'colortype' => ($rand === 0) ? $color_type[rand(0,1)] : "",
            'img'       => "block" . $blocks_type[$rand] . ".jpg",
            'date'      => "2014-05-16",
            'datedesc'  => "may 16",
            'title'     => $title,
            'url'       => "http://www.url.com/secondlevel"
        );

    endfor; 

    
    echo json_encode($events);