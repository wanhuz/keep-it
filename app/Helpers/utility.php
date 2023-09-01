<?php

function setting($key) {
    $user = Auth::user();
    return $user->settings()->firstWhere('key', '=', $key)->value;
}

function user($key) {
    return Auth::user()->$key;
}

function rgbToHex($rgb) {
    $temp = explode(",", $rgb);
    $r = $temp[0];
    $g = $temp[1];
    $b = $temp[2];
    
    return sprintf("#%02x%02x%02x", $r, $g, $b);
}

function hexToRgba($hex) {
    list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
    return $r . "," . $g . "," . $b;
}