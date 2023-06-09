@extends('layouts.auth')

@section('auth')
    <div class='pb-4 mt-3'>
        <h2>Sign in</h2>
    </div>

    <form method="POST" action="login">
        @csrf
        <div class="d-flex flex-column align-items-center mb-3 flex-fill form-outline gap-2">
            <input name="username" type="name" id="name" class="form-control py-2" value="{{ old('name') }}" placeholder="Username"/>
            <input name="password" type="password" class="form-control py-2" placeholder="Password"/>
        </div>

        <div class="d-flex flex-column gap-2 mb-4">
            <div class="mb-2">
                <input type="checkbox" name="remember" class="me-2">
                <span> Keep me logged in</span>
            </div>
            <button type="submit" class="btn btn-primary px-4 py-1 w-100">Login</button>
        </div>
    </form>

    <hr class='mb-3'>

    <div>
        <a class="text-decoration-none" href="/register">Forgot password?</a>
        <p class="mb-1">Need an account? <a class="text-decoration-none" href="/register">Sign up</a></p>
    </div>

    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
@endsection