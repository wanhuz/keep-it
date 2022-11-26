<x-auth>
                <p class="h4 fw-bold mb-4 mx-1 mx-md-4 mt-4">Sign up</p>
                <form method="POST" action="/register" class="mx-1 mx-md-4">
                    @csrf
                    <div class="d-flex flex-row align-items-center mb-3">
                        <i class="fas fa-user fa-lg fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example1c">Username</label>
                        <input name="name" type="text" class="form-control" />
                        </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-3">
                        <i class="fas fa-envelope fa-lg fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c">Email</label>
                        <input name="email" type="email" class="form-control" />
                        </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-3">
                        <i class="fas fa-lock fa-lg fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c">Password</label>
                        <input name="password" type="password" class="form-control" />
                        </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-3">
                        <i class="fas fa-key fa-lg fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                        <input name="password_confirmation" type="password"  class="form-control" />
                        </div>
                    </div>

                    <div class="d-flex flex-column mb-4">
                        <p class="mb-1">Already has an account? <a class="text-decoration-none" href="/login">Log in</a></p>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 ">
                        <button type="submit" class="btn btn-primary btn-lg px-5">Sign up</button>
                    </div>

                </form>

</x-auth>
