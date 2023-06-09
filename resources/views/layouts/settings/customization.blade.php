@extends('layouts.settings')

@section('categories')
    <a class="list-group-item list-group-item-action" href="/settings/home" role="button"><i class="bi bi-house-door"></i><small class="ms-3">Home</small></a>
    <a class="list-group-item list-group-item-action" href="/settings/layout" role="button"><i class="bi bi-columns"></i><small class="ms-3">Layout</small></a>
    <a class="list-group-item list-group-item-action" href="/settings/theme" role="button"><i class="bi bi-palette"></i><small class="ms-3">Theme</small></a>
@endsection