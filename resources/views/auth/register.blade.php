@extends('layouts.auth')

@section('auth')
    <div class='pb-4 mt-3'>
        <h2>Sign up</h2>
    </div>
    
    <form method="POST" action="/register">
        @csrf
        <div class="d-flex flex-column align-items-center mb-3 flex-fill form-outline gap-2">
            <input name="name" type="text" class="form-control py-2" placeholder="Username"/>
            <input name="email" type="email" class="form-control py-2" placeholder="Email address"/>
            <input name="password" type="password" class="form-control py-2" placeholder="Password"/>
            <input name="password_confirmation" type="password"  class="form-control py-2" placeholder="Repeat your password"/>
        </div>

        <div class="d-flex flex-column gap-2 mb-4">
            <button type="submit" class="btn btn-primary px-4 py-1 w-100">Register</button>
        </div>
    </form>

    <hr class='mb-3'>

    <div>
        <a class="text-decoration-none" href="/register">Forgot password?</a>
        <p class="mb-1">Already has account? <a class="text-decoration-none" href="/login">Sign in</a></p>
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