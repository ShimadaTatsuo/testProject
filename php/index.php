<?php

session_start();

if (! isset($_SESSION["USERID"])) {
    $no_login_url = '../logout.php';
    header("Location: {$no_login_url}");
    exit;
}
else {
    $login_status = "success login";
    $user = $_SESSION["USERID"];

    if (! $_REQUEST['mode']){
        $no_login_url = '../logout.php';
        header("Location: {$no_login_url}");
    }
    else if ($_REQUEST['mode'] && $_REQUEST['user']) {
        $query = $_SERVER['QUERY_STRING'];
        $params = array();
        $params = explode('&', $query);

        if($params[0]){
            $p_key      = array();
            $param      = array();
            $params_num = count($params);

            for($i=0; $i<$params_num; $i++){
                $param = explode('=', $params[$i]);
                $p_key[$param[0]] = $param[1];
            }

        }

        $controller = "index";
        if ($p_key['mode']) {
            $controller = $p_key['mode'];
        }
        $className = ucfirst(strtolower($controller)) . 'Controller';
        require_once 'app/controllers/' . $className . '.php';
        $controllerInstance = new $className();

        $action = 'index';
        if ($p_key['action']) {
            $action = $p_key['action'];
        }
        $actionMethod = $action . 'Action';
        $controllerInstance->$actionMethod();
    }
}

?>
