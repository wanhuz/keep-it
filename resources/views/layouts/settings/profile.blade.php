@extends('layouts.settings')

@section('categories')
    <a class="list-group-item list-group-item-action" href="/settings/user" role="button"><i class="bi bi-person"></i><small class="ms-3">User</small></a>
    <a class="list-group-item list-group-item-action" href="/settings/security" role="button"><i class="bi bi-shield-lock"></i><small class="ms-3">Security</small></a>
@endsection