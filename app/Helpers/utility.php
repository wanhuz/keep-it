<?php

function setting($key){
    return Arr::get(app('settings'), $key);
}

function user($key) {
    return Auth::user()->$key;
}